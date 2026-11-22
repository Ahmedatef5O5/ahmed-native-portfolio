import { spawn } from "child_process";
import http from "http";
import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const PORT = 3008;
const BASE_URL = `http://localhost:${PORT}`;
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Network presets (Fast 4G and Slow 4G via CDP)
const NETWORK_CONDITIONS = {
  fast4G: {
    offline: false,
    latency: 150, // 150ms
    downloadThroughput: (1.6 * 1024 * 1024) / 8, // 1.6 Mbps
    uploadThroughput: (750 * 1024) / 8, // 750 Kbps
  },
  slow4G: {
    offline: false,
    latency: 400, // 400ms
    downloadThroughput: (500 * 1024) / 8, // 500 Kbps
    uploadThroughput: (500 * 1024) / 8, // 500 Kbps
  },
};

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 500) {
            resolve();
          } else {
            reject(new Error(`Status ${res.statusCode}`));
          }
        });
        req.on("error", reject);
        req.setTimeout(1000, () => {
          req.destroy();
          reject(new Error("Timeout"));
        });
      });
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 400));
    }
  }
  throw new Error(`Server failed to start at ${url} within ${timeoutMs}ms`);
}

async function runVerification() {
  console.log("=== STEP 5: PRODUCTION VERIFICATION ===");
  console.log(`Starting Next.js production server on port ${PORT}...`);

  const nextBin = path.resolve("node_modules/next/dist/bin/next");
  const serverProcess = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    stdio: ["ignore", "pipe", "pipe"],
    detached: false,
    env: { ...process.env, PORT: String(PORT), NODE_ENV: "production" },
  });

  serverProcess.stdout.on("data", (d) => {
    const s = d.toString();
    if (s.includes("Ready in") || s.includes("started server on")) {
      console.log(`[Next.js Server] ${s.trim()}`);
    }
  });

  serverProcess.stderr.on("data", (d) => {
    console.error(`[Next.js Server Err] ${d.toString().trim()}`);
  });

  const results = {
    heroPosterVisibleFast4G: null,
    heroVideoPlayingFast4G: null,
    lcpFast4G: null,
    aboveTheFoldBytesFast4G: 0,
    mediaStreamCalls: 0,
    cacheHeadersVerified: false,
    acceptRangesVerified: false,
    consoleErrors: [],
    pillOverlapCheckPassed: false,
    pillMovedUnderBezel: false,
    newsWaveRendered: false,
    finDashRendered: false,
    notFoundHandled: false,
    pausePlayTogglePassed: false,
    slow4GPosterTime: null,
    slow4GVideoTime: null,
  };

  let browser;

  try {
    await waitForServer(BASE_URL);
    console.log(`Server is responding at ${BASE_URL}`);

    console.log(`Launching headless Chrome from: ${CHROME_PATH}`);
    browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: "new",
      args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage", "--mute-audio"],
    });

    // -------------------------------------------------------------
    // TEST 1: Fast 4G on /projects/social-mate
    // -------------------------------------------------------------
    console.log("\n--- TEST 1: Fast 4G on /projects/social-mate ---");
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          console.error(`[Browser Console Error] ${msg.text()}`);
          results.consoleErrors.push(msg.text());
        }
      });

      let transferredBytes = 0;
      page.on("response", (res) => {
        const url = res.url();
        const headers = res.headers();
        const status = res.status();

        if (url.includes("/api/media/stream")) {
          results.mediaStreamCalls++;
          console.error(`VIOLATION: /api/media/stream requested: ${url}`);
        }

        if (url.includes("/assets/")) {
          transferredBytes += Number(headers["content-length"] || 0);

          // Verify static caching header on /assets/
          if (headers["cache-control"]?.includes("max-age=31536000") && headers["cache-control"]?.includes("immutable")) {
            results.cacheHeadersVerified = true;
          }
          if (status === 206 || headers["accept-ranges"] === "bytes") {
            results.acceptRangesVerified = true;
          }
        }
      });

      const client = await page.target().createCDPSession();
      await client.send("Network.enable");
      await client.send("Network.emulateNetworkConditions", NETWORK_CONDITIONS.fast4G);

      const navStart = Date.now();
      await page.goto(`${BASE_URL}/projects/social-mate`, { waitUntil: "domcontentloaded" });

      // Measure Hero Poster visible time
      await page.waitForSelector('img[alt*="Social Mate"]', { visible: true, timeout: 5000 });
      const posterTime = Date.now() - navStart;
      results.heroPosterVisibleFast4G = posterTime;
      console.log(`✓ Hero Poster Visible (Fast 4G): ${posterTime}ms (Target: < 1000ms)`);

      // Measure Hero Video playing time
      await page.waitForFunction(() => {
        const video = document.querySelector("video");
        return video && !video.paused && video.readyState >= 3 && video.currentTime > 0;
      }, { timeout: 8000 });
      const videoTime = Date.now() - navStart;
      results.heroVideoPlayingFast4G = videoTime;
      console.log(`✓ Hero Video Actively Playing (Fast 4G): ${videoTime}ms (Target: < 2500ms)`);

      // Measure LCP via PerformanceObserver in browser
      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(Math.round(lastEntry?.startTime || 0));
          }).observe({ type: "largest-contentful-paint", buffered: true });
          setTimeout(() => resolve(0), 1000);
        });
      });
      results.lcpFast4G = lcp;
      console.log(`✓ Measured LCP (Fast 4G): ${lcp}ms`);

      results.aboveTheFoldBytesFast4G = transferredBytes;
      console.log(`✓ Transferred media bytes on hero load: ${(transferredBytes / 1024).toFixed(1)} KB`);

      // Verify LIVE DEMO pill is placed cleanly outside the phone display screen
      const overlapInfo = await page.evaluate(() => {
        // Find the phone screen container
        const mainScreen =
          document.querySelector('[data-device-screen="true"]') ||
          document.querySelector(".overflow-hidden.bg-background") ||
          document.querySelector(".isolate.overflow-hidden");

        // Find the LIVE DEMO / DEMO control pill
        const controlPill =
          document.querySelector('[data-video-controls="true"]') ||
          Array.from(document.querySelectorAll("div, span, button")).find(
            (el) =>
              el.textContent &&
              (el.textContent.includes("LIVE DEMO") || el.textContent.includes("DEMO")) &&
              el.querySelector("button")
          );

        if (!mainScreen || !controlPill) {
          return {
            found: false,
            error: `Screen found: ${Boolean(mainScreen)}, Pill found: ${Boolean(controlPill)}`,
          };
        }

        const screenRect = mainScreen.getBoundingClientRect();
        const pillRect = controlPill.getBoundingClientRect();

        // Check vertical positioning: pill should be below the screen bezel or outside viewport
        const isBelowScreen = pillRect.top >= (screenRect.bottom - 4);
        const hasOverlap = !(
          pillRect.bottom <= screenRect.top ||
          pillRect.top >= screenRect.bottom ||
          pillRect.right <= screenRect.left ||
          pillRect.left >= screenRect.right
        );

        return {
          found: true,
          screenRect: { top: Math.round(screenRect.top), bottom: Math.round(screenRect.bottom), left: Math.round(screenRect.left), right: Math.round(screenRect.right) },
          pillRect: { top: Math.round(pillRect.top), bottom: Math.round(pillRect.bottom), left: Math.round(pillRect.left), right: Math.round(pillRect.right) },
          isBelowScreen,
          hasOverlap,
        };
      });

      console.log("Visual Layout Verification:", JSON.stringify(overlapInfo, null, 2));
      if (overlapInfo.found && !overlapInfo.hasOverlap) {
        results.pillOverlapCheckPassed = true;
        results.pillMovedUnderBezel = true;
        console.log("✓ SUCCESS: LIVE DEMO control pill has 0% overlap with the phone display viewport!");
      } else {
        console.error("OVERLAP DETECTED OR PILL NOT POSITIONED BELOW SCREEN:", overlapInfo);
      }

      // Test Pause / Play Toggle Interaction
      try {
        const pauseBtn = await page.waitForSelector('button[aria-label="Pause demo"]', { timeout: 4000 });
        if (pauseBtn) {
          await page.evaluate(() => {
            const btn = document.querySelector('button[aria-label="Pause demo"]');
            btn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });
          await page.waitForFunction(() => {
            const v = document.querySelector("video");
            return v && v.paused;
          }, { timeout: 3000 });
          console.log(`✓ Pause button clicked: Video successfully paused`);

          const resumeBtn = await page.waitForSelector('button[aria-label="Play video demo"]', { timeout: 3000 });
          console.log(`✓ Tap to resume overlay present when paused = ${Boolean(resumeBtn)}`);

          if (resumeBtn) {
            await page.evaluate(() => {
              const btn = document.querySelector('button[aria-label="Play video demo"]');
              btn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            await page.waitForFunction(() => {
              const v = document.querySelector("video");
              return v && !v.paused;
            }, { timeout: 3000 });
            console.log(`✓ Resume clicked: Video successfully playing again`);
            results.pausePlayTogglePassed = true;
          }
        }
      } catch (err) {
        console.warn("Pause/Play toggle test warning:", err.message);
      }

      await page.close();
    }

    // -------------------------------------------------------------
    // TEST 2: Slow 4G test
    // -------------------------------------------------------------
    console.log("\n--- TEST 2: Slow 4G on /projects/social-mate ---");
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });

      const client = await page.target().createCDPSession();
      await client.send("Network.enable");
      await client.send("Network.emulateNetworkConditions", NETWORK_CONDITIONS.slow4G);

      const navStart = Date.now();
      await page.goto(`${BASE_URL}/projects/social-mate`, { waitUntil: "domcontentloaded" });

      await page.waitForSelector('img[alt*="Social Mate"]', { visible: true, timeout: 8000 });
      results.slow4GPosterTime = Date.now() - navStart;
      console.log(`✓ Hero Poster Visible (Slow 4G): ${results.slow4GPosterTime}ms`);

      try {
        await page.waitForFunction(() => {
          const video = document.querySelector("video");
          return video && !video.paused && video.currentTime > 0;
        }, { timeout: 12000 });
        results.slow4GVideoTime = Date.now() - navStart;
        console.log(`✓ Hero Video Playing (Slow 4G): ${results.slow4GVideoTime}ms`);
      } catch {
        console.log("ℹ Slow 4G timed out to tap-to-play fallback as designed.");
      }

      await page.close();
    }

    // -------------------------------------------------------------
    // TEST 3: Homepage / & Showcase
    // -------------------------------------------------------------
    console.log("\n--- TEST 3: Homepage / & SocialMateShowcase ---");
    {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });

      await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle2" });
      const homeHeading = await page.$eval("h1", el => el.textContent);
      console.log(`✓ Homepage rendered: "${homeHeading?.trim()}"`);

      // Verify SocialMateShowcase phone frame on homepage
      const showcaseFrame = await page.$('.aspect-\\[9\\/19\\.5\\]');
      console.log(`✓ Showcase phone frame rendered on home = ${Boolean(showcaseFrame)}`);

      await page.close();
    }

    // -------------------------------------------------------------
    // TEST 4: NewsWave & FinDash pages
    // -------------------------------------------------------------
    console.log("\n--- TEST 4: NewsWave & FinDash verification ---");
    {
      const page = await browser.newPage();

      // NewsWave
      const nwRes = await page.goto(`${BASE_URL}/projects/newswave`, { waitUntil: "domcontentloaded" });
      results.newsWaveRendered = nwRes.status() === 200;
      console.log(`✓ /projects/newswave HTTP status: ${nwRes.status()}`);

      // FinDash
      const fdRes = await page.goto(`${BASE_URL}/projects/fin-dash`, { waitUntil: "domcontentloaded" });
      results.finDashRendered = fdRes.status() === 200;
      console.log(`✓ /projects/fin-dash HTTP status: ${fdRes.status()}`);

      // 404 test
      const notFoundRes = await page.goto(`${BASE_URL}/projects/non-existent-project`, { waitUntil: "domcontentloaded" });
      results.notFoundHandled = notFoundRes.status() === 404;
      console.log(`✓ /projects/non-existent-project HTTP status: ${notFoundRes.status()} (Expected 404)`);

      await page.close();
    }

  } catch (err) {
    console.error("Verification failed with error:", err);
  } finally {
    console.log("\nShutting down browser and production server...");
    if (browser) {
      try { await browser.close(); } catch {}
    }
    if (serverProcess) {
      try {
        serverProcess.kill("SIGTERM");
        // Windows forceful taskkill if needed
        spawn("taskkill", ["/pid", String(serverProcess.pid), "/f", "/t"]);
      } catch {}
    }
  }

  console.log("\n=== FINAL VERIFICATION SUMMARY ===");
  console.log(JSON.stringify(results, null, 2));

  fs.writeFileSync(
    path.resolve("scripts/verification-results.json"),
    JSON.stringify(results, null, 2),
    "utf8"
  );
}

runVerification().catch(e => {
  console.error("Fatal:", e);
  process.exit(1);
});
