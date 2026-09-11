"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

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
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIsHovered] = useState(false);

  const springConfig = { stiffness: 350, damping: 25, mass: 0.5 };
  const buttonX = useSpring(0, springConfig);
  const buttonY = useSpring(0, springConfig);
  const contentX = useSpring(0, springConfig);
  const contentY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.PointerEvent) => {
    if (disabled || typeof window === "undefined") return;
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
      className="relative z-10 flex items-center justify-center gap-2 pointer-events-none w-full"
    >
      {children}
    </motion.div>
  );

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handleMouseMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{ x: buttonX, y: buttonY }}
      whileTap={{ scale: 0.97 }}
      className="gpu-accel inline-flex items-center justify-center"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
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
