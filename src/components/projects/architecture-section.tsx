"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "motion/react";
import type { Project, ArchitectureNode } from "@/data/schemas";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EASE_OUT, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ArchitectureNodeItem({
  node,
  index,
  total,
  prefersReducedMotion,
}: {
  node: ArchitectureNode;
  index: number;
  total: number;
  prefersReducedMotion: boolean;
}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, {
    margin: "-15% 0px -25% 0px",
    once: false,
  });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={nodeRef}
      className={cn(
        "relative flex flex-col md:flex-row items-center gap-6 md:gap-8 pb-12 last:pb-0",
        isEven ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Central Node Dot (Desktop) */}
      <div
        aria-hidden="true"
        className={cn(
          "hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-20 items-center justify-center transition-all duration-500",
          isInView ? "w-6 h-6" : "w-4 h-4"
        )}
      >
        <span
          className={cn(
            "rounded-full transition-all duration-500 border-2 border-background",
            isInView
              ? "w-4 h-4 bg-[var(--project-accent,var(--primary))] shadow-[0_0_12px_var(--project-accent,var(--primary))]"
              : "w-3 h-3 bg-border"
          )}
        />
        {isInView && (
          <span className="absolute inset-0 rounded-full border border-[var(--project-accent,var(--primary))] opacity-75 animate-ping" />
        )}
      </div>

      {/* Left Node Dot (Mobile) */}
      <div
        aria-hidden="true"
        className={cn(
          "md:hidden absolute left-4 top-8 -translate-x-1/2 z-20 flex items-center justify-center transition-all duration-500",
          isInView ? "w-5 h-5" : "w-3.5 h-3.5"
        )}
      >
        <span
          className={cn(
            "rounded-full transition-all duration-500 border-2 border-background",
            isInView
              ? "w-3.5 h-3.5 bg-[var(--project-accent,var(--primary))] shadow-[0_0_10px_var(--project-accent,var(--primary))]"
              : "w-2.5 h-2.5 bg-border"
          )}
        />
      </div>

      {/* Content Box */}
      <motion.div
        initial={{
          opacity: 0,
          x: prefersReducedMotion ? 0 : isEven ? 48 : -48,
          filter: prefersReducedMotion ? "none" : "blur(6px)",
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
        }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: index * 0.08 }}
        className={cn(
          "w-full md:w-1/2 flex flex-col pl-10 md:pl-0",
          isEven ? "md:ml-10" : "md:mr-10"
        )}
      >
        <div
          className={cn(
            "p-6 md:p-8 rounded-3xl bg-surface/60 backdrop-blur-md border border-border/80 shadow-sm transition-all duration-300",
            isInView
              ? "border-[var(--project-accent,var(--primary))]/50 shadow-md shadow-primary/5"
              : "hover:border-primary/30"
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="hud-label text-[10px] text-[var(--project-accent,var(--primary))]">
              Step 0{index + 1} of 0{total}
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold font-display text-text mb-3">
            {node.title}
          </h3>
          <p className="text-text-secondary mb-6 leading-relaxed text-sm md:text-base">
            {node.description}
          </p>

          {node.items && node.items.length > 0 && (
            <motion.div
              variants={staggerContainer(0.04, 0.1)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 pt-2 border-t border-border/40"
            >
              {node.items.map((item) => (
                <motion.span
                  key={item}
                  variants={{
                    initial: { opacity: 0, scale: 0.9 },
                    animate: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.3, ease: EASE_OUT },
                    },
                  }}
                  className="px-3 py-1.5 rounded-lg bg-surface-variant text-text-secondary text-xs font-medium border border-border/50"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Spacer for 2-column alternating layout */}
      <div className="hidden md:block w-1/2" />
    </div>
  );
}

interface ArchitectureContentProps {
  nodes: ArchitectureNode[];
  prefersReducedMotion: boolean;
}

function ArchitectureContent({ nodes, prefersReducedMotion }: ArchitectureContentProps) {
  const listRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 40%"],
  });

  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.2,
  });

  return (
    <section
      id="architecture"
      className="py-24 scroll-mt-24 relative overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
          <span className="hud-label text-[var(--project-accent,var(--primary))] block mb-3">
            03 — ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-4">
            Technical Architecture
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            A high-level overview of how the system is structured to ensure scalability, fault tolerance, and low-latency throughput.
          </p>
        </div>

        <div ref={listRef} className="relative">
          {/* Desktop Center Connector Line */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-border/60 -translate-x-1/2"
          >
            <motion.div
              style={{
                scaleY: prefersReducedMotion ? 1 : lineProgress,
                transformOrigin: "top",
                backgroundColor: "var(--project-accent, var(--primary))",
              }}
              className="absolute inset-x-0 top-0 h-full shadow-[0_0_10px_var(--project-accent,var(--primary))]"
            >
              {/* Soft Glowing Head on the Connector Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--project-accent,var(--primary))] blur-[2px]" />
            </motion.div>
          </div>

          {/* Mobile Left Connector Line */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-4 top-8 bottom-8 w-[2px] bg-border/60 -translate-x-1/2"
          >
            <motion.div
              style={{
                scaleY: prefersReducedMotion ? 1 : lineProgress,
                transformOrigin: "top",
                backgroundColor: "var(--project-accent, var(--primary))",
              }}
              className="absolute inset-x-0 top-0 h-full shadow-[0_0_8px_var(--project-accent,var(--primary))]"
            />
          </div>

          <div className="space-y-4">
            {nodes.map((node, i) => (
              <ArchitectureNodeItem
                key={node.title}
                node={node}
                index={i}
                total={nodes.length}
                prefersReducedMotion={prefersReducedMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ArchitectureSection({ project }: { project: Project }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!project.caseStudy?.architecture || project.caseStudy.architecture.length === 0) {
    return null;
  }

  return (
    <ArchitectureContent
      nodes={project.caseStudy.architecture}
      prefersReducedMotion={prefersReducedMotion}
    />
  );
}
