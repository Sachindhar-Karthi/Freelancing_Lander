"use client";

import { useSyncExternalStore } from "react";

/**
 * Standard Cubic Bezier Easing Curve across the design system:
 * [0.16, 1, 0.3, 1] - Hyper-fluid deceleration (snappy acceleration with smooth deceleration).
 */
export const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * GSAP CustomEase SVG path equivalent to [0.16, 1, 0.3, 1].
 */
export const GSAP_CUSTOM_EASE_NAME = "custom";
export const GSAP_CUSTOM_EASE_PATH = "M0,0 C0.16,1 0.3,1 1,1";

/**
 * Calibrated spring physics for magnetic micro-interactions.
 * High stiffness with critical damping prevents wobbling while feeling snappy.
 */
export const SPRING_MAGNETIC = {
  stiffness: 400,
  damping: 28,
  mass: 0.5,
} as const;

/**
 * Snappy spring for layout tab indicators and navigational active states.
 */
export const SPRING_INDICATOR = {
  type: "spring",
  stiffness: 450,
  damping: 35,
} as const;

/**
 * Standard durations for UI state transitions.
 */
export const DURATION = {
  instant: 0.15,
  fast: 0.24,
  base: 0.4,
  slow: 0.76,
  cinematic: 1.2,
} as const;

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * React 19 concurrent-safe hook to subscribe to OS prefers-reduced-motion setting
 * using useSyncExternalStore (eliminates cascading effect renders).
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}
