"use client";

import React from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/schemas";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { maskReveal, depthIn, staggerContainer, EASE_OUT } from "@/lib/motion";

export function CaseStudyOverview({ project }: { project: Project }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!project.caseStudy?.overview) return null;

  return (
    <section
      id="overview"
      className="py-24 scroll-mt-24 bg-surface-variant/30 border-y border-border/50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center space-y-8">
          {/* HUD Label & Headline with Mask Reveal */}
          <div className="space-y-3">
            <span className="hud-label text-[var(--project-accent,var(--primary))] block">
              01 — OVERVIEW
            </span>
            <div className="overflow-hidden">
              <motion.h2
                variants={prefersReducedMotion ? undefined : maskReveal}
                initial={prefersReducedMotion ? undefined : "initial"}
                whileInView={prefersReducedMotion ? undefined : "animate"}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-display font-bold text-text"
              >
                Project Overview & Scope
              </motion.h2>
            </div>
          </div>

          {/* Paragraphs with Stagger */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed font-serif"
          >
            {project.caseStudy.overview.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={{
                  initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: EASE_OUT },
                  },
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Role / Platform / Tech Stack Centered Flex Layout (Hugs Content, No Unwanted Height Stretching) */}
          <motion.div
            variants={staggerContainer(0.08, 0.2)}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
            className="pt-12 flex flex-col items-center gap-4 text-left border-t border-border/50"
          >
            {/* Row 1: Role & Platform cards hugging content side-by-side on sm+ */}
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <motion.div
                variants={prefersReducedMotion ? undefined : depthIn(0)}
                className="w-full sm:w-fit px-6 py-4 rounded-2xl bg-surface/60 border border-border/60 shadow-sm"
              >
                <span className="hud-label text-[10px] block mb-1">Role</span>
                <span className="font-semibold text-text text-base whitespace-nowrap">
                  Lead Developer
                </span>
              </motion.div>

              <motion.div
                variants={prefersReducedMotion ? undefined : depthIn(0.05)}
                className="w-full sm:w-fit px-6 py-4 rounded-2xl bg-surface/60 border border-border/60 shadow-sm"
              >
                <span className="hud-label text-[10px] block mb-1">Platform</span>
                <span className="font-semibold text-text text-base whitespace-nowrap">
                  {project.slug === "fin-dash" ? "Desktop, Tablet & Mobile" : "iOS & Android"}
                </span>
              </motion.div>
            </div>

            {/* Row 2: Tech Stack Card hugging content up to max-w-3xl with wrapping chips */}
            <motion.div
              variants={prefersReducedMotion ? undefined : depthIn(0.1)}
              className="w-full max-w-3xl p-6 rounded-2xl bg-surface/60 border border-border/60 shadow-sm"
            >
              <span className="hud-label text-[10px] block mb-3 text-center sm:text-left">Tech Stack</span>
              <motion.div
                variants={staggerContainer(0.04, 0.1)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-wrap justify-center sm:justify-start gap-2"
              >
                {project.techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={{
                      initial: { opacity: 0, scale: 0.9 },
                      animate: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.3, ease: EASE_OUT },
                      },
                    }}
                    className="px-3 py-1 bg-surface rounded-md border border-border text-xs font-medium text-text hover:border-[var(--project-accent,var(--primary))] transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
