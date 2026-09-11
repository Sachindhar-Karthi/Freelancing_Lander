"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Zap, Eye, WifiOff } from "lucide-react";

const capabilities = [
  {
    icon: <Cpu className="w-4 h-4 text-[var(--accent)]" />,
    label: "Strict TypeScript",
    detail: "Zero any / 100% typed",
  },
  {
    icon: <Zap className="w-4 h-4 text-[var(--accent)]" />,
    label: "60 FPS Target",
    detail: "RAF delta profiling",
  },
  {
    icon: <WifiOff className="w-4 h-4 text-[var(--accent)]" />,
    label: "Offline First",
    detail: "Full service worker PWA",
  },
  {
    icon: <Eye className="w-4 h-4 text-[var(--accent)]" />,
    label: "WCAG 2.1 AA",
    detail: "Accessible contrast & keys",
  },
  {
    icon: <ShieldCheck className="w-4 h-4 text-[var(--accent)]" />,
    label: "Zero Bloat",
    detail: "Local assets & fast LCP",
  },
];

export function CapabilityStrip() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)] py-5 px-6 relative z-20">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-6 md:gap-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)]">
            Engineering Standards
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-10">
          {capabilities.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -1 }}
              className="flex items-center gap-2.5 text-xs font-mono"
            >
              <div className="p-1 rounded-md bg-[var(--accent-soft)] border border-[var(--border)]">
                {item.icon}
              </div>
              <div>
                <span className="font-semibold text-[var(--foreground)] block">{item.label}</span>
                <span className="text-[var(--foreground-muted)] text-[11px] block">{item.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
