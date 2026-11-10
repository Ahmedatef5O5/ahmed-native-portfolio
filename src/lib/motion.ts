import type { Variants, Transition } from "motion/react";

export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  micro: 0.2,
  ui: 0.45,
  reveal: 0.9,
  cinematic: 1.2,
} as const;

export const defaultTransition: Transition = {
  duration: DURATION.ui,
  ease: EASE_OUT,
};

export function fadeUp(delay = 0, y = 24): Variants {
  return {
    initial: {
      opacity: 0,
      y,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.ui,
        delay,
        ease: EASE_OUT,
      },
    },
  };
}

export const maskReveal: Variants = {
  initial: {
    y: "110%",
  },
  animate: {
    y: 0,
    transition: {
      duration: DURATION.reveal,
      ease: EASE_OUT,
    },
  },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0): Variants {
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

export function depthIn(delay = 0): Variants {
  return {
    initial: {
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: DURATION.reveal,
        delay,
        ease: EASE_OUT,
      },
    },
  };
}
