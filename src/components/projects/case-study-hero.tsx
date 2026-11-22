"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import type { Project } from "@/data/schemas";
import { Download, ChevronDown } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { DeviceFrame } from "@/components/ui/device-frame";
import { MediaPreview } from "@/components/ui/media-preview";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EASE_OUT, maskReveal, staggerContainer } from "@/lib/motion";

export function CaseStudyHero({ project }: { project: Project }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Device scroll-linked transforms (disabled on reduced motion)
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const deviceScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const deviceRotateX = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const deviceGlowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  // Text block parallax
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  // Scroll cue fade out
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const titleWords = project.title.split(" ");

  return (
    <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden bg-background">
      {/* Subtle HUD background grid */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid pointer-events-none opacity-40" />

      {/* Dynamic Background Glow with Project Accent */}
      <motion.div
        aria-hidden="true"
        style={{
          opacity: prefersReducedMotion ? 0.25 : deviceGlowOpacity,
          background: `radial-gradient(circle at center, var(--project-accent, ${project.theme.primary}), transparent 70%)`,
        }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[640px] blur-[120px] pointer-events-none rounded-full"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 flex flex-col items-center text-center">
        {/* Parallax-wrapped Header & Text */}
        <motion.div
          style={{
            y: prefersReducedMotion ? 0 : textY,
            opacity: prefersReducedMotion ? 1 : textOpacity,
          }}
          className="flex flex-col items-center w-full"
        >
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-variant border border-border mb-8 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full animate-pulse bg-[var(--project-accent,var(--primary))]" />
            <span className="hud-label text-text-secondary">
              Case Study
            </span>
          </motion.div>

          {/* Icon + Title with Word-by-Word Mask Reveal */}
          <div className="flex items-center justify-center gap-4 md:gap-5 mb-6">
            {project.icon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
                className={`relative w-12 h-12 md:w-16 md:h-16 rounded-2xl overflow-hidden shadow-lg shadow-black/20 border border-border/80 flex-shrink-0 ${project.slug === "social-mate" ? "bg-white" : "bg-[#060913]"}`}
              >
                <Image
                  src={project.icon}
                  alt={`${project.title} App Icon`}
                  fill
                  sizes="64px"
                  priority
                  className={project.slug === "newswave" ? "object-cover scale-[1.05] bg-[#1763cf]" : "object-cover"}
                />
              </motion.div>
            )}

            <motion.h1
              variants={staggerContainer(0.06, 0.05)}
              initial="initial"
              animate="animate"
              className="text-5xl md:text-7xl font-display font-bold text-text flex flex-wrap justify-center"
            >
              {titleWords.map((word, idx) => (
                <span key={`${word}-${idx}`} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                  <motion.span variants={maskReveal} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed mb-10"
          >
            {project.positioning}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
            className="flex flex-wrap justify-center items-center gap-4 mb-16"
          >
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--project-accent,var(--primary))] hover:opacity-90 text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] hover:shadow-[0_4px_25px_-3px_var(--primary)] transition-all duration-300 active:scale-[0.98]"
              >
                Explore Product
              </a>
            )}

            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface text-text font-medium border border-border hover:bg-surface-variant transition-colors"
              >
                <FaGithub size={18} />
                Source Code
              </a>
            )}

            {project.downloads && (
              <a
                href="#downloads"
                onClick={(e) => {
                  const target =
                    document.getElementById("download-cards") || document.getElementById("downloads");
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.replaceState(null, "", "#downloads");
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface text-text font-medium border border-border hover:bg-surface-variant transition-colors"
              >
                <Download size={18} />
                Download APK
              </a>
            )}
          </motion.div>
        </motion.div>

        {/* Large Device Showcase with Perspective Tilt on Scroll (No haze scrim, no preserve-3d) */}
        <div style={{ perspective: 1200 }} className="w-full max-w-4xl relative">
          <motion.div
            style={{
              y: prefersReducedMotion ? 0 : deviceY,
              scale: prefersReducedMotion ? 1 : deviceScale,
              rotateX: prefersReducedMotion ? 0 : deviceRotateX,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.4 }}
            className="w-full relative"
          >
            <DeviceFrame
              glowColor={project.theme.primary}
              className="w-full max-w-[340px] h-[720px] mx-auto z-10 relative"
            >
              <MediaPreview media={project.media.hero} className="w-full h-full" priority />
            </DeviceFrame>
          </motion.div>
        </div>

        {/* Animated Scroll Cue */}
        <motion.div
          style={{ opacity: prefersReducedMotion ? 0 : scrollCueOpacity }}
          className="mt-8 flex flex-col items-center gap-1.5 pointer-events-none"
          aria-hidden="true"
        >
          <span className="hud-label text-[10px] tracking-widest text-text-secondary/70">Scroll</span>
          <ChevronDown size={16} className="text-text-secondary animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
