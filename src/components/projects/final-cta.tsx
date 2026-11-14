"use client";

import React from "react";
import type { Project } from "@/data/schemas";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { projects } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { maskReveal, EASE_OUT } from "@/lib/motion";

export function FinalCTA({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : null;
  const prefersReducedMotion = usePrefersReducedMotion();

  const nextProjectImage = nextProject?.media.cover?.url || nextProject?.media.hero.url;

  return (
    <section className="py-24 border-t border-border/50 relative overflow-hidden bg-background">
      {/* Background Grid Pattern */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid pointer-events-none opacity-30" />

      {/* Dynamic Project Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] opacity-15 blur-[120px] pointer-events-none rounded-full"
        style={{ background: "var(--project-accent, var(--primary))" }}
      />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
        {/* Large Headline with Mask Reveal */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            variants={prefersReducedMotion ? undefined : maskReveal}
            initial={prefersReducedMotion ? undefined : "initial"}
            whileInView={prefersReducedMotion ? undefined : "animate"}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold text-text"
          >
            Ready to dive deeper?
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
          className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Explore the open-source architecture or see how these performance principles translate across other production case studies.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--project-accent,var(--primary))] hover:opacity-90 text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] transition-all duration-300 active:scale-[0.98]"
            >
              <FaGithub size={18} />
              View on GitHub
            </a>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface/60 backdrop-blur-md text-text font-medium border border-border/80 hover:bg-surface hover:border-[var(--project-accent,var(--primary))]/40 transition-all duration-300 shadow-sm"
          >
            Back to Portfolio
          </Link>
        </div>

        {/* Up Next Project Teaser with Hover Image Cross-Fade */}
        {nextProject && (
          <div className="max-w-xl mx-auto text-left">
            <span className="hud-label text-xs block mb-3 text-center">
              Next Case Study
            </span>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group block relative rounded-3xl overflow-hidden border border-border/80 bg-surface/50 backdrop-blur-md hover:border-[var(--project-accent,var(--primary))]/50 transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              {/* Background Cover Image cross-faded on hover */}
              {nextProjectImage && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-35 group-focus-visible:opacity-35 transition-opacity duration-700 ease-out"
                >
                  <Image
                    src={nextProjectImage}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
                </div>
              )}

              {/* Card Foreground Content */}
              <div className="relative z-10 p-6 md:p-8 flex items-center justify-between gap-6">
                <div className="space-y-1.5 flex-1">
                  <span className="hud-label text-[10px] text-[var(--project-accent,var(--primary))]">
                    Up Next · {nextProject.techStack.slice(0, 2).join(" / ")}
                  </span>
                  <h4 className="text-2xl font-bold font-display text-text group-hover:text-[var(--project-accent,var(--primary))] transition-colors duration-300">
                    {nextProject.title}
                  </h4>
                  <p className="text-xs md:text-sm text-text-secondary line-clamp-1">
                    {nextProject.positioning}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 bg-surface-variant group-hover:bg-[var(--project-accent,var(--primary))] group-hover:text-white transition-all duration-300 shadow-sm">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
