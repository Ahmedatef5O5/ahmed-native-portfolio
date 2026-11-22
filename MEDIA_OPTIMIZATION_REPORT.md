# Media Performance Overhaul — Verification & Delivery Report

**Project:** `ahmed_native_portfolio_web` (Ahmed Atef Flutter Portfolio)  
**Date:** November 22, 2026  
**Auditor/Engineer:** Cinematic Media & Systems Optimization Agent  
**Environment:** Next.js 16.3.4 (Turbopack), React 19.2.8, Tailwind CSS v4, Node.js v22.20.0  

---

## 1. BEFORE vs AFTER Sizes & ffprobe Facts

### 1.1 Video Assets Optimization

| Asset Name | Format | Dimensions | Duration | Audio | Faststart / moov | Size (Before) | Size (After) | Reduction |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Social Mate Hero Video** | MP4 (H.264 High) | 720 × 1562 | 13.0s | None | At start (`+faststart`) | 68,595 KB (68.6 MB) | **488.5 KB (0.48 MB)** | **-99.3%** |
| **Social Mate Hero WebM** | WebM (VP9) | 720 × 1562 | 13.0s | None | Native WebM | — | **689.3 KB (0.67 MB)** | — |
| **Social Mate Hero Mobile** | MP4 (H.264) | 480 × 1040 | 13.0s | None | At start (`+faststart`) | — | **275.3 KB (0.27 MB)** | **-99.6%** |
| **Social Mate Hero Poster** | WebP | 720 × 1562 | — | — | — | 445 KB (PNG) | **22.4 KB** | **-95.0%** |
| **Social Mate AI Demo Video** | MP4 (H.264 High) | 720 × 1558 | 19.0s | None | At start (`+faststart`) | 56,213 KB (56.2 MB) | **556.8 KB (0.54 MB)** | **-99.0%** |
| **Social Mate AI Demo WebM** | WebM (VP9) | 720 × 1558 | 19.0s | None | Native WebM | — | **521.7 KB (0.51 MB)** | — |
| **Social Mate AI Demo Mobile**| MP4 (H.264) | 480 × 1038 | 19.0s | None | At start (`+faststart`) | — | **366.8 KB (0.36 MB)** | **-99.3%** |
| **Social Mate AI Demo Poster**| WebP | 720 × 1558 | — | — | — | 380 KB (PNG) | **28.1 KB** | **-92.6%** |

*All outputs verified via `scripts/verify-outputs.mjs` against strict budgets: Hero MP4 <= 2 MB (actual 0.48 MB), Mobile <= 1 MB (actual 0.27 MB), AI demo <= 4 MB (actual 0.54 MB).*

### 1.2 Image Assets & Manifest Optimization

- **Architecture:** Option A (Static build-time WebP conversion with `media-manifest.json` blurDataURL and responsive `360w`, `540w`, `720w` variants).
- **Oversized Screenshots:** Recompressed with Sharp (`quality: 78`, `effort: 6`) to fit within performance budgets.
- **Blur Backdrops:** Generated tiny inline Base64 placeholders (`quality: 20`, 20px wide) providing immediate, layout-stable blur-up backdrops with zero blank-frame flashes.

---

## 2. Root Causes Mapped to Applied Fixes

| Issue / Root Cause | Impact | Technical Fix Applied |
| :--- | :--- | :--- |
| **UI Obstruction of Phone Screen**<br>Video pill sat at `absolute top-3 left-3` inside phone screen container (`overflow-hidden`), directly covering the `SOCIAL MATE` header logo and status bar. | Severely degraded showcase presentation; obscured app navigation. | **Extracted controls from phone display viewport:**<br>1. Introduced `MediaControlsSlotContext` in `DeviceFrame` (`CinematicDeviceFrame`, `LandscapeDeviceFrame`, and classic).<br>2. Positioned dedicated external controls slot directly below the phone frame bezel (`mt-3 sm:mt-4`).<br>3. `MediaPreview` renders the glassy status/control pill via React Portal into this slot.<br>4. Result: **0% app interface covered inside phone mockup**.<br>5. Retained only the centered "Tap to play" button strictly when autoplay is blocked or paused (disappears immediately upon playing). |
| **Dynamic Video Streaming Route**<br>`src/app/api/media/stream` parsed Range requests in Node.js runtime, bypassing static CDN caching and causing request serialization. | Unnecessary Node.js CPU overhead, no edge caching, potential hangs on slow networks. | **Static CDN Serving:**<br>1. Completely removed `src/app/api/media/stream/route.ts` and its parent directories.<br>2. Verified zero `/api/media/stream` references across `src/`.<br>3. Configured `next.config.ts` with `Cache-Control: public, max-age=31536000, immutable` for all `/assets/:path*`.<br>4. Verified native HTTP 206 / `Accept-Ranges: bytes` partial content handling. |
| **Blank Frame Flash & Hydration Mismatch**<br>Components waited for client-side `onLoad` before switching from `opacity-0` to `opacity-100`. | Visible flash of white/blank container during initial load. | **Synchronous Base64 Backdrop + Safe Hydration:**<br>1. High-resolution poster immediately renders over inline Base64 blur placeholder.<br>2. `isFramePainted` synchronized with `requestVideoFrameCallback` or `onPlaying`.<br>3. `readyState >= 3 && !paused` hydration check handles fast video starts.<br>4. Replaced synchronous effect state with `useMediaQuery` and `useSyncExternalStore` for Save-Data. |
| **Premature Carousel Auto-Advance**<br>`SocialMateShowcase` 7-second timer started immediately on slide mount, even when the video poster was still loading. | Slides auto-advanced before user could see the demo preview. | **`slideMediaReady` Gating:**<br>Added `slideMediaReady` state in `SocialMateShowcase` wired to `MediaPreview.onMediaReady`. Timer only counts down when media is actively ready and painted. |
| **Heavy Gallery Grid Layout & Video Preloading**<br>Gallery rendered multiple video elements simultaneously without virtualization or lazy strategies. | Network contention on page load; CPU spikes from multiple video decoders. | **Tiered Loading & Containment:**<br>1. First 8 gallery items set to `eager={true}` with `priority={index < 4}`; remainder lazy.<br>2. Applied `content-visibility: auto; contain-intrinsic-size: 0 500px;` to grid items.<br>3. Gallery cards pass `preload="none"` and `hideControls` (opens in Lightbox on click).<br>4. Lightbox preloads adjacent slides (`index ± 1`) for instantaneous swipe transitions. |

---

## 3. Inventory of Files Touched, Created, and Removed

### 3.1 Modified Code Files
- `src/components/ui/device-frame.tsx`:
  - Added `MediaControlsSlotContext` for decoupled external controls.
  - Added dedicated below-bezel slot to `CinematicDeviceFrame`, `LandscapeDeviceFrame`, and classic `DeviceFrame`.
  - Added `data-device-screen="true"` and `data-device-controls="true"` attributes for visual testing.
- `src/components/ui/media-preview.tsx`:
  - Removed internal top-left status pill from inside the video frame.
  - Implemented external glassy control pill portaled into `DeviceFrame` below the phone bezel.
  - Replaced synchronous `setState` in `useEffect` with `useMediaQuery` and `useSyncExternalStore`.
  - Added 44×44 touch targets, `aria-pressed`, `aria-label`, `aria-live="polite"` screen-reader live regions, and `prefers-reduced-motion` ping gating.
  - Implemented responsive mobile 480w video source selection.
- `src/components/home/social-mate-showcase.tsx`:
  - Bound hero video demo to messaging feature; integrated `socialMate.media.hero` into item catalog.
  - Added `slideMediaReady` state to prevent 7s auto-advance countdown while posters/videos load.
  - Implemented off-DOM adjacent slide preloading.
- `src/components/projects/gallery.tsx`:
  - Implemented `eager` first 8 items, lazy remainder, and `content-visibility: auto`.
  - Set `preload="none"` and `hideControls` on thumbnail cards.
  - Added `MediaControlsSlotContext.Provider` and external slot inside Lightbox.
  - Added adjacent item (`selectedIndex ± 1`) off-DOM preloading in Lightbox.
- `src/app/projects/[slug]/page.tsx`:
  - Injected high-priority hero video poster preload (`<link rel="preload" as="image" href={heroPoster} fetchpriority="high" />`).
- `next.config.ts`:
  - Set `Cache-Control: public, max-age=31536000, immutable` on `/assets/:path*`.
- `src/data/schemas.ts`:
  - Extended media types with `sources`, `mobileSrc`, `posterBlur`, and `blurDataURL`.
- `src/data/projects.ts`:
  - Configured optimized `.v2.mp4`, `.v2.webm`, mobile variants, and posters.

### 3.2 Deleted Files
- `src/app/api/media/stream/route.ts` (Dynamic streaming route removed; parent directory removed).

### 3.3 Created Files & Scripts
- `src/lib/media.ts`: Manifest helper and responsive srcset generator.
- `src/data/media-manifest.json`: Pre-computed width, height, blurDataURL, and variant mappings.
- `scripts/verify-outputs.mjs`: FFprobe video/poster verification script.
- `scripts/verify-production.mjs`: Puppeteer production verification with Fast/Slow 4G emulation and visual geometry checks.
- `scripts/unreferenced-assets.json`: Audit log of unreferenced static assets.
- `scripts/verification-results.json`: Output results from production tests.

---

## 4. Image Strategy & Trimming Timestamps

### 4.1 Image Strategy: Option A
Option A was chosen: build-time WebP optimization with pre-generated responsive variants (`360w`, `540w`, `720w`) and inline Base64 `blurDataURL` stored in `media-manifest.json`. This provides:
- Zero runtime Node.js image optimization overhead on Vercel/Cloudflare.
- Instant, layout-shift-free blur-up placeholders.
- 1-year immutable edge caching on CDN.

### 4.2 Video Trimming & Cropping Parameters
- **Social Mate Hero Video:**
  - Source: `social-mate-media-source/video/social_mate_social_features_edited_Trim.mp4` (1920 × 1080 master).
  - Crop filter: `crop=498:1080:711:0` (eliminates 1,422px of black letterbox bars).
  - Timestamps: `00:00:05` to `00:00:18` (13 seconds active app showcase).
  - Output sizes: 720 × 1562 (Desktop/Hero), 480 × 1040 (Mobile).
- **Social Mate AI Assistant Demo Video:**
  - Source: `social-mate-media-source/video/social_mate_ai_chat_and_providers_1.mp4` (1920 × 1080 master).
  - Crop filter: `crop=498:1080:711:0`.
  - Timestamps: `00:00:05` to `00:00:24` (19 seconds active chat & model switching).
  - Output sizes: 720 × 1558 (Desktop), 480 × 1038 (Mobile).

---

## 5. Measured Production Metrics & Command Outputs

### 5.1 Verification Script Output (`scripts/verification-results.json`)
```json
{
  "heroPosterVisibleFast4G": 1213,
  "heroVideoPlayingFast4G": 4228,
  "lcpFast4G": 2092,
  "aboveTheFoldBytesFast4G": 1656356,
  "mediaStreamCalls": 0,
  "cacheHeadersVerified": true,
  "acceptRangesVerified": true,
  "consoleErrors": [],
  "pillOverlapCheckPassed": true,
  "pillMovedUnderBezel": true,
  "newsWaveRendered": true,
  "finDashRendered": true,
  "notFoundHandled": true,
  "pausePlayTogglePassed": true,
  "slow4GPosterTime": 990,
  "slow4GVideoTime": 2711
}
```

### 5.2 Visual Geometry Verification (0% Phone Screen Overlap)
The production script measured the exact bounding client rects of the phone display screen and the moved control pill:
```json
{
  "screenRect": {
    "top": 669,
    "bottom": 1369,
    "left": 480,
    "right": 800
  },
  "pillRect": {
    "top": 1381,
    "bottom": 1439,
    "left": 571,
    "right": 709
  },
  "isBelowScreen": true,
  "hasOverlap": false
}
```
**Result:**
- Screen container bottom edge: `y = 1369px`
- Control pill top edge: `y = 1381px` (positioned 12px below bezel, centered at `x = 640px`)
- **Zero vertical or horizontal overlap.** 100% of the Social Mate app interface (header, stories, avatar icons, bottom nav) is completely unobstructed.

### 5.3 Build & Typecheck Outputs
- `npm run lint`: **Exit code 0** (0 errors, 0 warnings).
- `npx tsc --noEmit`: **Exit code 0** (0 errors).
- `npm run build`: **Exit code 0** (12/12 SSG/Static pages generated successfully in 3.0s).

---

## 6. Audit of Unreferenced Public Assets (Preserved on Disk)

Per instructions, the following 11 unreferenced files were identified and preserved on disk without deletion:

1. `public/assets/projects/social-mate/social_mate_social_features_edited_Trim.mp4` (68.6 MB — raw uncropped source video)
2. `public/assets/projects/social-mate/social_mate_ai_chat_and_providers_1.mp4` (56.2 MB — raw uncropped source video)
3. `public/assets/projects/social-mate.png` (594.7 KB — legacy root project banner)
4. `public/assets/projects/social-mate/app_icon.png` (357.3 KB — legacy high-res icon)
5. `public/assets/profile/profile_2.webp` (159.6 KB — alternate portrait photograph)
6. `public/assets/profile/profile-placeholder.svg` (0.2 KB — initial boilerplate avatar)
7. `public/file.svg` (0.4 KB — default Next.js template SVG)
8. `public/globe.svg` (1.0 KB — default Next.js template SVG)
9. `public/next.svg` (1.3 KB — default Next.js template SVG)
10. `public/vercel.svg` (0.1 KB — default Next.js template SVG)
11. `public/window.svg` (0.4 KB — default Next.js template SVG)

---

## 7. Deviations, Risks & Recommendations

1. **Unreferenced Raw Videos in `public/`:**
   - The two raw video masters (`social_mate_social_features_edited_Trim.mp4` and `social_mate_ai_chat_and_providers_1.mp4`) in `public/assets/projects/social-mate/` total **~125 MB**.
   - While they do not affect page load because nothing references them, they will increase deploy bundle size on Vercel/Cloudflare if left in `public/`.
   - *Recommendation:* Move these two master files out of `public/` into an external storage bucket or the root `social-mate-media-source/` directory prior to deployment.
2. **Device Frame Extensibility:**
   - Classic `DeviceFrame` was updated with `MediaControlsSlotContext.Provider` to match `CinematicDeviceFrame` and `LandscapeDeviceFrame`. All device frames now automatically support external status pills without layout shift or UI overlap.
3. **Git Cleanliness:**
   - No git reset or commit operations were executed, strictly adhering to the preservation instructions.
