"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects } from "@/data/projects";
import { DeviceFrame } from "@/components/ui/device-frame";
import { MediaPreview } from "@/components/ui/media-preview";
import { Reveal } from "@/components/ui/reveal";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SocialMateShowcase({
  hideCTA = false,
  projectSlug = "social-mate",
}: {
  hideCTA?: boolean;
  projectSlug?: string;
} = {}) {
  const socialMate = projects.find((p) => p.slug === projectSlug);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeViewportIndex, setActiveViewportIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!socialMate) return null;

  const nextFeature = () => {
    setActiveIndex((prev) => (prev + 1) % socialMate.features.length);
  };

  const prevFeature = () => {
    setActiveIndex((prev) => (prev - 1 + socialMate.features.length) % socialMate.features.length);
  };

  const activeFeature = socialMate.features[activeIndex];
  const Icon = Icons[activeFeature.icon as keyof typeof Icons] as React.ElementType || Icons.Circle;

  // Resolve media item
  const allGalleryItems = socialMate.media.gallery?.flatMap((g) => g.items) || [];
  const featureViewportItems = allGalleryItems.filter(
    (item) =>
      item.featureId === activeFeature.id &&
      typeof item.width === "number" &&
      typeof item.height === "number"
  );
  const hasMultiViewportItems =
    activeFeature.id === "adaptive-responsive-dashboard" &&
    featureViewportItems.length > 1;

  // Deterministic feature-specific resolution:
  // 1. featureId + role === "demo"
  // 2. featureId + role === "storytelling"
  // 3. featureId only
  const featureMedia =
    allGalleryItems.find((item) => item.featureId === activeFeature.id && item.role === "demo") ||
    allGalleryItems.find((item) => item.featureId === activeFeature.id && item.role === "storytelling") ||
    allGalleryItems.find((item) => item.featureId === activeFeature.id);

  // Legacy fallback if no feature-specific media is bound:
  // 4. Category match -> storytelling/demo -> first item
  // 5. Existing fallback UI handled below if mediaItem is undefined
  const legacyFallback = () => {
    const matchedCategory = socialMate.media.gallery?.find(
      (g) =>
        activeFeature.title.toLowerCase().includes(g.category.toLowerCase()) ||
        g.category.toLowerCase().includes(activeFeature.title.toLowerCase())
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
  };

  const rawMediaItem = hasMultiViewportItems
    ? featureViewportItems[activeViewportIndex % featureViewportItems.length]
    : featureMedia || legacyFallback();

  const isLandscapeMedia = Boolean(
    rawMediaItem?.width && rawMediaItem?.height && rawMediaItem.width > rawMediaItem.height
  );

  // Use the bezel-free screen crop when rendering FinDash mobile viewport inside portrait DeviceFrame
  const mediaItem =
    rawMediaItem && !isLandscapeMedia && socialMate.slug === "fin-dash"
      ? { ...rawMediaItem, url: socialMate.media.hero.url }
      : rawMediaItem;

  const screenTransition = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, scale: 1.04, filter: "blur(8px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
        transition: { duration: 0.6, ease: EASE_OUT },
      };

  const textTransition = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }
    : {
        initial: { opacity: 0, y: 16, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        exit: { opacity: 0, y: -16, filter: "blur(6px)" },
        transition: { duration: 0.45, ease: EASE_OUT },
      };

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">

        <Reveal className="text-center mb-16 md:mb-20">
          <span className="type-eyebrow text-primary mb-3 block">
            {hideCTA ? "Interactive Feature Showcase" : "Featured Project"}
          </span>
          <h2 className="type-headline font-display text-text mb-6">
            {socialMate.title}
          </h2>
          <p className="type-lead text-text-secondary max-w-2xl mx-auto">
            {socialMate.positioning}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left Column: Cinematic Device */}
          <Reveal className="flex flex-col items-center justify-center w-full" delay={0.15} y={48} duration={1}>
            {hasMultiViewportItems && (
              <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface-variant/80 border border-border mb-6">
                {featureViewportItems.map((item, idx) => {
                  const shortLabel = item.caption?.split("—")[0]?.trim() || `Layout ${idx + 1}`;
                  const isSelected = idx === activeViewportIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveViewportIndex(idx)}
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

            <div className="w-full flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1">
              {isLandscapeMedia ? (
                <DeviceFrame
                  type="ipad"
                  glowColor={socialMate.theme.primary}
                  className="w-[calc(100vw-2.5rem)] sm:w-[480px] lg:w-[420px] xl:w-[490px] max-w-full h-auto aspect-[16/10] rounded-[1.75rem]"
                >
                  <div className="w-full h-full relative group bg-[#f7f9fa]">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={mediaItem?.id ?? activeIndex}
                        initial={screenTransition.initial}
                        animate={screenTransition.animate}
                        exit={screenTransition.exit}
                        transition={screenTransition.transition}
                        className="absolute inset-0 flex items-center justify-center bg-[#f7f9fa]"
                      >
                        {mediaItem && (
                          <MediaPreview media={mediaItem} className="w-full h-full" objectFit="contain" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </DeviceFrame>
              ) : (
                <DeviceFrame variant="cinematic" glowColor={socialMate.theme.primary}>
                  <div className="w-full h-full relative group">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={hasMultiViewportItems ? mediaItem?.id : activeIndex}
                        initial={screenTransition.initial}
                        animate={screenTransition.animate}
                        exit={screenTransition.exit}
                        transition={screenTransition.transition}
                        className="absolute inset-0 flex items-center justify-center bg-surface"
                      >
                        {mediaItem ? (
                          <MediaPreview media={mediaItem} className="w-full h-full" objectFit="cover" />
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

                    {/* Overlay Navigation Areas */}
                    <div
                      className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize z-20"
                      onClick={prevFeature}
                    />
                    <div
                      className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize z-20"
                      onClick={nextFeature}
                    />
                  </div>
                </DeviceFrame>
              )}
            </div>

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

            {/* Pagination Controls */}
            <div className="flex items-center justify-between w-full max-w-[280px] mt-14">
              <button
                type="button"
                aria-label="Previous feature"
                onClick={prevFeature}
                className="p-2 rounded-full hover:bg-surface-variant transition-colors text-text-secondary hover:text-primary"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex gap-2">
                {socialMate.features.map((feature, i) => (
                  <button
                    type="button"
                    key={feature.id}
                    aria-label={`Show feature ${i + 1}: ${feature.title}`}
                    aria-current={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      i === activeIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-text-secondary"
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label="Next feature"
                onClick={nextFeature}
                className="p-2 rounded-full hover:bg-surface-variant transition-colors text-text-secondary hover:text-primary"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </Reveal>

          {/* Right Column: Feature Text */}
          <Reveal className="flex flex-col min-h-[300px]" delay={0.3}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={textTransition.initial}
                animate={textTransition.animate}
                exit={textTransition.exit}
                transition={textTransition.transition}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-primary/10">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="type-title font-display font-bold text-text">{activeFeature.title}</h3>
                </div>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {activeFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {!hideCTA && (
              <div className="flex flex-wrap items-center gap-4 mt-12 pt-8 border-t border-border/50">
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
          </Reveal>

        </div>
      </div>
    </section>
  );
}
