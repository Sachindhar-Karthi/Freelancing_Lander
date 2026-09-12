"use client";

import { motion } from "framer-motion";
import { Search, FileCode, Palette, Code2, CheckCircle2, Rocket } from "lucide-react";
import { MOTION_EASE } from "@/lib/motion";

interface Stage {
  number: string;
  name: string;
  icon: React.ReactNode;
  summary: string;
  deliverable: string;
}

const stages: Stage[] = [
  {
    number: "01",
    name: "Discover",
    icon: <Search className="w-4 h-4 text-[var(--accent)]" />,
    summary: "Audit existing code, understand business objectives, user workflows, technical constraints, and performance goals.",
    deliverable: "Technical Audit & Project Scope Document",
  },
  {
    number: "02",
    name: "Define",
    icon: <FileCode className="w-4 h-4 text-[var(--accent)]" />,
    summary: "Map application architecture, state models, API contracts, design token definitions, and milestone schedule.",
    deliverable: "Architecture RFC & Design System Spec",
  },
  {
    number: "03",
    name: "Design",
    icon: <Palette className="w-4 h-4 text-[var(--accent)]" />,
    summary: "Craft high-fidelity Figma components, interactive motion prototypes, and responsive layout guidelines.",
    deliverable: "Figma Component Library & Motion Specs",
  },
  {
    number: "04",
    name: "Build",
    icon: <Code2 className="w-4 h-4 text-[var(--accent)]" />,
    summary: "Develop clean, component-based frontend with Next.js, React 19, strict TypeScript, and accessible markup.",
    deliverable: "Version-Controlled Git Repo with CI Pipeline",
  },
  {
    number: "05",
    name: "Validate",
    icon: <CheckCircle2 className="w-4 h-4 text-[var(--accent)]" />,
    summary: "Execute unit and E2E tests, profile frame rate (60 FPS), test offline PWA cache, and audit WCAG 2.1 AA.",
    deliverable: "Test Suite & Lighthouse Audit Report",
  },
  {
    number: "06",
    name: "Launch",
    icon: <Rocket className="w-4 h-4 text-[var(--accent)]" />,
    summary: "Deploy to production infrastructure, verify DNS/CDN edge caching, conduct walkthroughs, and transfer documentation.",
    deliverable: "Production Deployment & Handoff Walkthrough",
  },
];

export function ProcessSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[var(--surface)]/30 backdrop-blur-lg border-b border-[var(--border)] relative z-20" id="process">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs font-semibold mb-3">
            <span>{"// 6-Stage Working Process"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] mb-4">
            Predictable sprints. Zero surprises.
          </h2>
          <p className="text-base sm:text-lg text-[var(--foreground-muted)] font-normal leading-relaxed">
            A battle-tested product development workflow designed for transparency, rapid iteration, and guaranteed deliverables at every checkpoint.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <motion.div
              key={stage.number}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: MOTION_EASE }}
              className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-[var(--foreground)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-md border border-[var(--border)]">
                    Stage {stage.number}
                  </span>
                  <div className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    {stage.icon}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                  {stage.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed mb-6 font-normal">
                  {stage.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)] bg-[var(--surface)] p-3 rounded-xl border">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)] block mb-1">
                  Concrete Deliverable:
                </span>
                <span className="text-xs font-medium text-[var(--foreground)] block">
                  {stage.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
