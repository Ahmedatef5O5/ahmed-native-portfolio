"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useId,
  useContext,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Play, Pause, RefreshCw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MediaItem, VideoSource } from "@/data/schemas";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { MediaControlsSlotContext } from "@/components/ui/device-frame";
import { getMediaMeta, getSrcSet } from "@/lib/media";

export type VideoState = "idle" | "loading" | "playing" | "blocked" | "paused" | "error";

interface MediaPreviewProps {
  media: MediaItem;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
  /**
   * When true, bypasses the IntersectionObserver in-view gate
   * to immediately mount and render the media item without an empty frame flash.
   */
  eager?: boolean;
  /**
   * Optional callback when media has loaded or started playing
   */
  onMediaReady?: () => void;
  /**
   * When true, suppresses video indicator and control pills (e.g. For thumbnail buttons)
   */
  hideControls?: boolean;
  /**
   * Explicit video preload strategy ("none" | "metadata" | "auto")
   */
  preload?: "none" | "metadata" | "auto";
}

export function MediaPreview({
  media,
  className,
  priority = false,
  objectFit = "cover",
  eager = false,
  onMediaReady,
  hideControls = false,
  preload,
}: MediaPreviewProps) {
  const isVideo = media.type === "video";
  const isPriority = priority || Boolean(media.priority);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobileViewport = useMediaQuery("(max-width: 767px)");
  const controlsSlot = useContext(MediaControlsSlotContext);

  // Network Information API check for Save-Data or slow 2G
  const isDataSaver = useSyncExternalStore(
    (callback) => {
      const nav =
        typeof navigator !== "undefined"
          ? (navigator as unknown as { connection?: EventTarget })
          : undefined;
      nav?.connection?.addEventListener("change", callback);
      return () => nav?.connection?.removeEventListener("change", callback);
    },
    () => {
      const nav =
        typeof navigator !== "undefined"
          ? (navigator as unknown as {
              connection?: { saveData?: boolean; effectiveType?: string };
            })
          : undefined;
      return (
        nav?.connection?.saveData === true ||
        nav?.connection?.effectiveType === "2g" ||
        nav?.connection?.effectiveType === "slow-2g"
      );
    },
    () => false
  );

  // Component state
  const userPaused = useRef(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(media.durationSec || 0);
  const [isInView, setIsInView] = useState(false);
  const [videoState, setVideoState] = useState<VideoState>("idle");
  const [isFramePainted, setIsFramePainted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statusId = useId();

  // Resolve manifest metadata for blur placeholder and responsive variants
  const mediaMeta = getMediaMeta(media.url);
  const posterMeta = media.poster ? getMediaMeta(media.poster) : undefined;
  const blurPlaceholder =
    media.posterBlur ||
    posterMeta?.blurDataURL ||
    media.blurDataURL ||
    mediaMeta?.blurDataURL;

  // Responsive srcset for images
  const imageSrcSet = getSrcSet(media.url);

  // IntersectionObserver: single instance, threshold 0.25
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInView(true);
          if (isVideo && videoRef.current) {
            // Attempt autoplay only if allowed and not paused by user
            if (!prefersReducedMotion && !isDataSaver && !userPaused.current) {
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch((err) => {
                  console.info("Autoplay gated by browser policy:", err.name);
                  setVideoState("blocked");
                });
              }
            }
          }
        } else {
          setIsInView(false);
          // Pause offscreen video to preserve GPU/CPU cycles
          if (isVideo && videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.25, rootMargin: "60px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isVideo, prefersReducedMotion, isDataSaver]);

  // Hydration safety & video event listeners
  useEffect(() => {
    if (!isVideo) return;
    const video = videoRef.current;
    if (!video) return;

    // Fix missed playing event: if already ready and playing when mounted
    if (video.readyState >= 3 && !video.paused) {
      setVideoState("playing");
      setIsFramePainted(true);
      onMediaReady?.();
    }

    const handleLoadStart = () => {
      if (videoState !== "playing") {
        setVideoState("loading");
      }
    };

    const handleWaiting = () => {
      if (videoState === "playing") {
        setVideoState("loading");
      }
    };

    const handleCanPlay = () => {
      if (videoState === "loading" && video.paused) {
        // Ready to play
      }
    };

    const handlePlaying = () => {
      setVideoState("playing");
      // Use requestVideoFrameCallback if available to ensure frame is painted
      if ("requestVideoFrameCallback" in video) {
        (
          video as unknown as {
            requestVideoFrameCallback: (cb: () => void) => void;
          }
        ).requestVideoFrameCallback(() => {
          setIsFramePainted(true);
          onMediaReady?.();
        });
      } else {
        setIsFramePainted(true);
        onMediaReady?.();
      }
    };

    const handlePause = () => {
      if (videoState !== "blocked" && videoState !== "error") {
        setVideoState("paused");
      }
    };

    const handleError = () => {
      console.warn("Video failed to play:", media.url);
      setVideoState("error");
    };

    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("error", handleError);
    };
  }, [isVideo, media.url, videoState, onMediaReady, isInView]);

  // Autoplay timeout watchdog (6s fallback to blocked/tap-to-play on slow networks)
  useEffect(() => {
    if (!isVideo || videoState !== "loading") return;

    const timeout = setTimeout(() => {
      if (videoRef.current && videoRef.current.paused && videoState === "loading") {
        setVideoState("blocked");
      }
    }, 6000);

    return () => clearTimeout(timeout);
  }, [isVideo, videoState]);

  // User gesture play trigger
  const handleUserPlay = useCallback(() => {
    if (!videoRef.current) return;
    userPaused.current = false;
    if (videoRef.current.error) videoRef.current.load();
    setVideoState("loading");
    videoRef.current
      .play()
      .then(() => {
        setVideoState("playing");
      })
      .catch((err) => {
        console.warn("Play after user gesture failed:", err);
        setVideoState("blocked");
      });
  }, []);

  const handleUserTogglePause = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!videoRef.current) return;

      if (videoRef.current.paused) {
        handleUserPlay();
      } else {
        userPaused.current = true;
        videoRef.current.pause();
        setVideoState("paused");
      }
    },
    [handleUserPlay]
  );

  const shouldRenderContent = eager || isInView || isPriority;

  // Decide effective video source: mobile 480w variant on mobile viewports if provided
  const effectiveSources: VideoSource[] = React.useMemo(() => {
    if (media.sources && media.sources.length > 0) {
      if (isMobileViewport && media.mobileSrc) {
        return [
          { src: media.mobileSrc, type: "video/mp4" },
          ...media.sources,
        ];
      }
      return media.sources;
    }
    // Fallback single source
    const fallbackSrc = isMobileViewport && media.mobileSrc ? media.mobileSrc : media.url;
    return [{ src: fallbackSrc, type: "video/mp4" }];
  }, [media.sources, media.mobileSrc, media.url, isMobileViewport]);

  // Never preload an entire long demo merely because its poster is a priority image.
  const preloadMode = isDataSaver ? "none" : (preload || "metadata");

  // Screen-reader status label
  const srStatusText = {
    idle: "Demo idle",
    loading: "Loading demo preview",
    playing: "Demo is actively playing",
    paused: "Demo is paused",
    blocked: "Autoplay blocked — tap to play",
    error: "Demo preview temporarily unavailable",
  }[videoState];

  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;

  const renderControlPill = () => {
    if (hideControls) return null;
    const playing = videoState === "playing";
    return (
      <div data-video-controls="true" className="pointer-events-auto w-[240px] px-1 py-1 text-text">
        <div className="flex items-center gap-3">
          <button type="button" onClick={handleUserTogglePause}
            aria-label={playing ? "Pause demo" : videoState === "error" ? "Retry demo" : "Play demo"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-primary">
            {videoState === "loading" ? <Loader2 size={18} className={prefersReducedMotion ? "" : "animate-spin"} /> : videoState === "error" ? <RefreshCw size={18} /> : playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5 fill-current" />}
          </button>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-medium tracking-[0.16em] uppercase text-text-muted">{videoState === "loading" ? "Preparing" : videoState === "error" ? "Retry" : playing ? "Playing" : "Watch demo"}</span>
              <span className="text-[10px] tabular-nums text-text-muted">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
            <input type="range" aria-label="Seek demo" min={0} max={duration || 1} step={0.1} value={currentTime}
              onChange={(event) => { const time = Number(event.target.value); if (videoRef.current && Number.isFinite(videoRef.current.duration)) { videoRef.current.currentTime = time; setCurrentTime(time); } }}
              style={{ background: `linear-gradient(to right, var(--color-primary) ${duration ? currentTime / duration * 100 : 0}%, var(--color-border) 0%)` }}
              className="mt-3 mb-2 block h-[3px] w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary" />
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // VIDEO RENDERER
  // ----------------------------------------------------
  if (isVideo) {
    const hasExternalSlot = Boolean(controlsSlot?.slot);

    return (
      <>
        <div
          ref={containerRef}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className={cn(
            "relative w-full h-full overflow-hidden bg-surface-variant flex items-center justify-center select-none",
            className
          )}
        >
          {/* Screen Reader Live Region */}
          <div id={statusId} className="sr-only" aria-live="polite">
            {srStatusText}
          </div>

          {/* ALWAYS PRESENT: Blur Placeholder base64 backdrop */}
          {blurPlaceholder && (
            <div
              aria-hidden="true"
              className="absolute inset-0 z-0 bg-cover bg-center filter blur-xl scale-105 opacity-80 pointer-events-none transition-opacity duration-700"
              style={{ backgroundImage: `url(${blurPlaceholder})` }}
            />
          )}

          {/* High-res Poster Image with smooth crossfade */}
          {media.poster && (
            <div
              className={cn(
                "absolute inset-0 z-10 transition-opacity duration-700 ease-out",
                isFramePainted
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              )}
            >
              <Image
                src={media.poster}
                alt={media.alt || "Video preview poster"}
                fill
                priority={isPriority}
                sizes="(max-width: 768px) 100vw, 520px"
                className={cn(
                  "w-full h-full",
                  objectFit === "cover" ? "object-cover" : "object-contain"
                )}
              />
              {/* Subtle shimmer sweep over poster while loading */}
              {videoState === "loading" && !prefersReducedMotion && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"
                />
              )}
            </div>
          )}

          {/* A single unobtrusive play affordance; the timeline lives below the device. */}
          {!hideControls && (videoState === "blocked" || videoState === "paused" || (videoState === "idle" && (prefersReducedMotion || isDataSaver))) && (
            <div className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none">
              <button type="button" onClick={handleUserPlay} aria-label="Play video demo"
                className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/50 bg-surface/90 text-primary shadow-xl backdrop-blur-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-primary">
                <Play size={24} className="ml-1 fill-current" />
              </button>
            </div>
          )}

          {/* Static HTML5 Video Element with versioned static files and <source> children */}
          {shouldRenderContent && (
            <video
              ref={videoRef}
              src={isInView || isFramePainted || videoState !== "idle" ? effectiveSources[0]?.src : undefined}
              poster={media.poster}
              preload={preloadMode}
              autoPlay={isInView && !prefersReducedMotion && !isDataSaver}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : (media.durationSec || 0))}
              muted
              loop
              playsInline
              controls={prefersReducedMotion}
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className={cn(
                "w-full h-full relative z-15 transition-opacity duration-700 ease-out",
                isFramePainted ? "opacity-100" : "opacity-0",
                objectFit === "cover" ? "object-cover" : "object-contain"
              )}
            >
              Your browser does not support HTML5 video demo.
            </video>
          )}
        </div>

        {/* Portal control pill to dedicated external slot outside phone screen */}
        {isMounted && hasExternalSlot && controlsSlot?.slot && (
          createPortal(renderControlPill(), controlsSlot.slot)
        )}

        {/* Fallback external slot when not embedded in a frame */}
        {!hasExternalSlot && !hideControls && (
          <div className="relative z-20 mt-3 flex items-center justify-center min-h-[36px]">
            {renderControlPill()}
          </div>
        )}
      </>
    );
  }

  // ----------------------------------------------------
  // IMAGE RENDERER (Option A: Static WebP with blur-up)
  // ----------------------------------------------------
  const imgWidth = media.width || mediaMeta?.width || 720;
  const imgHeight = media.height || mediaMeta?.height || 1560;

  return (
    <div
      ref={containerRef}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      className={cn(
        "relative w-full h-full overflow-hidden bg-surface-variant flex items-center justify-center select-none",
        className
      )}
    >
      {/* ALWAYS PRESENT: Blur Placeholder base64 backdrop */}
      {blurPlaceholder && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-cover bg-center filter blur-xl scale-105 opacity-80 pointer-events-none transition-opacity duration-700"
          style={{ backgroundImage: `url(${blurPlaceholder})` }}
        />
      )}

      {/* Skeleton Shimmer Sweep while image is loading */}
      {!imageLoaded && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-5 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] pointer-events-none"
        />
      )}

      {shouldRenderContent && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={media.url}
          srcSet={imageSrcSet}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={media.alt || "Project showcase screenshot"}
          width={imgWidth}
          height={imgHeight}
          decoding="async"
          loading={isPriority || eager ? "eager" : "lazy"}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          onLoad={() => {
            setImageLoaded(true);
            onMediaReady?.();
          }}
          className={cn(
            "w-full h-full relative z-10 transition-opacity duration-500 ease-out",
            imageLoaded || eager || isPriority ? "opacity-100" : "opacity-0",
            objectFit === "cover" ? "object-cover" : "object-contain"
          )}
        />
      )}
    </div>
  );
}
