"use client";

import { useEffect, useRef } from "react";

export function PointerHalo() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate for devices with fine pointer (mouse/trackpad) and when reduced-motion is not requested
    if (typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");

    if (!finePointerQuery.matches || reducedMotionQuery.matches) {
      return;
    }

    const halo = haloRef.current;
    if (!halo) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isVisible = false;
    let isHovering = false;
    let rafId: number | null = null;
    let isRunning = false;

    const stopLoop = () => {
      isRunning = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const render = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Proximity threshold: if halo has caught up within 0.15px, park it and sleep loop to save CPU
      if (Math.abs(dx) < 0.15 && Math.abs(dy) < 0.15) {
        currentX = targetX;
        currentY = targetY;
        halo.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        stopLoop();
        return;
      }

      // Smooth interpolation for halo tracking
      currentX += dx * 0.25;
      currentY += dy * 0.25;

      halo.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (isRunning) {
        rafId = requestAnimationFrame(render);
      }
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(render);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        halo.style.display = "block";
      }

      // Check if interacting with clickable element
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest?.(
        'button, a, input, textarea, select, [role="button"], [role="tab"], [role="menuitem"], [tabindex="0"], summary'
      );
      const hovering = !!interactive;

      if (hovering !== isHovering) {
        isHovering = hovering;
        if (isHovering) {
          halo.classList.add("is-hovering");
        } else {
          halo.classList.remove("is-hovering");
        }
      }

      startLoop();
    };

    const onPointerLeave = () => {
      isVisible = false;
      halo.style.display = "none";
      stopLoop();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isVisible) {
        startLoop();
      }
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        onPointerLeave();
      }
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);

    return () => {
      stopLoop();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  return (
    <div 
      ref={haloRef} 
      className="pointer-halo" 
      style={{ display: "none" }} 
      aria-hidden="true" 
    />
  );
}
