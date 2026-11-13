"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ScrollProgress() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.3,
  });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        transformOrigin: "left",
        backgroundColor: "var(--project-accent, var(--primary))",
      }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none shadow-[0_0_10px_var(--project-accent,var(--primary))]"
    />
  );
}
