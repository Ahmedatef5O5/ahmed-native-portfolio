"use client";

import { motion } from "motion/react";
import type { Project } from "@/data/schemas";

export function ArchitectureSection({ project }: { project: Project }) {
  if (!project.caseStudy?.architecture) return null;

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">Technical Architecture</h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            A high-level overview of how the system is structured to ensure scalability and maintainability.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {project.caseStudy.architecture.map((node, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={node.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Central Node Indicator */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-background z-10 bg-primary" />

                  {/* Content Box */}
                  <div className="w-full md:w-1/2 flex flex-col">
                    <div className={`p-8 rounded-3xl bg-surface/50 backdrop-blur-md border border-border/80 shadow-sm hover:border-primary/30 transition-all duration-300 ${
                      isEven ? "md:ml-12" : "md:mr-12"
                    }`}>
                      <h3 className="text-xl font-bold text-primary mb-3">
                        {node.title}
                      </h3>
                      <p className="text-text-secondary mb-6 leading-relaxed">
                        {node.description}
                      </p>
                      
                      {node.items && node.items.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {node.items.map((item) => (
                            <span key={item} className="px-3 py-1.5 rounded-lg bg-surface-variant text-text-secondary text-sm font-medium border border-border/50">
                              {item}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
