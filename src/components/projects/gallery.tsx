"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/data/schemas";
import { MediaPreview } from "@/components/ui/media-preview";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { EASE_OUT, staggerContainer } from "@/lib/motion";

interface GalleryCategory {
  category: string;
  items: MediaItem[];
}

interface ProjectGalleryProps {
  categories: GalleryCategory[];
}

interface ParallaxGridProps {
  items: MediaItem[];
  onOpenLightbox: (index: number) => void;
  isMd: boolean;
  prefersReducedMotion: boolean;
}

function ParallaxGrid({ items, onOpenLightbox, isMd, prefersReducedMotion }: ParallaxGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  // Column-based scroll parallax for the grid on md+ (only runs when ParallaxGrid is mounted)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  const colParallaxEven = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const colParallaxOdd = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => {
          const isEvenColumn = index % 2 === 0;
          const colParallax = isEvenColumn ? colParallaxEven : colParallaxOdd;

          return (
            <motion.div
              key={item.id}
              style={!prefersReducedMotion && isMd ? { y: colParallax } : undefined}
              variants={staggerContainer(0.04, 0.05)}
              className="flex flex-col"
            >
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className={cn(
                  "relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#0a0e1c] p-1.5 border border-white/10 shadow-lg group cursor-zoom-in block outline-none focus-visible:ring-2 focus-visible:ring-primary aspect-[9/19] w-full"
                )}
                onClick={() => onOpenLightbox(index)}
                aria-label={`View ${item.alt} fullscreen`}
              >
                <motion.div
                  layoutId={`gallery-item-${item.id}`}
                  className="relative w-full h-full rounded-[calc(1.5rem-6px)] overflow-hidden bg-[#060913]"
                >
                  <MediaPreview
                    media={item}
                    objectFit={item.type === "video" ? "contain" : "cover"}
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </motion.div>

                {item.caption && (
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left pointer-events-none">
                    <p className="text-white text-xs font-medium leading-relaxed line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function ProjectGallery({ categories }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.category || "");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const isMd = useMediaQuery("(min-width: 768px)");

  const currentItems = useMemo(
    () => categories.find((c) => c.category === activeCategory)?.items || [],
    [categories, activeCategory]
  );

  const openLightbox = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setSelectedIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev < currentItems.length - 1 ? prev + 1 : 0));
  }, [currentItems.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : currentItems.length - 1));
  }, [currentItems.length]);

  // Touch / pointer swipe navigation in lightbox
  const { gestureProps } = useSwipeNavigation({
    onNext: nextImage,
    onPrev: prevImage,
    disabled: !lightboxOpen,
  });

  // Neighbor preloading for instantaneous transitions
  useEffect(() => {
    if (!lightboxOpen || currentItems.length <= 1) return;
    const prevIdx = (selectedIndex - 1 + currentItems.length) % currentItems.length;
    const nextIdx = (selectedIndex + 1) % currentItems.length;

    [prevIdx, nextIdx].forEach((idx) => {
      const item = currentItems[idx];
      if (!item) return;
      const url = item.type === "video" ? item.poster : item.url;
      if (url) {
        const img = new Image();
        img.src = url;
      }
    });
  }, [lightboxOpen, selectedIndex, currentItems]);

  // Keyboard navigation & Focus Trap
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();

      // Basic focus trap
      if (e.key === "Tab") {
        if (!lightboxRef.current) return;
        const focusableElements = lightboxRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  if (!categories || categories.length === 0) return null;

  const isResponsiveShowcase =
    currentItems.length > 0 &&
    currentItems.every(
      (item) => typeof item.width === "number" && typeof item.height === "number"
    );

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-border/50 pb-4">
        {categories.map((c) => {
          const isSelected = activeCategory === c.category;
          return (
            <button
              key={c.category}
              onClick={() => setActiveCategory(c.category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                isSelected
                  ? "bg-text text-background shadow-md shadow-black/10"
                  : "bg-surface-variant text-text-secondary hover:text-text hover:bg-border"
              )}
            >
              {c.category}
            </button>
          );
        })}
      </div>

      {isResponsiveShowcase ? (
        <div className="flex flex-col gap-10">
          <AnimatePresence mode="popLayout">
            {currentItems.map((item, index) => {
              const isLandscape = (item.width ?? 0) > (item.height ?? 0);
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="rounded-3xl bg-surface border border-border/80 p-6 md:p-8 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-border/50">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[var(--project-accent,var(--primary))]/10 text-[var(--project-accent,var(--primary))] border border-[var(--project-accent,var(--primary))]/20">
                          0{index + 1} · Viewport Tier
                        </span>
                        <span className="text-xs font-mono text-text-secondary">
                          {item.width} × {item.height}px
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-text">
                        {item.caption || item.alt}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => openLightbox(index)}
                      className="self-start md:self-center px-4 py-2 rounded-full text-xs font-semibold bg-surface-variant text-text-secondary hover:text-text hover:bg-border transition-colors"
                    >
                      Inspect Fullscreen
                    </button>
                  </div>

                  {item.description && (
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6 max-w-4xl">
                      {item.description}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    aria-label={`View ${item.alt} fullscreen`}
                    className={cn(
                      "relative w-full rounded-2xl overflow-hidden bg-surface-variant/60 border border-border/60 group cursor-zoom-in block outline-none focus-visible:ring-2 focus-visible:ring-primary p-3 md:p-6",
                      isLandscape
                        ? "aspect-[16/10] md:aspect-[16/9]"
                        : "max-w-sm mx-auto aspect-[9/16]"
                    )}
                  >
                    <motion.div
                      layoutId={`gallery-item-${item.id}`}
                      className="w-full h-full"
                    >
                      <MediaPreview
                        media={item}
                        objectFit="contain"
                        className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                      />
                    </motion.div>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      ) : (
        <ParallaxGrid
          items={currentItems}
          onOpenLightbox={openLightbox}
          isMd={isMd}
          prefersReducedMotion={prefersReducedMotion}
        />
      )}

      {/* Lightbox with Shared-Element & Touch Swipe */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery fullscreen"
          >
            <button
              ref={closeButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-6 right-6 p-3 rounded-full bg-surface hover:bg-surface-variant text-text transition-colors z-[110] outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Gesture-aware Lightbox Stage */}
            <motion.div
              {...gestureProps}
              style={{ touchAction: "pan-y" }}
              className="relative w-full max-w-5xl flex-1 min-h-0 max-h-[64vh] md:max-h-[74vh] flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItems[selectedIndex]?.id || selectedIndex}
                  layoutId={
                    currentItems[selectedIndex]?.id
                      ? `gallery-item-${currentItems[selectedIndex].id}`
                      : undefined
                  }
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  {currentItems[selectedIndex] && (
                    <MediaPreview
                      media={currentItems[selectedIndex]}
                      priority
                      eager
                      objectFit="contain"
                      className="w-full h-full bg-transparent"
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {currentItems[selectedIndex]?.caption && (
              <div
                className="mt-4 px-4 max-w-3xl text-center shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {currentItems[selectedIndex].caption}
                </p>
              </div>
            )}

            {/* Lightbox Controls */}
            <div
              className="mt-4 shrink-0 flex items-center gap-6 p-2 rounded-full bg-surface-variant/80 backdrop-blur-md border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prevImage}
                className="p-3 rounded-full bg-surface hover:bg-surface-variant transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="hud-label text-xs tabular-nums min-w-[3rem] text-center text-text">
                {selectedIndex + 1} <span className="opacity-40">/</span> {currentItems.length}
              </span>
              <button
                type="button"
                onClick={nextImage}
                className="p-3 rounded-full bg-surface hover:bg-surface-variant transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
