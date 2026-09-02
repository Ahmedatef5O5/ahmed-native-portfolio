"use client";

import { motion } from "motion/react";
import type { Project } from "@/data/schemas";
import { Lightbulb, Wrench } from "lucide-react";

export function EngineeringSection({ project }: { project: Project }) {
  const hasDecisions = project.caseStudy?.decisions && project.caseStudy.decisions.length > 0;
  const hasChallenges = project.caseStudy?.challenges && project.caseStudy.challenges.length > 0;

  if (!hasDecisions && !hasChallenges) return null;

  return (
    <section className="py-24 bg-surface-variant/20 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">Engineering Insights</h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            Key technical decisions and challenges encountered during the development process.
          </p>
        </div>

        <div className="space-y-16">
          {/* Decisions */}
          {hasDecisions && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Lightbulb className="text-primary" size={24} />
                <h3 className="text-2xl font-bold text-text">Key Decisions</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {project.caseStudy!.decisions!.map((decision, i) => (
                  <motion.div
                    key={decision.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-8 rounded-3xl bg-surface/50 backdrop-blur-md border border-border/80 shadow-sm flex flex-col h-full hover:border-primary/30 transition-colors"
                  >
                    <h4 className="text-xl font-bold text-text mb-4">{decision.title}</h4>
                    <div className="space-y-4 flex-1">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1 block">Context</span>
                        <p className="text-sm text-text-secondary leading-relaxed">{decision.context}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">Approach</span>
                        <p className="text-sm text-text leading-relaxed font-medium">{decision.approach}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges */}
          {hasChallenges && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Wrench className="text-accent" size={24} />
                <h3 className="text-2xl font-bold text-text">Technical Challenges</h3>
              </div>
              <div className="space-y-6">
                {project.caseStudy!.challenges!.map((challenge, i) => (
                  <motion.div
                    key={challenge.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-8 rounded-3xl bg-surface/50 backdrop-blur-md border border-border/80 border-l-4 border-l-primary shadow-sm"
                  >
                    <h4 className="text-xl font-bold text-text mb-4">{challenge.title}</h4>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1 block">The Challenge</span>
                        <p className="text-sm text-text-secondary leading-relaxed">{challenge.context}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1 block">The Solution</span>
                        <p className="text-sm text-text leading-relaxed">{challenge.approach}</p>
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
