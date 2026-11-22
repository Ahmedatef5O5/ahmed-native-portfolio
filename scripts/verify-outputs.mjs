import { spawnSync } from "child_process";
import fs from "fs";
import path from "path";

const files = [
  "public/assets/projects/social-mate/social-mate-hero.v2.mp4",
  "public/assets/projects/social-mate/social-mate-hero.v2.webm",
  "public/assets/projects/social-mate/social-mate-hero-mobile.v2.mp4",
  "public/assets/projects/social-mate/social-mate-hero-poster.v2.webp",
  "public/assets/projects/social-mate/social-mate-ai-chat.v2.mp4",
  "public/assets/projects/social-mate/social-mate-ai-chat.v2.webm",
  "public/assets/projects/social-mate/social-mate-ai-chat-mobile.v2.mp4",
  "public/assets/projects/social-mate/social-mate-ai-chat-poster.v2.webp"
];

console.log("=== FFPROBE OUTPUT VERIFICATION ===");
for (const file of files) {
  const stat = fs.statSync(file);
  const sizeKB = (stat.size / 1024).toFixed(1);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
  
  if (file.endsWith(".mp4") || file.endsWith(".webm")) {
    const probe = spawnSync("ffprobe", [
      "-v", "error",
      "-show_entries", "stream=codec_name,codec_type,width,height,duration,r_frame_rate:format=duration,size,bit_rate",
      "-of", "json",
      file
    ], { encoding: "utf8" });
    const info = JSON.parse(probe.stdout);
    const vStream = info.streams.find(s => s.codec_type === "video");
    const aStream = info.streams.find(s => s.codec_type === "audio");

    let moovStart = false;
    if (file.endsWith(".mp4")) {
      const fd = fs.openSync(file, "r");
      const buf = Buffer.alloc(100);
      fs.readSync(fd, buf, 0, 100, 0);
      fs.closeSync(fd);
      moovStart = buf.includes("moov");
    }

    console.log(path.basename(file), JSON.stringify({
      size: `${sizeKB} KB (${sizeMB} MB)`,
      codec: vStream?.codec_name,
      dimensions: `${vStream?.width}x${vStream?.height}`,
      fps: vStream?.r_frame_rate,
      duration: `${parseFloat(info.format.duration).toFixed(1)}s`,
      hasAudio: !!aStream,
      moovAtStart: file.endsWith(".mp4") ? moovStart : "N/A (WebM)"
    }, null, 2));
  } else {
    console.log(path.basename(file), JSON.stringify({ size: `${sizeKB} KB` }, null, 2));
  }
}
