import { spawnSync } from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
const source = 'social-mate-media-source/video/social_mate_social_features_edited_Trim.mp4';
for (const [width, suffix, crf, rate] of [[498, '', '25', '900k'], [360, '-mobile', '27', '500k']]) {
  const result = spawnSync(ffmpeg, ['-y','-ss','5','-i',source,'-t','180','-an','-vf',`crop=498:1080:711:0,scale=${width}:-2:flags=lanczos,fps=24`,'-c:v','libx264','-preset','fast','-crf',crf,'-maxrate',rate,'-bufsize','1800k','-g','48','-keyint_min','48','-pix_fmt','yuv420p','-movflags','+faststart',`public/assets/projects/social-mate/social-mate-hero${suffix}.v3.mp4`], {stdio:'inherit'});
  if (result.status !== 0) process.exit(result.status ?? 1);
}
