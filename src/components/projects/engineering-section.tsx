"use client";

import React from "react";
import { motion } from "motion/react";
import type { Project } from "@/data/schemas";
import { Lightbulb, Wrench } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { depthIn, staggerContainer, EASE_OUT } from "@/lib/motion";

export function EngineeringSection({ project }: { project: Project }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const hasDecisions = Boolean(project.caseStudy?.decisions && project.caseStudy.decisions.length > 0);
  const hasChallenges = Boolean(project.caseStudy?.challenges && project.caseStudy.challenges.length > 0);

  if (!hasDecisions && !hasChallenges) return null;

  return (
    <section
      id="engineering"
      className="py-24 scroll-mt-24 bg-surface-variant/20 border-y border-border/50 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="mb-16 md:mb-20">
          <span className="hud-label text-[var(--project-accent,var(--primary))] block mb-3">
            04 — ENGINEERING
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-4">
            Engineering Insights
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
            Key architectural tradeoffs, state management paradigms, and hard technical challenges encountered during production development.
          </p>
        </div>

        <div className="space-y-20">
          {/* Decisions Grid */}
          {hasDecisions && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--project-accent,var(--primary))]/10 flex items-center justify-center">
                  <Lightbulb className="text-[var(--project-accent,var(--primary))]" size={22} />
                </div>
                <h3 className="text-2xl font-bold font-display text-text">Key Decisions</h3>
              </div>

              <motion.div
                variants={staggerContainer(0.08, 0.1)}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-60px" }}
                className="grid md:grid-cols-2 gap-6"
              >
                {project.caseStudy!.decisions!.map((decision, i) => (
                  <motion.div
                    key={decision.title}
                    variants={prefersReducedMotion ? undefined : depthIn(i * 0.05)}
                    className="p-8 rounded-3xl bg-surface/60 backdrop-blur-md border border-border/80 shadow-sm flex flex-col h-full hover:border-[var(--project-accent,var(--primary))]/40 transition-all duration-300"
                  >
                    <span className="hud-label text-[10px] text-[var(--project-accent,var(--primary))] mb-3 block">
                      Tradeoff 0{i + 1}
                    </span>
                    <h4 className="text-xl font-bold text-text mb-4 font-display">
                      {decision.title}
                    </h4>
                    <div className="space-y-4 flex-1">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1 block">
                          Context
                        </span>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {decision.context}
                        </p>
                      </div>
                      <div className="pt-2 border-t border-border/40">
                        <span className="text-xs font-bold uppercase tracking-wider text-[var(--project-accent,var(--primary))] mb-1 block">
                          Approach & Outcome
                        </span>
                        <p className="text-sm text-text leading-relaxed font-medium">
                          {decision.approach}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {/* Technical Challenges with Sticky Header on lg */}
          {hasChallenges && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Wrench className="text-accent" size={22} />
                </div>
                <h3 className="text-2xl font-bold font-display text-text">Technical Challenges</h3>
              </div>

              <div className="space-y-8">
                {project.caseStudy!.challenges!.map((challenge, i) => (
                  <motion.div
                    key={challenge.title}
                    initial={{
                      opacity: 0,
                      y: prefersReducedMotion ? 0 : 24,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.08 }}
                    className="p-8 rounded-3xl bg-surface/60 backdrop-blur-md border border-border/80 border-l-4 border-l-[var(--project-accent,var(--primary))] shadow-sm"
                  >
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                      {/* Sticky Title Block on lg */}
                      <div className="lg:col-span-4 lg:sticky lg:top-28">
                        <span className="hud-label text-[10px] text-[var(--project-accent,var(--primary))] mb-2 block">
                          Challenge 0{i + 1}
                        </span>
                        <h4 className="text-xl font-bold text-text font-display leading-snug">
                          {challenge.title}
                        </h4>
                      </div>

                      {/* Solution Block */}
                      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
                        <div className="p-5 rounded-2xl bg-surface-variant/40 border border-border/40">
                          <span className="hud-label text-[10px] block mb-2">
                            The Challenge
                          </span>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {challenge.context}
                          </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-surface-variant/40 border border-border/40">
                          <span className="hud-label text-[10px] text-[var(--project-accent,var(--primary))] block mb-2">
                            The Engineering Solution
                          </span>
                          <p className="text-sm text-text leading-relaxed font-medium">
                            {challenge.approach}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
