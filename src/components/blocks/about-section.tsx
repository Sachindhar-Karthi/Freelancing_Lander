"use client";

import { User, Target, Compass, Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-[var(--background)]/30 backdrop-blur-lg border-b border-[var(--border)] relative z-20" id="about">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Positioning & Philosophy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs font-semibold mb-4">
              <span>{"// Who I Am"}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] mb-6 leading-tight">
              An independent engineer & designer bridging code and aesthetic rigor.
            </h2>
            <div className="space-y-4 text-base text-[var(--foreground-muted)] leading-relaxed font-normal">
              <p>
                I operate as a solo creative technologist partnering directly with founders, product directors, and engineering leads. My background bridges frontend architecture (React 19, Next.js, WebGL) and human-centered design systems.
              </p>
              <p>
                Rather than treating design and development as detached silos, I prototype in code, test in real browser viewports, and eliminate the friction typically lost between Figma mockups and production releases.
              </p>
            </div>

            {/* Principles Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-[var(--border)]">
              <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--foreground)] mb-1.5">
                  <Compass className="w-4 h-4 text-[var(--accent)]" />
                  <span>Engineering Philosophy</span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Clean modular structures over monolithic abstraction. Zero unvetted dependencies and strict TypeScript throughout.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--foreground)] mb-1.5">
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span>Design Sensibility</span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Calm editorial aesthetics with restrained interaction accents. Function and clarity always lead form.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Practical Alignment & Ideal Client Profile */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)] mb-3">
                <Target className="w-4 h-4 text-[var(--accent)]" />
                <span>Ideal Client Profile</span>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--foreground-muted)]">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                  <span>Early to growth-stage startups building core SaaS products or design systems.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                  <span>Creative agencies seeking an experienced WebGL & R3F specialist for high-impact launches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                  <span>Teams valuing direct async communication, transparent Git PRs, and verifiable benchmarks.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface-muted)] border border-[var(--border)]">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground)] mb-2">
                <User className="w-4 h-4 text-[var(--accent)]" />
                <span>Operating Details</span>
              </div>
              <div className="space-y-2 text-xs text-[var(--foreground-muted)] font-mono">
                <div className="flex justify-between py-1 border-b border-[var(--border)]">
                  <span>Availability:</span>
                  <span className="text-[var(--foreground)] font-semibold">Q4 2026 // Active</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border)]">
                  <span>Timezone overlap:</span>
                  <span className="text-[var(--foreground)] font-semibold">UTC-5 to UTC+5.5</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--border)]">
                  <span>Contract structure:</span>
                  <span className="text-[var(--foreground)] font-semibold">Fixed-scope sprint / Retainer</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Code ownership:</span>
                  <span className="text-[var(--foreground)] font-semibold">100% Client IP transfer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
