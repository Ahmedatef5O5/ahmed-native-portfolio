import fs from "fs";
import path from "path";

const content = fs.readFileSync("src/data/projects.ts", "utf8");
const urlMatches = content.matchAll(/(?:url|poster|icon):\s*["'](\/assets\/[^"']+)["']/g);
const uniqueUrls = [...new Set([...urlMatches].map(m => m[1]))];

let totalBytes = 0;
const perProject = {};
const assetList = [];

for (const u of uniqueUrls) {
  const filePath = path.join("public", u);
  if (fs.existsSync(filePath)) {
    const size = fs.statSync(filePath).size;
    totalBytes += size;
    const parts = u.split("/");
    const project = parts[3] || "other";
    perProject[project] = (perProject[project] || 0) + size;
    assetList.push({ url: u, size, kb: (size / 1024).toFixed(1), mb: (size / (1024 * 1024)).toFixed(2) });
  } else {
    console.warn("Missing asset:", filePath);
  }
}

assetList.sort((a, b) => b.size - a.size);
console.log("Total referenced assets in projects.ts:", assetList.length);
console.log("Total referenced assets size:", (totalBytes / (1024 * 1024)).toFixed(2), "MB");
console.log("Per project breakdown:", Object.fromEntries(Object.entries(perProject).map(([k, v]) => [k, (v / (1024 * 1024)).toFixed(2) + " MB"])));
console.log("\nTop 20 largest assets:");
assetList.slice(0, 20).forEach(a => console.log(`${a.url} | ${a.mb} MB (${a.kb} KB)`));

const totalPublicBytes = fs.readdirSync("public", { recursive: true })
  .map(f => path.join("public", f))
  .filter(f => fs.statSync(f).isFile())
  .reduce((acc, f) => acc + fs.statSync(f).size, 0);
console.log("\nTotal public folder size:", (totalPublicBytes / (1024 * 1024)).toFixed(2), "MB");
