"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";
import { SPRING_MAGNETIC, MOTION_EASE } from "@/lib/motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  strength?: number;
  textStrength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.32,
  textStrength = 0.16,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const buttonX = useSpring(0, SPRING_MAGNETIC);
  const buttonY = useSpring(0, SPRING_MAGNETIC);
  const contentX = useSpring(0, SPRING_MAGNETIC);
  const contentY = useSpring(0, SPRING_MAGNETIC);

  // Reset springs immediately if reduced motion is requested
  useEffect(() => {
    if (shouldReduceMotion) {
      buttonX.set(0);
      buttonY.set(0);
      contentX.set(0);
      contentY.set(0);
    }
  }, [shouldReduceMotion, buttonX, buttonY, contentX, contentY]);

  const handleMouseMove = (e: React.PointerEvent) => {
    if (disabled || shouldReduceMotion || typeof window === "undefined") return;
    const node = containerRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    buttonX.set(deltaX * strength);
    buttonY.set(deltaY * strength);
    contentX.set(deltaX * textStrength);
    contentY.set(deltaY * textStrength);
  };

  const handlePointerEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    buttonX.set(0);
    buttonY.set(0);
    contentX.set(0);
    contentY.set(0);
  };

  const content = (
    <motion.div
      style={{ x: contentX, y: contentY }}
      transition={{ ease: MOTION_EASE }}
      className="relative z-10 flex items-center justify-center gap-2 pointer-events-none w-full"
    >
      {children}
    </motion.div>
  );

  const isExternal = Boolean(
    target === "_blank" ||
    (href && (href.startsWith("http://") || href.startsWith("https://")))
  );
  const resolvedRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handleMouseMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ x: buttonX, y: buttonY }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.15, ease: MOTION_EASE }}
      className="gpu-accel inline-flex items-center justify-center"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={resolvedRel}
          aria-label={ariaLabel}
          className={`relative inline-flex items-center justify-center cursor-pointer select-none overflow-hidden ${className}`}
        >
          {content}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          aria-label={ariaLabel}
          className={`relative inline-flex items-center justify-center cursor-pointer select-none overflow-hidden ${className}`}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}
