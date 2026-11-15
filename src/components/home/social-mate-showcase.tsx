"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
} from "motion/react";
import { projects } from "@/data/projects";
import type { ProjectFeature, MediaItem } from "@/data/schemas";
import { DeviceFrame, LandscapeDeviceFrame } from "@/components/ui/device-frame";
import { MediaPreview } from "@/components/ui/media-preview";
import { Reveal } from "@/components/ui/reveal";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronsLeftRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation";
import { EASE_OUT } from "@/lib/motion";

interface SocialMateShowcaseProps {
  hideCTA?: boolean;
  projectSlug?: string;
  /** Deprecated in Task 3; carousel is used universally for clean scroll physics */
  layout?: "carousel" | "scrollytelling";
}

const AUTO_ADVANCE_DURATION_MS = 7000;

export function SocialMateShowcase({
  hideCTA = false,
  projectSlug = "social-mate",
}: SocialMateShowcaseProps = {}) {
  const socialMate = projects.find((p) => p.slug === projectSlug);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeViewportIndex, setActiveViewportIndex] = useState(0);
  const [hasSwiped, setHasSwiped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Auto-advance states
  const [userInteracted, setUserInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isInViewport, setIsInViewport] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const totalFeatures = socialMate?.features.length ?? 0;

  const allGalleryItems = useMemo(
    () => socialMate?.media.gallery?.flatMap((g) => g.items) || [],
    [socialMate]
  );

  // Check how many features have bound media by featureId
  const featureBoundCount = useMemo(() => {
    if (!socialMate) return 0;
    return socialMate.features.filter((f) =>
      allGalleryItems.some((item) => item.featureId === f.id)
    ).length;
  }, [socialMate, allGalleryItems]);

  // Static showcase for projects with low feature count (FinDash)
  const isStaticShowcase = featureBoundCount < 3;

  const markUserInteracted = useCallback(() => {
    setUserInteracted(true);
  }, []);

  const handleNext = useCallback(() => {
    if (!totalFeatures) return;
    setActiveIndex((prev) => (prev + 1) % totalFeatures);
    setProgressKey((k) => k + 1);
  }, [totalFeatures]);

  const handlePrev = useCallback(() => {
    if (!totalFeatures) return;
    setActiveIndex((prev) => (prev - 1 + totalFeatures) % totalFeatures);
    setProgressKey((k) => k + 1);
  }, [totalFeatures]);

  const handleSwipeSuccess = useCallback(() => {
    setHasSwiped(true);
    markUserInteracted();
  }, [markUserInteracted]);

  const { gestureProps, dragX, direction, setDirection } = useSwipeNavigation({
    onNext: handleNext,
    onPrev: handlePrev,
    onSwipeSuccess: handleSwipeSuccess,
    disabled: isStaticShowcase,
  });

  const nextFeatureWithDir = useCallback(() => {
    markUserInteracted();
    setDirection(1);
    handleNext();
  }, [markUserInteracted, setDirection, handleNext]);

  const prevFeatureWithDir = useCallback(() => {
    markUserInteracted();
    setDirection(-1);
    handlePrev();
  }, [markUserInteracted, setDirection, handlePrev]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      markUserInteracted();
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      setProgressKey((k) => k + 1);
    },
    [activeIndex, markUserInteracted, setDirection]
  );

  const handleStageKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (isStaticShowcase) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevFeatureWithDir();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextFeatureWithDir();
      }
    },
    [isStaticShowcase, nextFeatureWithDir, prevFeatureWithDir]
  );

  // In-viewport observer for auto-advance
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Document visibility change listener for auto-advance
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Auto-advance timer: 7 seconds per slide, paused on hover/focus/hidden/offscreen, permanently stopped on interaction
  const isAutoAdvancePaused = isHovered || isFocused || !isDocumentVisible || !isInViewport;
  const isAutoAdvanceActive =
    !isStaticShowcase &&
    !userInteracted &&
    !prefersReducedMotion &&
    totalFeatures > 1 &&
    !isAutoAdvancePaused;

  useEffect(() => {
    if (!isAutoAdvanceActive) return;

    const timer = setTimeout(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % totalFeatures);
      setProgressKey((k) => k + 1);
    }, AUTO_ADVANCE_DURATION_MS);

    return () => clearTimeout(timer);
  }, [isAutoAdvanceActive, activeIndex, totalFeatures, setDirection, progressKey]);

  // Springs and transforms for visual follow during pan
  const dragXSpring = useSpring(dragX, { stiffness: 400, damping: 30 });
  const rotateSpring = useTransform(dragXSpring, [-40, 40], [-1.5, 1.5]);

  const resolveMediaItem = useCallback(
    (feature: ProjectFeature, viewportIndex = 0): MediaItem | undefined => {
      if (!socialMate) return undefined;

      const featureViewportItems = allGalleryItems.filter(
        (item) =>
          item.featureId === feature.id &&
          typeof item.width === "number" &&
          typeof item.height === "number"
      );
      if (feature.id === "adaptive-responsive-dashboard" && featureViewportItems.length > 1) {
        return featureViewportItems[viewportIndex % featureViewportItems.length];
      }

      const featureMedia =
        allGalleryItems.find((item) => item.featureId === feature.id && item.role === "demo") ||
        allGalleryItems.find((item) => item.featureId === feature.id && item.role === "storytelling") ||
        allGalleryItems.find((item) => item.featureId === feature.id);

      if (featureMedia) return featureMedia;

      // Legacy fallback
      const matchedCategory = socialMate.media.gallery?.find(
        (g) =>
          feature.title.toLowerCase().includes(g.category.toLowerCase()) ||
          g.category.toLowerCase().includes(feature.title.toLowerCase())
      );
      if (matchedCategory) {
        return (
          matchedCategory.items.find((item) => item.role === "storytelling" || item.role === "demo") ||
          matchedCategory.items[0]
        );
      }
      const feedCategory = socialMate.media.gallery?.find((g) => g.category === "Feed & Communities");
      return (
        feedCategory?.items.find((item) => item.role === "storytelling" || item.role === "demo") ||
        socialMate.media.gallery?.[0]?.items[0]
      );
    },
    [allGalleryItems, socialMate]
  );

  // Preload next and previous feature media off-DOM
  useEffect(() => {
    if (typeof window === "undefined" || !socialMate || totalFeatures <= 1) return;

    const prevIdx = (activeIndex - 1 + totalFeatures) % totalFeatures;
    const nextIdx = (activeIndex + 1) % totalFeatures;

    [prevIdx, nextIdx].forEach((idx) => {
      const feat = socialMate.features[idx];
      if (!feat) return;

      const media = resolveMediaItem(feat, 0);
      if (!media) return;

      const url = media.type === "video" ? media.poster : media.url;
      if (url) {
        const img = new window.Image();
        img.src = url;
      }
    });
  }, [activeIndex, socialMate, totalFeatures, resolveMediaItem]);

  if (!socialMate) return null;

  const activeFeature = socialMate.features[activeIndex];
  const Icon = (Icons[activeFeature.icon as keyof typeof Icons] as React.ElementType) || Icons.Circle;

  const featureViewportItems = allGalleryItems.filter(
    (item) =>
      item.featureId === activeFeature.id &&
      typeof item.width === "number" &&
      typeof item.height === "number"
  );
  const hasMultiViewportItems =
    activeFeature.id === "adaptive-responsive-dashboard" && featureViewportItems.length > 1;

  const rawMediaItem = resolveMediaItem(activeFeature, activeViewportIndex);

  const isLandscapeMedia = Boolean(
    rawMediaItem?.width && rawMediaItem?.height && rawMediaItem.width > rawMediaItem.height
  );

  const mediaItem =
    rawMediaItem && !isLandscapeMedia && socialMate.slug === "fin-dash"
      ? { ...rawMediaItem, url: socialMate.media.hero.url }
      : rawMediaItem;

  const landscapeAspectRatio =
    rawMediaItem?.width && rawMediaItem?.height
      ? rawMediaItem.width / rawMediaItem.height
      : 16 / 10;

  const blurAmount = isMobile ? "4px" : "6px";

  const screenVariants = {
    enter: (dir: number) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir * 48,
            scale: 1.02,
            filter: `blur(${blurAmount})`,
          },
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : { duration: 0.5, ease: EASE_OUT },
    },
    exit: (dir: number) =>
      prefersReducedMotion
        ? {
            opacity: 0,
            transition: { duration: 0.2 },
          }
        : {
            opacity: 0,
            x: dir * -48,
            scale: 0.98,
            filter: `blur(${blurAmount})`,
            transition: { duration: 0.45, ease: EASE_OUT },
          },
  };

  const textVariants = {
    enter: (dir: number) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : {
            opacity: 0,
            x: dir * 28,
            filter: `blur(${blurAmount})`,
          },
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: prefersReducedMotion
        ? { duration: 0.2 }
        : { duration: 0.45, ease: EASE_OUT },
    },
    exit: (dir: number) =>
      prefersReducedMotion
        ? {
            opacity: 0,
            transition: { duration: 0.2 },
          }
        : {
            opacity: 0,
            x: dir * -28,
            filter: `blur(${blurAmount})`,
            transition: { duration: 0.4, ease: EASE_OUT },
          },
  };

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="py-24 scroll-mt-24 bg-background overflow-x-clip relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={() => setIsFocused(false)}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <Reveal className="text-center mb-12 md:mb-16">
          <span className="hud-label text-[var(--project-accent,var(--primary))] mb-3 block">
            {hideCTA ? "02 — SHOWCASE" : "Featured Project"}
          </span>
          <h2 className="type-headline font-display text-text mb-4">
            {socialMate.title}
          </h2>
          <p className="type-lead text-text-secondary max-w-2xl mx-auto">
            {socialMate.positioning}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Column: Device Stage */}
          <div className="flex flex-col items-center justify-center w-full">
            {/* Viewport Tier Tabs (for responsive multi-layout showcases e.g. FinDash) */}
            {hasMultiViewportItems && (
              <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface-variant/80 border border-border mb-6">
                {featureViewportItems.map((item, idx) => {
                  const shortLabel = item.caption?.split("—")[0]?.trim() || `Layout ${idx + 1}`;
                  const isSelected = idx === activeViewportIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        markUserInteracted();
                        setActiveViewportIndex(idx);
                      }}
                      className={cn(
                        "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-300",
                        isSelected
                          ? "bg-primary text-white shadow-sm"
                          : "text-text-secondary hover:text-text"
                      )}
                    >
                      {shortLabel}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Gesture-enabled or Static Device Stage */}
            <motion.div
              {...(!isStaticShowcase ? gestureProps : {})}
              role="region"
              aria-roledescription={isStaticShowcase ? undefined : "carousel"}
              aria-label={`${socialMate.title} feature showcase`}
              tabIndex={isStaticShowcase ? undefined : 0}
              onKeyDown={handleStageKeyDown}
              style={{ touchAction: isStaticShowcase ? "auto" : "pan-y" }}
              className={cn(
                "w-full flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1",
                isStaticShowcase
                  ? "select-none cursor-default"
                  : "select-none cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-3xl"
              )}
            >
              {/* Screen reader status */}
              <div className="sr-only" aria-live="polite" aria-atomic="true">
                {`Feature ${activeIndex + 1} of ${socialMate.features.length}: ${activeFeature.title}`}
              </div>

              {isLandscapeMedia ? (
                <LandscapeDeviceFrame
                  aspectRatio={landscapeAspectRatio}
                  glowColor={socialMate.theme.primary}
                >
                  <motion.div
                    style={
                      prefersReducedMotion || isStaticShowcase
                        ? undefined
                        : { x: dragXSpring, rotate: rotateSpring }
                    }
                    className="w-full h-full relative group bg-[#060913]"
                  >
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.div
                        key={hasMultiViewportItems ? `${mediaItem?.id}-${activeIndex}-${activeViewportIndex}` : activeIndex}
                        custom={direction}
                        variants={screenVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 flex items-center justify-center bg-[#060913]"
                      >
                        {mediaItem && (
                          <MediaPreview
                            media={mediaItem}
                            className="w-full h-full"
                            objectFit="contain"
                            eager
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Tap Overlays (only rendered in interactive carousel mode) */}
                    {!isStaticShowcase && (
                      <>
                        <motion.div
                          role="button"
                          aria-label="Previous feature"
                          className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize z-20 select-none"
                          onTap={prevFeatureWithDir}
                        />
                        <motion.div
                          role="button"
                          aria-label="Next feature"
                          className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize z-20 select-none"
                          onTap={nextFeatureWithDir}
                        />
                      </>
                    )}
                  </motion.div>
                </LandscapeDeviceFrame>
              ) : (
                <DeviceFrame variant="cinematic" glowColor={socialMate.theme.primary} notch="island">
                  <motion.div
                    style={
                      prefersReducedMotion || isStaticShowcase
                        ? undefined
                        : { x: dragXSpring, rotate: rotateSpring }
                    }
                    className="w-full h-full relative group"
                  >
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.div
                        key={hasMultiViewportItems ? `${mediaItem?.id}-${activeIndex}-${activeViewportIndex}` : activeIndex}
                        custom={direction}
                        variants={screenVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 flex items-center justify-center bg-surface"
                      >
                        {mediaItem ? (
                          <MediaPreview
                            media={mediaItem}
                            className="w-full h-full"
                            objectFit="cover"
                            eager
                          />
                        ) : (
                          <div className="p-6 text-center flex flex-col items-center justify-center h-full">
                            <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center shadow-lg bg-gradient-to-br from-primary to-accent">
                              <Icon size={28} className="text-white" />
                            </div>
                            <h3 className="font-bold text-lg">{activeFeature.title}</h3>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Tap Overlays (only rendered in interactive carousel mode) */}
                    {!isStaticShowcase && (
                      <>
                        <motion.div
                          role="button"
                          aria-label="Previous feature"
                          className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize z-20 select-none"
                          onTap={prevFeatureWithDir}
                        />
                        <motion.div
                          role="button"
                          aria-label="Next feature"
                          className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize z-20 select-none"
                          onTap={nextFeatureWithDir}
                        />
                      </>
                    )}
                  </motion.div>
                </DeviceFrame>
              )}
            </motion.div>

            {/* Touch swipe hint on mobile/touch devices (hidden on static showcase) */}
            {!hasSwiped && !isStaticShowcase && (
              <div
                aria-hidden="true"
                className="mt-3 hidden [@media(hover:none)]:flex max-md:flex items-center justify-center gap-1.5 text-xs text-text-secondary pointer-events-none transition-opacity duration-300"
              >
                <ChevronsLeftRight size={14} className="text-primary animate-pulse" />
                <span>Swipe to explore</span>
              </div>
            )}

            {/* Viewport tier metadata indicator */}
            {hasMultiViewportItems && rawMediaItem && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 text-xs text-text-secondary">
                <span className="font-semibold text-text">
                  {rawMediaItem.caption}
                </span>
                {rawMediaItem.width && rawMediaItem.height && (
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-variant border border-border font-mono">
                    {rawMediaItem.width} × {rawMediaItem.height}px
                  </span>
                )}
              </div>
            )}

            {/* Pagination Controls & Auto-Advance Progress Fill (hidden on static showcase) */}
            {!isStaticShowcase && totalFeatures > 1 && (
              <div className="flex items-center justify-between w-full max-w-[280px] mt-8 md:mt-12">
                <button
                  type="button"
                  aria-label="Previous feature"
                  onClick={prevFeatureWithDir}
                  className="p-2 rounded-full hover:bg-surface-variant transition-colors text-text-secondary hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ChevronLeft size={24} />
                </button>

                <div className="flex gap-2 items-center">
                  {socialMate.features.map((feature, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <button
                        type="button"
                        key={feature.id}
                        aria-label={`Show feature ${i + 1}: ${feature.title}`}
                        aria-current={isActive}
                        onClick={() => handleDotClick(i)}
                        className={cn(
                          "relative h-2 rounded-full overflow-hidden transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          isActive
                            ? "w-8 bg-surface-variant ring-1 ring-primary/30"
                            : "w-2 bg-border hover:bg-text-secondary"
                        )}
                      >
                        {isActive && isAutoAdvanceActive ? (
                          <div
                            key={`${activeIndex}-${progressKey}`}
                            className="absolute inset-0 bg-primary origin-left"
                            style={{
                              animation: `dot-progress ${AUTO_ADVANCE_DURATION_MS}ms linear forwards`,
                              animationPlayState: isAutoAdvancePaused ? "paused" : "running",
                            }}
                          />
                        ) : isActive ? (
                          <div className="absolute inset-0 bg-primary" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  aria-label="Next feature"
                  onClick={nextFeatureWithDir}
                  className="p-2 rounded-full hover:bg-surface-variant transition-colors text-text-secondary hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Feature Content with HUD Index Counter */}
          <div className="flex flex-col min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-primary/10">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="hud-label text-[11px] text-[var(--project-accent,var(--primary))] font-mono tabular-nums">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(totalFeatures).padStart(2, "0")}
                    </span>
                    <h3 className="type-title font-display font-bold text-text">{activeFeature.title}</h3>
                  </div>
                </div>

                <p className="text-lg text-text-secondary leading-relaxed">
                  {activeFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {!hideCTA && (
              <div className="flex flex-wrap items-center gap-4 mt-10 pt-8 border-t border-border/50">
                <Link
                  href={`/projects/${socialMate.slug}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] hover:shadow-[0_4px_25px_-3px_var(--primary)] transition-all duration-300 active:scale-[0.98]"
                >
                  Explore Full Case Study
                  <ArrowRight size={18} />
                </Link>

                {socialMate.links.github && (
                  <a
                    href={socialMate.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass-panel text-text font-medium hover:border-primary/40 transition-all duration-300"
                  >
                    <FaGithub size={18} />
                    GitHub Repository
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
