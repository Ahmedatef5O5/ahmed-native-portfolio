"use client";

import { motion } from "motion/react";
import type { Project } from "@/data/schemas";
import { cn } from "@/lib/utils";

export function CaseStudyOverview({ project }: { project: Project }) {
  if (!project.caseStudy?.overview) return null;

  return (
    <section className="py-24 bg-surface-variant/30 border-y border-border/50">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl font-display font-bold text-text">Overview</h2>
          <div className="space-y-6 text-lg md:text-xl text-text-secondary leading-relaxed font-serif">
            {project.caseStudy.overview.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div>
              <span className="block text-sm font-medium text-text-secondary mb-2">Role</span>
              <span className="font-semibold text-text">Lead Developer</span>
            </div>
            <div>
              <span className="block text-sm font-medium text-text-secondary mb-2">Platform</span>
              <span className="font-semibold text-text">iOS & Android</span>
            </div>
            <div className="col-span-2">
              <span className="block text-sm font-medium text-text-secondary mb-2">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-surface rounded-md border border-border text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
