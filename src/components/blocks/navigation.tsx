"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Search, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CommandMenu } from "./command-menu";
import { ProjectModal } from "./project-modal";
import type { Project } from "@/data/projects";

const NAV_LINKS = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#process", label: "Process", id: "process" },
  { href: "#about", label: "About", id: "about" },
  { href: "#trust", label: "Standards", id: "trust" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("work");
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const mobileSheetRef = useRef<HTMLDivElement>(null);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  // Track scroll position with passive listener for sticky surface treatment
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section tracking (zero geometry calculations on scroll frames)
  useEffect(() => {
    const sectionIds = ["work", "services", "process", "about", "trust"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Body scroll lock and Escape key for mobile menu
  useEffect(() => {
    if (isOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      };
      window.addEventListener("keydown", handleKey);

      return () => {
        document.body.style.overflow = orig;
        window.removeEventListener("keydown", handleKey);
      };
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          isScrolled
            ? "bg-[var(--surface)]/90 backdrop-blur-md border-b border-[var(--border)] shadow-xs"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 h-18 sm:h-20 flex items-center justify-between">
          {/* Studio Identity */}
          <Link
            href="/"
            className="text-[var(--foreground)] font-semibold text-xl tracking-tight flex items-center gap-1 hover:opacity-85 transition-opacity"
            aria-label="Studio Home"
          >
            <span>Studio</span>
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] inline-block" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[var(--surface-muted)]/80 p-1.5 rounded-full border border-[var(--border)]">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    isActive
                      ? "text-[var(--foreground)]"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-[var(--surface)] shadow-2xs border border-[var(--border)]"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Tools: Browse Projects, Theme Toggle, Contact CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Search / Browse Projects Button */}
            <button
              onClick={() => setIsCmdOpen(true)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] text-xs font-medium text-[var(--foreground)] transition-colors shadow-2xs active:scale-[0.98]"
              aria-label="Search and browse projects (Command + K)"
            >
              <Search className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
              <span className="hidden md:inline">Browse Projects</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--surface-muted)] border border-[var(--border)] font-mono text-[10px] text-[var(--foreground-muted)]">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle Dropdown */}
            <ThemeToggle />

            {/* Contact CTA with Magnetic Hover Effect */}
            <MagneticButton
              href="#contact"
              strength={0.24}
              textStrength={0.12}
              className="text-xs font-semibold text-[var(--foreground)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] px-4 py-2.5 rounded-full transition-colors shadow-xs"
            >
              <span>Get in touch</span>
            </MagneticButton>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsCmdOpen(true)}
              aria-label="Search projects"
              className="p-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={isOpen}
              className="p-2.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)]"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer / Sheet */}
      <AnimatePresence>
        {isOpen && (
          <div
            ref={mobileSheetRef}
            className="fixed inset-0 top-18 sm:top-20 z-40 bg-[var(--background)]/95 backdrop-blur-xl lg:hidden p-6 flex flex-col justify-between border-b border-[var(--border)] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="space-y-6">
              {/* Navigation Links */}
              <nav className="flex flex-col divide-y divide-[var(--border)]">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="py-3.5 text-base font-semibold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[var(--foreground-muted)]" />
                  </Link>
                ))}
              </nav>

              {/* Quick Search Action */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsCmdOpen(true);
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-sm font-medium text-[var(--foreground)]"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-[var(--accent)]" />
                  <span>Browse Projects Catalog</span>
                </div>
                <kbd className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-[var(--foreground-muted)]">
                  ⌘K
                </kbd>
              </button>

              {/* Labeled Theme Row */}
              <div className="pt-2">
                <ThemeToggle isMobile />
              </div>
            </div>

            {/* Bottom Contact & Signature */}
            <div className="pt-8 pb-4 space-y-4">
              <Link
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center block py-3 rounded-full bg-[var(--accent)] text-[var(--foreground)] font-semibold text-sm active:scale-[0.98] shadow-xs"
              >
                Get in touch
              </Link>
              <div className="text-center text-xs font-mono text-[var(--foreground-muted)]">
                © {new Date().getFullYear()} Studio. Engineered with precision.
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Command Menu */}
      <CommandMenu
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
