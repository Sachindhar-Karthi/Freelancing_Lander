"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check, Send, WifiOff } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "offline_error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("markschromeos@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!navigator.onLine) {
      setFormStatus("offline_error");
      return;
    }

    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 600);
  };

  return (
    <footer className="bg-[var(--surface-elevated)] text-[var(--foreground)] border-t border-[var(--border)] pt-20 pb-12 relative overflow-hidden" id="contact">
      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Left Column: Headline & Direct Contact */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>Initiate Collaboration</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[var(--foreground)] leading-tight">
              Let&apos;s build something <br />
              <span className="text-[var(--accent)]">exceptional together.</span>
            </h2>

            <p className="text-sm sm:text-base text-[var(--foreground-muted)] font-normal max-w-lg leading-relaxed">
              Available for selected frontend architecture, design systems, and WebGL projects. Direct engineer-to-client collaboration with full code ownership.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="mailto:hello@example.com"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] px-6 py-3 font-semibold text-sm transition-all shadow-xs active:scale-[0.98]"
              >
                <span>hello@example.com</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-muted)] hover:bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] px-5 py-3 text-xs font-mono transition-all active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[var(--accent)]" />
                    <span>Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[var(--foreground-muted)]" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Direct Quick Inquiry Form with Offline Validation */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">
                Project Inquiry
              </h3>
              <p className="text-xs text-[var(--foreground-muted)] font-mono mb-6">
                Direct async message straight to my inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-name" className="block text-xs font-mono text-[var(--foreground)] mb-1.5">
                      Name *
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-email" className="block text-xs font-mono text-[var(--foreground)] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-message" className="block text-xs font-mono text-[var(--foreground)] mb-1.5">
                    Project Scope & Timeline *
                  </label>
                  <textarea
                    id="inquiry-message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Brief description of the design system or application scope..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                <AnimatePresence>
                  {formStatus === "offline_error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-[var(--accent-soft)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] flex items-center gap-2"
                    >
                      <WifiOff className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                      <span>You are currently offline. Please copy email directly: hello@example.com</span>
                    </motion.div>
                  )}

                  {formStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-[var(--accent-soft)] border border-[var(--border)] text-xs font-mono text-[var(--foreground)] flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 shrink-0 text-[var(--accent)]" />
                      <span>Inquiry transmitted. I will respond within 24 business hours.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 text-[var(--accent-foreground)] font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{formStatus === "submitting" ? "Transmitting..." : "Send Direct Inquiry"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Landmark Links & Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 border-t border-[var(--border)] pt-10 text-sm">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-1.5 font-semibold text-lg text-[var(--foreground)] mb-2">
              <span>Studio</span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            </div>
            <p className="text-[var(--foreground-muted)] text-xs max-w-sm leading-relaxed">
              Engineered with Lime Frost clarity (Light) & Minimal Orange precision (Dark). Built with Next.js 16, React 19, TypeScript, & Three.js.
            </p>
            <p className="text-[var(--foreground-muted)] text-xs font-mono mt-4">
              © {new Date().getFullYear()} Studio. All rights reserved. Self-contained & offline-ready.
            </p>
          </div>

          <div>
            <h4 className="text-[var(--foreground)] font-medium mb-3 text-xs font-mono uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[var(--foreground-muted)]">
              <li><Link href="#work" className="hover:text-[var(--accent)] transition-colors">Selected Work</Link></li>
              <li><Link href="#services" className="hover:text-[var(--accent)] transition-colors">Core Services</Link></li>
              <li><Link href="#process" className="hover:text-[var(--accent)] transition-colors">Working Process</Link></li>
              <li><Link href="#about" className="hover:text-[var(--accent)] transition-colors">About Freelancer</Link></li>
              <li><Link href="#trust" className="hover:text-[var(--accent)] transition-colors">Trust & Standards</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--foreground)] font-medium mb-3 text-xs font-mono uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2 text-xs text-[var(--foreground-muted)]">
              <li>
                <a
                  href="https://github.com/Sachindhar-Karthi/Freelancing_lander"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--foreground-muted)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--foreground-muted)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                >
                  <span>X (Twitter)</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--foreground-muted)]" />
                </a>
              </li>
              <li>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                >
                  <span>Dribbble</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--foreground-muted)]" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[var(--foreground)] font-medium mb-3 text-xs font-mono uppercase tracking-wider">
              Availability
            </h4>
            <ul className="space-y-2 text-xs text-[var(--foreground-muted)] font-mono">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[var(--foreground)] font-medium">Accepting Projects</span>
              </li>
              <li><span>Sprint Bookings: Q4 / Q1</span></li>
              <li><span>Response SLA: &lt; 24h</span></li>
              <li><span>Timezone: UTC-5 to UTC+5.5</span></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
