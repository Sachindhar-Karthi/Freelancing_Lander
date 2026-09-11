"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Cpu, Layers, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  triggerElementRef?: HTMLElement | null;
}

export function ProjectModal({ project, onClose, triggerElementRef }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Focus close button on open
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    // Escape listener and focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      // Return focus to trigger element if provided
      if (triggerElementRef) {
        triggerElementRef.focus();
      }
    };
  }, [project, onClose, triggerElementRef]);

  return (
    <AnimatePresence>
      {project && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xl p-6 sm:p-8 text-[var(--foreground)]"
          >
            {/* Close Button */}
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-6 right-6 p-2 rounded-full bg-[var(--surface-muted)] border border-[var(--border)] hover:bg-[var(--surface-elevated)] transition-colors text-[var(--foreground)]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6 pr-10">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--foreground)] font-mono text-xs font-semibold border border-[var(--border)]">
                  {project.category}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[var(--surface-muted)] text-[var(--foreground-muted)] font-mono text-[11px] font-medium border border-[var(--border)]">
                  {project.status}
                </span>
              </div>
              <h2 id="project-modal-title" className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                {project.title}
              </h2>
              <p className="text-sm sm:text-base text-[var(--foreground-muted)] mt-1">
                {project.summary}
              </p>
            </div>

            {/* Visual Preview */}
            <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden mb-8 border border-[var(--border)] bg-[var(--surface-muted)]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>

            {/* Challenge Statement */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-2">
                Challenge & Context
              </h3>
              <p className="text-sm sm:text-base text-[var(--foreground)] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            {/* Role & Tools */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div className="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)]">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-2 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Role</span>
                </h4>
                <p className="text-sm font-medium text-[var(--foreground)]">{project.role}</p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)]">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Tools & Stack</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="text-xs font-mono px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-2">
                Typical Deliverables
              </h3>
              <ul className="space-y-2 text-sm text-[var(--foreground)]">
                {project.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[var(--accent)] mt-0.5 shrink-0" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div className="p-4 rounded-xl bg-[var(--accent-soft)]/40 border border-[var(--border)] mb-6">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)] mb-1">
                Outcome
              </h3>
              <p className="text-sm font-mono text-[var(--foreground-muted)]">
                {project.outcome}
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 text-sm font-semibold transition-opacity active:scale-[0.98]"
              >
                Close Project Overview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
