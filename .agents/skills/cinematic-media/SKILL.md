---
name: cinematic-media
description: Rules and guidelines for creating high-impact visual showcases, device mockups, and micro-interactions.
---

# Cinematic Media Skill

## Visual Quality Guidelines
1. **Device Mockups**:
   - For mobile apps (Social Mate, NewsWave): use `type="ios"` or `type="android"`.
   - For dashboards (FinDash): leverage `type="ipad"` or desktop-style frames.
2. **Atmospheric Lighting**:
   - Use radial gradients with low opacity (`opacity-10` to `opacity-20`) behind devices matching the project's primary accent color.
3. **Media Optimization**:
   - Standardize all project media inside `public/assets/projects/[slug]/`.
   - Prefer modern WebP format for screenshots and compressed MP4 with poster images for demo clips.
4. **Interactive Polish**:
   - Add subtle hover tilts or parallax scale (`scale-[1.02]`) on primary cards.
   - Keep lightbox transitions snappy and clean without jarring layout shifts.