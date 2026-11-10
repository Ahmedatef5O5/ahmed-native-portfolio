"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, animate, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type MotionPanInfo = Parameters<
  NonNullable<React.ComponentProps<typeof motion.div>["onPan"]>
>[1];

export interface UseSwipeNavigationOptions {
  onNext: () => void;
  onPrev: () => void;
  disabled?: boolean;
  thresholdPx?: number;
  velocity?: number;
  onSwipeSuccess?: () => void;
}

export interface UseSwipeNavigationReturn {
  gestureProps: {
    onPan: (event: PointerEvent, info: MotionPanInfo) => void;
    onPanEnd: (event: PointerEvent, info: MotionPanInfo) => void;
  };
  dragX: MotionValue<number>;
  direction: number;
  setDirection: (dir: number) => void;
}

export function useSwipeNavigation({
  onNext,
  onPrev,
  disabled = false,
  thresholdPx = 56,
  velocity = 450,
  onSwipeSuccess,
}: UseSwipeNavigationOptions): UseSwipeNavigationReturn {
  const [direction, setDirection] = useState<number>(1);
  const dragX = useMotionValue<number>(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const isPanningRef = useRef(false);
  const onNextRef = useRef(onNext);
  const onPrevRef = useRef(onPrev);
  const onSwipeSuccessRef = useRef(onSwipeSuccess);

  useEffect(() => {
    onNextRef.current = onNext;
    onPrevRef.current = onPrev;
    onSwipeSuccessRef.current = onSwipeSuccess;
  }, [onNext, onPrev, onSwipeSuccess]);

  const handlePan = useCallback(
    (_event: PointerEvent, info: MotionPanInfo) => {
      if (disabled) return;

      const absX = Math.abs(info.offset.x);
      const absY = Math.abs(info.offset.y);

      // Lock to horizontal if horizontal distance exceeds vertical
      if (!isPanningRef.current && absX > absY && absX > 6) {
        isPanningRef.current = true;
      }

      if (isPanningRef.current && !prefersReducedMotion) {
        // Damped visual follow: ~0.35x offset clamped to +/-40px
        const damped = Math.min(Math.max(info.offset.x * 0.35, -40), 40);
        dragX.set(damped);
      }
    },
    [disabled, dragX, prefersReducedMotion]
  );

  const handlePanEnd = useCallback(
    (_event: PointerEvent, info: MotionPanInfo) => {
      if (disabled) return;

      const wasHorizontal = isPanningRef.current || Math.abs(info.offset.x) > Math.abs(info.offset.y);
      isPanningRef.current = false;

      // Spring back visual follow value to 0
      if (!prefersReducedMotion && typeof window !== "undefined") {
        animate(dragX, 0, { type: "spring", stiffness: 400, damping: 30 });
      } else {
        dragX.set(0);
      }

      if (!wasHorizontal) return;

      const absX = Math.abs(info.offset.x);
      const absVx = Math.abs(info.velocity.x);
      const isHorizontal = absX > Math.abs(info.offset.y);

      const passedThreshold = absX > thresholdPx;
      const passedVelocity = absVx > velocity;

      if (isHorizontal && (passedThreshold || passedVelocity)) {
        // Velocity dominates for flick gestures; offset determines for slow drag releases
        const swipeSign = passedVelocity && absVx > 100
          ? Math.sign(info.velocity.x)
          : Math.sign(info.offset.x);

        if (swipeSign < 0) {
          // Swiped left -> move to next feature
          setDirection(1);
          onNextRef.current();
          onSwipeSuccessRef.current?.();
        } else if (swipeSign > 0) {
          // Swiped right -> move to previous feature
          setDirection(-1);
          onPrevRef.current();
          onSwipeSuccessRef.current?.();
        }
      }
    },
    [disabled, dragX, prefersReducedMotion, thresholdPx, velocity]
  );

  return {
    gestureProps: {
      onPan: handlePan,
      onPanEnd: handlePanEnd,
    },
    dragX,
    direction,
    setDirection,
  };
}
