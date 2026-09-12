"use client";

import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion";

export function ThemeToggle({ isMobile = false }: { isMobile?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!mounted) {
    return (
      <div className="w-11 h-11 rounded-full bg-[var(--surface-muted)] border border-[var(--border)]" aria-hidden="true" />
    );
  }

  // Mobile rendering: Inline segmented row with clear labels
  if (isMobile) {
    return (
      <div className="w-full">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-2">
          Theme Preference
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)]">
          {(["light", "dark", "system"] as const).map((t) => {
            const isSelected = theme === t;
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium capitalize transition-all min-h-[44px] ${
                  isSelected
                    ? "bg-[var(--surface)] text-[var(--foreground)] shadow-xs border border-[var(--border)]"
                    : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                }`}
                aria-pressed={isSelected}
              >
                {t === "light" && <Sun className="w-3.5 h-3.5 text-[var(--foreground)]" />}
                {t === "dark" && <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />}
                {t === "system" && <Laptop className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />}
                <span>{t}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop rendering: Compact 44x44px button with accessible dropdown
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`Toggle theme (current: ${theme})`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="w-11 h-11 rounded-full flex items-center justify-center bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--foreground)] transition-all shadow-2xs hover:shadow-xs active:scale-[0.97]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={theme}
            initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
            transition={{ duration: 0.18, ease: MOTION_EASE }}
          >
            {theme === "light" && <Sun className="w-4 h-4 text-[var(--foreground)]" />}
            {theme === "dark" && <Moon className="w-4 h-4 text-[var(--accent)]" />}
            {theme === "system" && <Laptop className="w-4 h-4 text-[var(--foreground-muted)]" />}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Accessible Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.18, ease: MOTION_EASE }}
            className="absolute right-0 mt-2 w-40 rounded-xl bg-[var(--surface)] border border-[var(--border)] shadow-xl p-1.5 z-50 text-[var(--foreground)]"
            role="menu"
            aria-orientation="vertical"
          >
            {(["light", "dark", "system"] as const).map((t) => {
              const isSelected = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setTheme(t);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                    isSelected
                      ? "bg-[var(--accent-soft)]/60 text-[var(--foreground)] font-semibold"
                      : "hover:bg-[var(--surface-muted)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    {t === "light" && <Sun className="w-3.5 h-3.5" />}
                    {t === "dark" && <Moon className="w-3.5 h-3.5 text-[var(--accent)]" />}
                    {t === "system" && <Laptop className="w-3.5 h-3.5" />}
                    <span>{t}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[var(--accent)]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
