"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Layers, Code, Box, Gauge } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  idealClient: string;
  deliverables: string[];
  expectedValue: string;
  ctaText: string;
  icon: React.ReactNode;
  illustration: React.ReactNode;
}

const services: ServiceItem[] = [
  {
    number: "01",
    title: "Design Systems & Component Architectures",
    description: "Design systems built for cross-functional scale. We unify brand vision with mathematical spacing, semantic design tokens, and modular UI libraries.",
    idealClient: "High-growth startups and mature product teams suffering from design debt and UI discrepancies.",
    deliverables: [
      "Token-driven Figma library aligned with CSS variables",
      "Production-ready React 19 + TypeScript component package",
      "Storybook documentation with automated WCAG a11y tests",
      "Automated CI design-token build and export pipeline",
    ],
    expectedValue: "40% faster UI sprint velocity and 0% style drift between design and production code.",
    ctaText: "Consult on Design Systems",
    icon: <Layers className="w-5 h-5 text-[var(--foreground)]" />,
    illustration: (
      <svg viewBox="0 0 240 100" className="w-full h-24 stroke-[var(--border)] fill-none">
        <rect x="10" y="10" width="60" height="80" rx="8" className="fill-[var(--surface-muted)] stroke-[var(--border)]" />
        <rect x="22" y="22" width="36" height="6" rx="3" className="fill-[var(--foreground-muted)]" />
        <rect x="22" y="34" width="24" height="6" rx="3" className="fill-[var(--accent)]" />
        <rect x="85" y="10" width="60" height="80" rx="8" className="fill-[var(--surface-muted)] stroke-[var(--border)]" />
        <rect x="97" y="22" width="36" height="6" rx="3" className="fill-[var(--foreground-muted)]" />
        <circle cx="115" cy="54" r="14" className="fill-[var(--accent-soft)] stroke-[var(--accent)]" />
        <rect x="160" y="10" width="70" height="80" rx="8" className="fill-[var(--surface-muted)] stroke-[var(--border)]" />
        <rect x="172" y="22" width="46" height="6" rx="3" className="fill-[var(--foreground-muted)]" />
        <path d="M172 40 L218 40 M172 52 L218 52 M172 64 L200 64" className="stroke-[var(--border)]" strokeWidth="2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "High-Performance Web Applications",
    description: "End-to-end frontend architecture engineered for speed, strict TypeScript safety, offline resilience, and search engine optimization.",
    idealClient: "SaaS founders, tech enterprises, and customer-facing apps requiring sub-second response times.",
    deliverables: [
      "Next.js App Router architecture with static/ISR caching",
      "Full offline PWA capability with Service Worker caching",
      "Strict TypeScript types and zero runtime warnings",
      "Automated end-to-end test suite (Playwright & Vitest)",
    ],
    expectedValue: "Consistent 98+ Google Lighthouse scores and zero client-side layout shifts (CLS 0.00).",
    ctaText: "Inquire about Web Apps",
    icon: <Code className="w-5 h-5 text-[var(--foreground)]" />,
    illustration: (
      <svg viewBox="0 0 240 100" className="w-full h-24 stroke-[var(--border)] fill-none">
        <rect x="20" y="15" width="200" height="70" rx="10" className="fill-[var(--surface-muted)] stroke-[var(--border)]" />
        <circle cx="38" cy="30" r="4" className="fill-[var(--border)]" />
        <circle cx="50" cy="30" r="4" className="fill-[var(--border)]" />
        <circle cx="62" cy="30" r="4" className="fill-[var(--accent)]" />
        <path d="M38 52 L56 64 L38 76" className="stroke-[var(--accent)]" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="68" y1="76" x2="90" y2="76" className="stroke-[var(--foreground)]" strokeWidth="2" strokeLinecap="round" />
        <rect x="110" y="46" width="90" height="28" rx="6" className="fill-[var(--surface)] stroke-[var(--border)]" />
        <text x="122" y="64" fontFamily="monospace" fontSize="9" className="fill-[var(--foreground-muted)] font-semibold">200 OK (8ms)</text>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Spatial 3D & Creative WebGL Development",
    description: "Interactive 3D storytelling that transforms passive visitors into engaged product advocates without compromising frame rates or battery life.",
    idealClient: "Hardware brands, architectural firms, and premium digital products wanting a memorable tactile showcase.",
    deliverables: [
      "Custom React Three Fiber (R3F) interactive 3D scenes",
      "Instanced geometry pipelines and optimized GLSL shaders",
      "GSAP ScrollTrigger scrubbed narrative camera transitions",
      "Zero-overhead mobile fallback and reduced-motion states",
    ],
    expectedValue: "Stable 60 FPS across desktop and mobile with automatic offscreen CPU throttling.",
    ctaText: "Discuss 3D / WebGL Project",
    icon: <Box className="w-5 h-5 text-[var(--foreground)]" />,
    illustration: (
      <svg viewBox="0 0 240 100" className="w-full h-24 stroke-[var(--border)] fill-none">
        <polygon points="120,15 170,42 120,70 70,42" className="fill-[var(--surface-muted)] stroke-[var(--accent)]" strokeWidth="1.5" />
        <polygon points="70,42 120,70 120,95 70,68" className="fill-[var(--accent-soft)] stroke-[var(--border)]" />
        <polygon points="170,42 120,70 120,95 170,68" className="fill-[var(--surface)] stroke-[var(--border)]" />
        <circle cx="120" cy="42" r="3" className="fill-[var(--accent)]" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Performance, Accessibility & Code Audits",
    description: "Granular diagnostic evaluations uncovering memory leaks, render bottlenecks, WebGL context loss, and WCAG accessibility non-compliance.",
    idealClient: "Engineering leaders preparing for major product launches, funding rounds, or enterprise compliance checks.",
    deliverables: [
      "Flamechart performance audit and layout recalculation analysis",
      "Comprehensive WCAG 2.1 AA compliance remediation plan",
      "Bundle size breakdown with tree-shaking and lazy-loading PRs",
      "Direct code modifications with verified performance benchmarks",
    ],
    expectedValue: "Immediate 30-60% reduction in interaction latency (INP) and guaranteed compliance passing.",
    ctaText: "Request Diagnostic Audit",
    icon: <Gauge className="w-5 h-5 text-[var(--foreground)]" />,
    illustration: (
      <svg viewBox="0 0 240 100" className="w-full h-24 stroke-[var(--border)] fill-none">
        <path d="M40 75 A60 60 0 0 1 200 75" className="stroke-[var(--border)]" strokeWidth="10" strokeLinecap="round" />
        <path d="M40 75 A60 60 0 0 1 170 32" className="stroke-[var(--accent)]" strokeWidth="10" strokeLinecap="round" />
        <circle cx="120" cy="75" r="8" className="fill-[var(--foreground)]" />
        <line x1="120" y1="75" x2="160" y2="42" className="stroke-[var(--foreground)]" strokeWidth="3" strokeLinecap="round" />
        <text x="100" y="92" fontFamily="monospace" fontSize="11" className="fill-[var(--foreground)] font-bold">99 / 100</text>
      </svg>
    ),
  },
];

export function ServicesSection() {
  return (
    <section 
      className="py-20 md:py-28 px-6 bg-[var(--background)] border-b border-[var(--border)] relative" 
      id="services"
    >
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs font-semibold mb-3">
            <span>// Engineering & Architectural Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] mb-4">
            Direct collaboration. Measurable engineering outcomes.
          </h2>
          <p className="text-base sm:text-lg text-[var(--foreground-muted)] font-normal leading-relaxed">
            Every engagement delivers clean, documented, production-ready code with complete ownership transferred to your internal engineering team.
          </p>
        </div>

        {/* Responsive Vertical Layout: Normal Document Flow (Zero Horizontal Movement / No Pinning) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <motion.div
              key={service.number}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="p-6 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--accent)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Number & Contextual Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)]">
                      {service.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] border border-[var(--border)] flex items-center justify-center">
                      {service.icon}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--foreground-muted)]">
                    Service Scope
                  </span>
                </div>

                {/* Service Title & Description */}
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Contextual Illustration */}
                <div className="w-full bg-[var(--surface-muted)]/50 rounded-xl p-3 border border-[var(--border)] mb-6 flex items-center justify-center overflow-hidden">
                  {service.illustration}
                </div>

                {/* Ideal Client & Expected Value */}
                <div className="space-y-3 mb-6 text-xs bg-[var(--surface-muted)]/40 p-4 rounded-xl border border-[var(--border)]/60">
                  <div>
                    <span className="text-[var(--foreground)] font-semibold font-mono uppercase tracking-wider block mb-0.5">
                      Ideal Client:
                    </span>
                    <span className="text-[var(--foreground-muted)] leading-relaxed">
                      {service.idealClient}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--foreground)] font-semibold font-mono uppercase tracking-wider block mb-0.5">
                      Expected Value:
                    </span>
                    <span className="text-[var(--foreground)] font-medium leading-relaxed">
                      {service.expectedValue}
                    </span>
                  </div>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-[var(--border)] mb-6">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-3">
                    Typical Deliverables
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]">
                    {service.deliverables.map((deliv, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span className="leading-snug">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4 border-t border-[var(--border)]">
                <Link
                  href="#contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--surface-muted)] hover:bg-[var(--accent)] hover:text-[var(--foreground)] text-[var(--foreground)] text-xs font-semibold font-mono border border-[var(--border)] transition-colors active:scale-[0.98]"
                >
                  <span>{service.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
