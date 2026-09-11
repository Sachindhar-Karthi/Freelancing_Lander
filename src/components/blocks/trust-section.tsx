"use client";

import { motion } from "framer-motion";
import { GitBranch, Shield, MessagesSquare, KeyRound } from "lucide-react";

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  commitment: string;
}

const trustCommitments: TrustItem[] = [
  {
    icon: <GitBranch className="w-5 h-5 text-[var(--accent)]" />,
    title: "100% Code Ownership & Clean Git Tree",
    description: "Every commit, pull request, and design file is pushed directly to your organization's repository with clean commit histories.",
    commitment: "Full IP transfer upon delivery with zero licensing locks.",
  },
  {
    icon: <MessagesSquare className="w-5 h-5 text-[var(--accent)]" />,
    title: "Direct Access, Zero Delegation",
    description: "You work directly with the builder doing the design and code. No account managers, middle-tier delays, or junior subcontractors.",
    commitment: "Daily async Slack/Loom video updates at every milestone.",
  },
  {
    icon: <Shield className="w-5 h-5 text-[var(--accent)]" />,
    title: "Production-Grade Quality Guarantees",
    description: "All delivered code is typed with strict TypeScript, tested with Playwright/Vitest, and validated against WCAG 2.1 AA accessibility standards.",
    commitment: "30-day post-launch bug warranty included on all fixed scopes.",
  },
  {
    icon: <KeyRound className="w-5 h-5 text-[var(--accent)]" />,
    title: "Confidentiality & Security First",
    description: "Standard mutual NDA compliance, zero public attribution without prior written consent, and enterprise-grade secret handling.",
    commitment: "Safe credential handling via encrypted vaults & env managers.",
  },
];

export function TrustSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[var(--surface)] border-b border-[var(--border)]" id="trust">
      <div className="max-w-screen-xl mx-auto">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs font-semibold mb-3">
            <span>// Trust & Collaboration Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] mb-4">
            Grounded in transparency. Proven in code.
          </h2>
          <p className="text-base sm:text-lg text-[var(--foreground-muted)] font-normal leading-relaxed">
            I believe trust is earned through verifiable engineering practices, rigorous version control, and clear commitments rather than fabricated testimonials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {trustCommitments.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="p-8 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)] flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed mb-6 font-normal">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)] block mb-1">
                  Guaranteed Standard:
                </span>
                <span className="text-xs font-medium text-[var(--foreground)]">
                  {item.commitment}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
