"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/data/schemas";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

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
}

export function MediaPreview({
  media,
  className,
  priority = false,
  objectFit = "cover",
  eager = false,
}: MediaPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      { rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const isVideoPriority = priority || Boolean(media.priority);
  const shouldRender = eager || isInView || isVideoPriority;

  if (media.type === "video") {
    const videoStreamUrl = `/api/media/stream?src=${encodeURIComponent(media.url)}`;

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
        {/* Crisp poster fallback (NO blur-md), visible until the video actually fires onPlaying */}
        {media.poster && (
          <Image
            src={media.poster}
            alt={media.alt}
            fill
            priority={isVideoPriority}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "absolute inset-0 z-0 transition-opacity duration-500",
              isPlaying && !hasError ? "opacity-0 pointer-events-none" : "opacity-100",
              objectFit === "cover" ? "object-cover" : "object-contain"
            )}
          />
        )}

        {shouldRender && !hasError && (
          <video
            ref={videoRef}
            src={videoStreamUrl}
            poster={media.poster}
            preload={isVideoPriority ? "auto" : "metadata"}
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            controls={prefersReducedMotion}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onPlaying={() => {
              setIsPlaying(true);
              setIsLoaded(true);
            }}
            onError={(e) => {
              console.warn("Video failed to play via streaming route:", media.url, e);
              setHasError(true);
            }}
            className={cn(
              "w-full h-full relative z-10 transition-opacity duration-500",
              isPlaying ? "opacity-100" : "opacity-0",
              objectFit === "cover" ? "object-cover" : "object-contain"
            )}
          />
        )}
      </div>
    );
  }

  // Image or GIF
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
      {shouldRender && (
        <Image
          src={media.url}
          alt={media.alt}
          fill
          priority={priority || media.priority}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            eager
              ? "opacity-100"
              : cn("transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0"),
            objectFit === "cover" ? "object-cover" : "object-contain"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
