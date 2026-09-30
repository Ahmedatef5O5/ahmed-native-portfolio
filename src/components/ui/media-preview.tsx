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
}

export function MediaPreview({ media, className, priority = false, objectFit = "cover" }: MediaPreviewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          // Optional: Pause video when out of view to save CPU
          if (videoRef.current) {
            if (videoRef.current.readyState >= 1) {
              setIsLoaded(true);
            }
            videoRef.current.play().catch(() => {}); // handle auto-play restrictions silently
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

  if (media.type === "video") {
    return (
      <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden bg-surface-variant flex items-center justify-center", className)}>
        {!isLoaded && media.poster && (
          <Image
            src={media.poster}
            alt={media.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn("absolute inset-0 z-0 blur-md transition-opacity duration-700", objectFit === "cover" ? "object-cover" : "object-contain")}
          />
        )}
        {(isInView || priority || media.priority) && (
          <video
            ref={videoRef}
            src={media.url}
            poster={media.poster}
            autoPlay={!prefersReducedMotion}
            muted
            loop
            playsInline
            controls={prefersReducedMotion} // Give controls if autoplay is disabled
            onLoadedMetadata={() => setIsLoaded(true)}
            onLoadedData={() => setIsLoaded(true)}
            onCanPlay={() => setIsLoaded(true)}
            onPlaying={() => setIsLoaded(true)}
            className={cn("w-full h-full relative z-10 transition-opacity duration-700", 
              isLoaded ? "opacity-100" : "opacity-0",
              objectFit === "cover" ? "object-cover" : "object-contain"
            )}
          />
        )}
      </div>
    );
  }

  // Image or GIF
  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden bg-surface-variant flex items-center justify-center", className)}>
      {(isInView || priority) && (
        <Image
          src={media.url}
          alt={media.alt}
          fill
          priority={priority || media.priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "transition-opacity duration-500",
            objectFit === "cover" ? "object-cover" : "object-contain",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
