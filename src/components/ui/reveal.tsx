"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion";

type AllowedTag = "div" | "section" | "article" | "header" | "aside" | "nav";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts once the element is in view. */
  delay?: number;
  /** Initial vertical offset in px. Default is 24. */
  y?: number;
  /** Optional initial horizontal offset in px. Default is 0. */
  x?: number;
  /** Reveal duration in seconds. Default is 0.8. */
  duration?: number;
  /** Whether to apply an initial blur. Default is false. */
  blur?: boolean;
  /** Whether to animate only once. Default is true. */
  once?: boolean;
  /** HTML container element to render. Default is "div". */
  as?: AllowedTag;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.8,
  blur = false,
  once = true,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const MotionComponent =
    as === "section"
      ? motion.section
      : as === "article"
      ? motion.article
      : as === "header"
      ? motion.header
      : as === "aside"
      ? motion.aside
      : as === "nav"
      ? motion.nav
      : motion.div;

  return (
    <MotionComponent
      className={className}
      initial={{
        opacity: 0,
        y: prefersReducedMotion ? 0 : y,
        x: prefersReducedMotion ? 0 : x,
        filter: !prefersReducedMotion && blur ? "blur(6px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: EASE_OUT,
      }}
    >
      {children}
    </MotionComponent>
  );
}
