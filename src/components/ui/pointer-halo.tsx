"use client";

import { useEffect, useRef } from "react";

export function PointerHalo() {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate for devices with fine pointer (mouse/trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
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

    const render = () => {
      // Smooth interpolation for halo following
      currentX += (targetX - currentX) * 0.25;
      currentY += (targetY - currentY) * 0.25;

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

    const stopLoop = () => {
      isRunning = false;
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
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
      const interactive = target?.closest?.('button, a, input, textarea, select, [role="button"], [role="tab"], [tabindex="0"]');
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

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopLoop();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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
