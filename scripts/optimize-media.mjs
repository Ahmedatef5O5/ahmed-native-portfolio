import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import sharp from "sharp";

// Find ffmpeg
let ffmpegPath = "ffmpeg";

try {
  const ffmpegStatic = await import("ffmpeg-static");
  if (ffmpegStatic?.default) {
    ffmpegPath = ffmpegStatic.default;
  }
} catch {}

function runFfmpeg(args, desc) {
  console.log(`\n[ffmpeg] ${desc}...`);
  const res = spawnSync(ffmpegPath, args, { stdio: "inherit" });
  if (res.status !== 0) {
    throw new Error(`FFmpeg failed with exit code ${res.status} for ${desc}`);
  }
}

async function generateBlurDataURL(imageBuffer) {
  const buffer = await sharp(imageBuffer)
    .resize(20, null, { withoutEnlargement: true })
    .webp({ quality: 20 })
    .toBuffer();
  return `data:image/webp;base64,${buffer.toString("base64")}`;
}

export async function optimizeVideos() {
  console.log("\n=========================================");
  console.log("=== STEP 1: OPTIMIZING PROJECT VIDEOS ===");
  console.log("=========================================\n");

  const outDir = path.resolve("public/assets/projects/social-mate");
  fs.mkdirSync(outDir, { recursive: true });

  // 1. Social Mate Hero Video
  // Segment: 00:00:05 to 00:00:18 (13 seconds)
  // Cropped from 1920x1080 master: crop 498x1080 at x=711 (eliminates 1422px of black letterbox padding)
  const heroMaster = path.resolve("social-mate-media-source/video/social_mate_social_features_edited_Trim.mp4");
  const heroMp4 = path.join(outDir, "social-mate-hero.v2.mp4");
  const heroWebm = path.join(outDir, "social-mate-hero.v2.webm");
  const heroMobile = path.join(outDir, "social-mate-hero-mobile.v2.mp4");
  const heroPoster = path.join(outDir, "social-mate-hero-poster.v2.webp");

  console.log("Optimizing Hero demo (Social Mate social features)...");

  // Poster: 1st frame at 00:00:05
  runFfmpeg([
    "-y", "-ss", "00:00:05",
    "-i", heroMaster,
    "-vframes", "1",
    "-vf", "crop=498:1080:711:0,scale=720:-2:flags=lanczos",
    "-c:v", "libwebp", "-quality", "75",
    heroPoster
  ], "Hero Poster (WebP 720w)");

  // Hero MP4 (720w)
  runFfmpeg([
    "-y", "-ss", "00:00:05", "-t", "13",
    "-i", heroMaster,
    "-an",
    "-vf", "crop=498:1080:711:0,scale=720:-2:flags=lanczos,fps=30",
    "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "27",
    "-maxrate", "1.4M", "-bufsize", "2.8M",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    heroMp4
  ], "Hero MP4 (720w, H.264 High, Faststart)");

  // Hero WebM (720w)
  runFfmpeg([
    "-y", "-ss", "00:00:05", "-t", "13",
    "-i", heroMaster,
    "-an",
    "-vf", "crop=498:1080:711:0,scale=720:-2:flags=lanczos,fps=30",
    "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1",
    heroWebm
  ], "Hero WebM (720w, VP9)");

  // Hero Mobile MP4 (480w)
  runFfmpeg([
    "-y", "-ss", "00:00:05", "-t", "13",
    "-i", heroMaster,
    "-an",
    "-vf", "crop=498:1080:711:0,scale=480:-2:flags=lanczos,fps=30",
    "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "28",
    "-maxrate", "900k", "-bufsize", "1.8M",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    heroMobile
  ], "Hero Mobile MP4 (480w, H.264 High, Faststart)");

  // 2. Social Mate AI Chat Video
  // Segment: 00:00:17 to 00:00:36 (19 seconds)
  // Master is 1080x2336 (already portrait)
  const aiMaster = path.resolve("social-mate-media-source/video/social_mate_ai_chat_and_providers_1.mp4");
  const aiMp4 = path.join(outDir, "social-mate-ai-chat.v2.mp4");
  const aiWebm = path.join(outDir, "social-mate-ai-chat.v2.webm");
  const aiMobile = path.join(outDir, "social-mate-ai-chat-mobile.v2.mp4");
  const aiPoster = path.join(outDir, "social-mate-ai-chat-poster.v2.webp");

  console.log("Optimizing AI-chat demo...");

  // AI Poster
  runFfmpeg([
    "-y", "-ss", "00:00:17",
    "-i", aiMaster,
    "-vframes", "1",
    "-vf", "scale=720:-2:flags=lanczos",
    "-c:v", "libwebp", "-quality", "75",
    aiPoster
  ], "AI Poster (WebP 720w)");

  // AI MP4 (720w)
  runFfmpeg([
    "-y", "-ss", "00:00:17", "-t", "19",
    "-i", aiMaster,
    "-an",
    "-vf", "scale=720:-2:flags=lanczos,fps=30",
    "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "27",
    "-maxrate", "1.4M", "-bufsize", "2.8M",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    aiMp4
  ], "AI MP4 (720w, H.264 High, Faststart)");

  // AI WebM (720w)
  runFfmpeg([
    "-y", "-ss", "00:00:17", "-t", "19",
    "-i", aiMaster,
    "-an",
    "-vf", "scale=720:-2:flags=lanczos,fps=30",
    "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", "-row-mt", "1",
    aiWebm
  ], "AI WebM (720w, VP9)");

  // AI Mobile MP4 (480w)
  runFfmpeg([
    "-y", "-ss", "00:00:17", "-t", "19",
    "-i", aiMaster,
    "-an",
    "-vf", "scale=480:-2:flags=lanczos,fps=30",
    "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "28",
    "-maxrate", "900k", "-bufsize", "1.8M",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    aiMobile
  ], "AI Mobile MP4 (480w, H.264 High, Faststart)");

  const heroPosterBuf = fs.readFileSync(heroPoster);
  const aiPosterBuf = fs.readFileSync(aiPoster);
  const heroBlur = await generateBlurDataURL(heroPosterBuf);
  const aiBlur = await generateBlurDataURL(aiPosterBuf);

  console.log("\nGenerated Video Artifacts:");
  console.log(`- Hero Poster: ${(fs.statSync(heroPoster).size / 1024).toFixed(1)} KB`);
  console.log(`- Hero MP4 (720w): ${(fs.statSync(heroMp4).size / 1024).toFixed(1)} KB`);
  console.log(`- Hero WebM (720w): ${(fs.statSync(heroWebm).size / 1024).toFixed(1)} KB`);
  console.log(`- Hero Mobile MP4 (480w): ${(fs.statSync(heroMobile).size / 1024).toFixed(1)} KB`);
  console.log(`- AI Poster: ${(fs.statSync(aiPoster).size / 1024).toFixed(1)} KB`);
  console.log(`- AI MP4 (720w): ${(fs.statSync(aiMp4).size / 1024).toFixed(1)} KB`);
  console.log(`- AI WebM (720w): ${(fs.statSync(aiWebm).size / 1024).toFixed(1)} KB`);
  console.log(`- AI Mobile MP4 (480w): ${(fs.statSync(aiMobile).size / 1024).toFixed(1)} KB`);

  return {
    hero: {
      mp4: "/assets/projects/social-mate/social-mate-hero.v2.mp4",
      webm: "/assets/projects/social-mate/social-mate-hero.v2.webm",
      mobile: "/assets/projects/social-mate/social-mate-hero-mobile.v2.mp4",
      poster: "/assets/projects/social-mate/social-mate-hero-poster.v2.webp",
      posterBlur: heroBlur,
      durationSec: 13
    },
    ai: {
      mp4: "/assets/projects/social-mate/social-mate-ai-chat.v2.mp4",
      webm: "/assets/projects/social-mate/social-mate-ai-chat.v2.webm",
      mobile: "/assets/projects/social-mate/social-mate-ai-chat-mobile.v2.mp4",
      poster: "/assets/projects/social-mate/social-mate-ai-chat-poster.v2.webp",
      posterBlur: aiBlur,
      durationSec: 19
    }
  };
}

export async function optimizeImages() {
  console.log("\n=========================================");
  console.log("=== STEP 4: OPTIMIZING PROJECT IMAGES ===");
  console.log("=========================================\n");

  // Clean up any stray .tmp files first
  const walkAndClean = (dir) => {
    const list = fs.readdirSync(dir);
    for (const f of list) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) {
        walkAndClean(full);
      } else if (f.endsWith(".tmp.webp") || f.endsWith(".tmp.png")) {
        try { fs.unlinkSync(full); } catch {}
      }
    }
  };
  walkAndClean("public/assets");

  const manifestPath = path.resolve("src/data/media-manifest.json");
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
    : {};

  const projectsDir = path.resolve("public/assets/projects");
  const projectFolders = fs.readdirSync(projectsDir).filter(f => fs.statSync(path.join(projectsDir, f)).isDirectory());

  let totalBefore = 0;
  let totalAfter = 0;

  for (const folder of projectFolders) {
    const dir = path.join(projectsDir, folder);
    const files = fs.readdirSync(dir);

    for (const file of files) {
      if (file.endsWith(".mp4") || file.endsWith(".webm")) continue;
      // Skip already generated responsive variants
      if (file.match(/\.(360w|540w|720w)\.webp$/)) continue;

      const filePath = path.join(dir, file);
      const originalBuffer = fs.readFileSync(filePath);
      const originalSize = originalBuffer.length;
      totalBefore += originalSize;

      const relUrl = `/assets/projects/${folder}/${file}`;
      const ext = path.extname(file).toLowerCase();

      try {
        let currentBuffer = originalBuffer;
        const metadata = await sharp(currentBuffer).metadata();
        let origWidth = metadata.width || 720;
        let origHeight = metadata.height || 1560;

        const isOversized = originalSize > 150 * 1024;

        // If file is oversized WebP, recompress with buffer
        if (isOversized && ext === ".webp") {
          console.log(`Recompressing oversized WebP: ${relUrl} (${(originalSize / 1024).toFixed(1)} KB)`);
          const compressed = await sharp(currentBuffer)
            .resize(origWidth > 1080 ? 1080 : null, null, { withoutEnlargement: true })
            .webp({ quality: 78, effort: 6 })
            .toBuffer();
          fs.writeFileSync(filePath, compressed);
          currentBuffer = compressed;
          const newSize = compressed.length;
          console.log(`  -> ${(newSize / 1024).toFixed(1)} KB (${((1 - newSize / originalSize) * 100).toFixed(1)}% saved)`);
        } else if (isOversized && ext === ".png") {
          console.log(`Optimizing oversized PNG: ${relUrl} (${(originalSize / 1024).toFixed(1)} KB)`);
          const compressedPng = await sharp(currentBuffer)
            .png({ compressionLevel: 9, effort: 8 })
            .toBuffer();
          if (compressedPng.length < originalSize) {
            fs.writeFileSync(filePath, compressedPng);
            currentBuffer = compressedPng;
            console.log(`  -> ${(compressedPng.length / 1024).toFixed(1)} KB (${((1 - compressedPng.length / originalSize) * 100).toFixed(1)}% saved)`);
          }
        }

        // Generate responsive variants: 360w, 540w, 720w for screenshots/mockups
        const variantSizes = [360, 540, 720];
        const variants = {};

        if (origWidth >= 300) {
          for (const targetWidth of variantSizes) {
            if (targetWidth <= origWidth || targetWidth === 720) {
              const baseName = file.replace(/\.[^.]+$/, "");
              const variantFileName = `${baseName}.${targetWidth}w.webp`;
              const variantFilePath = path.join(dir, variantFileName);

              const variantBuffer = await sharp(currentBuffer)
                .resize(targetWidth, null, { withoutEnlargement: true })
                .webp({ quality: 76, effort: 5 })
                .toBuffer();
              fs.writeFileSync(variantFilePath, variantBuffer);

              variants[`${targetWidth}w`] = `/assets/projects/${folder}/${variantFileName}`;
            }
          }
        }

        // Tiny base64 blur placeholder
        const blurDataURL = await generateBlurDataURL(currentBuffer);
        const finalSize = fs.statSync(filePath).size;
        totalAfter += finalSize;

        manifest[relUrl] = {
          width: origWidth,
          height: origHeight,
          blurDataURL,
          variants: Object.keys(variants).length > 0 ? variants : undefined
        };
      } catch (err) {
        console.warn(`Failed to process ${relUrl}:`, err.message);
      }
    }
  }

  // Also process profile portrait
  const profilePath = path.resolve("public/assets/profile/profile.webp");
  if (fs.existsSync(profilePath)) {
    try {
      const profileBuf = fs.readFileSync(profilePath);
      const meta = await sharp(profileBuf).metadata();
      const blurDataURL = await generateBlurDataURL(profileBuf);
      manifest["/assets/profile/profile.webp"] = {
        width: meta.width || 155,
        height: meta.height || 155,
        blurDataURL
      };
    } catch {}
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
  console.log(`\nMedia manifest written to: ${manifestPath} (${Object.keys(manifest).length} items)`);
  console.log(`Image optimization summary: ${(totalBefore / (1024 * 1024)).toFixed(2)} MB -> ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
}

async function main() {
  const args = process.argv.slice(2);
  const doVideos = args.includes("--videos") || (!args.includes("--images"));
  const doImages = args.includes("--images") || (!args.includes("--videos"));

  if (doVideos) {
    await optimizeVideos();
  }
  if (doImages) {
    await optimizeImages();
  }
  console.log("\nAll media optimization complete!\n");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
