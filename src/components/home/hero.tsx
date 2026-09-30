"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

// Standard animation durations for consistency
const ANIM_DURATIONS = {
  micro: 0.2,
  ui: 0.4,
  reveal: 0.8, // Slightly slower for premium feel
};

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12 bg-background">
      {/* Deep Navy Atmospheric Light Fields */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--primary-deep)_0,transparent_60%)] opacity-[0.12] pointer-events-none rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,var(--primary)_0,transparent_60%)] opacity-[0.14] pointer-events-none rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

        {/* Content */}
        <div className="flex flex-col items-start text-left z-20">
          {/* Availability Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIM_DURATIONS.ui, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full glass-panel mb-8"
          >
            <span className="relative flex h-2 w-2">
              {!prefersReducedMotion && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            <span className="text-xs font-semibold text-text-secondary tracking-wide uppercase">
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIM_DURATIONS.reveal, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="type-display font-display text-text mb-6"
          >
            Hi, I&apos;m <span className="text-primary">Ahmed Atef.</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIM_DURATIONS.reveal, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="type-title font-medium text-text-secondary mb-8 max-w-xl"
          >
            Flutter Developer & Mobile Engineer.
            <br />
            Building production-grade digital products.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIM_DURATIONS.reveal, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-lg text-text-secondary mb-10 max-w-xl leading-relaxed"
          >
            I specialize in Feature-First Clean Architecture, crafting scalable, high-performance applications with beautiful user experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIM_DURATIONS.reveal, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] hover:shadow-[0_4px_25px_-3px_var(--primary)] transition-all duration-300 active:scale-[0.98]"
            >
              Explore My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

            <Link
              href="/projects/social-mate"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl glass-panel text-text font-medium hover:border-primary/40 transition-all duration-300"
            >
              <Code2 size={18} className="text-text-secondary group-hover:text-primary transition-colors" />
              View Social Mate
            </Link>
          </motion.div>
        </div>

        {/* Visual / Composition */}
        <div className="relative w-[320px] sm:w-[380px] lg:w-[440px] h-[320px] sm:h-[360px] lg:h-[400px] mx-auto lg:ml-auto flex items-center justify-center mt-10 lg:mt-0 select-none">

          {/* Base Atmospheric Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-deep/10 to-accent/5 blur-[70px] rounded-full pointer-events-none" />

          {/* Abstract Architecture Card (Background layer) */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotateX: 8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ perspective: "1000px" }}
            className="absolute bottom-0 right-0 w-[250px] sm:w-[290px] lg:w-[330px] h-[180px] sm:h-[210px] lg:h-[240px] rounded-[1.75rem] lg:rounded-[2rem] glass-panel flex flex-col justify-end p-5 sm:p-6 overflow-hidden z-10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />

            <div className="flex flex-col gap-2.5 sm:gap-3 w-full relative z-10 opacity-70">
              <div className="h-3.5 sm:h-4 w-full bg-border/40 rounded-full overflow-hidden relative">
                <motion.div className="absolute inset-y-0 left-0 bg-primary/40" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.9 }} />
              </div>
              <div className="h-3.5 sm:h-4 w-2/3 bg-border/40 rounded-full overflow-hidden relative">
                <motion.div className="absolute inset-y-0 left-0 bg-primary-light/40" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 1.1 }} />
              </div>
            </div>

            <div className="absolute top-4 sm:top-5 right-4 sm:right-5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-background/60 backdrop-blur-md border border-white/5 shadow-sm">
              <span className="text-[9px] sm:text-[10px] font-mono font-medium text-text-secondary tracking-wider uppercase">
                Clean_Arch
              </span>
            </div>
          </motion.div>

          {/* Portrait & Orbits (Foreground layer) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="absolute top-0 left-0 sm:left-2 lg:left-4 z-20 flex items-center justify-center w-[210px] sm:w-[240px] lg:w-[270px] h-[210px] sm:h-[240px] lg:h-[270px]"
          >
            {/* Outer Orbit */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[210px] h-[210px] sm:w-[240px] sm:h-[240px] lg:w-[270px] lg:h-[270px] rounded-full border border-border/40"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/40 shadow-[0_0_10px_var(--primary)]" />
            </motion.div>

            {/* Inner Orbit */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[165px] h-[165px] sm:w-[190px] sm:h-[190px] lg:w-[215px] lg:h-[215px] rounded-full border border-primary/20"
            >
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-accent/60 shadow-[0_0_8px_var(--accent)]" />
            </motion.div>

            {/* Portrait Container */}
            {/* Portrait Container */}
            {/* Portrait Container */}
            <div className="relative w-[120px] h-[120px] sm:w-[135px] sm:h-[135px] lg:w-[155px] lg:h-[155px] rounded-full p-[2px] bg-white/[0.03] border border-white/10 shadow-2xl overflow-hidden group backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                <Image
                  src="/assets/profile/profile.webp"
                  alt="Ahmed Atef Portrait"
                  width={155}
                  height={155}
                  priority
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
