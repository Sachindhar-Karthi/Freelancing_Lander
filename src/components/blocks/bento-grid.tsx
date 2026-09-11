"use client";

import { motion } from "framer-motion";
import { Code2, Layout, Box, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function BentoGrid() {
  return (
    <div className="container mx-auto flex flex-col px-6 py-20 md:py-28 justify-center relative z-10 bg-[var(--background)] border-b border-[var(--border)]" id="capabilities">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs font-semibold mb-3">
          <span>// Technical Architecture</span>
        </div>
        <h3 className="max-w-3xl text-3xl md:text-5xl font-semibold tracking-tight text-[var(--foreground)] mb-16">
          High-density engineering for mission-critical software.
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-2">
        <BentoCard
          icon={<Code2 className="w-5 h-5 text-[var(--accent)]" />}
          title="Modern Frontend Architecture"
          description="Building robust, performant web applications with Next.js App Router, React 19, and strict TypeScript, optimized for zero layout shift and instant offline recovery."
          className="lg:col-span-3 lg:row-span-2"
          large
          graphic={
            <div className="w-full h-44 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] p-4 flex flex-col justify-between font-mono text-xs text-[var(--foreground)]">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--border)]" />
                </div>
                <span className="text-[10px] text-[var(--foreground-muted)]">ArchitectureSpec.ts</span>
              </div>
              <div className="space-y-1.5 py-2">
                <p className="text-[var(--accent)] font-medium">&lt;PWAProvider offlineFallback=&#123;true&#125; /&gt;</p>
                <p className="text-[var(--foreground-muted)]">const targetFPS = 60; // Zero jank</p>
                <div className="w-3/4 h-2 bg-[var(--accent-soft)] rounded-full" />
              </div>
              <div className="flex justify-between items-center text-[10px] text-[var(--foreground)] bg-[var(--accent-soft)]/60 p-2 rounded-lg border border-[var(--border)]">
                <span>Status: Strict TypeScript</span>
                <span className="font-semibold">0 Type Errors</span>
              </div>
            </div>
          }
        />
        <BentoCard
          icon={<Layout className="w-5 h-5 text-[var(--accent)]" />}
          title="UI/UX Design Systems"
          description="Designing intuitive, user-centric interfaces with crisp typography, mathematical spacing scales, and calm spatial harmony."
          className="lg:col-span-3"
          graphic={
            <div className="w-full h-24 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] p-3 flex items-center justify-around">
              <div className="w-16 h-12 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-2xs p-2 flex flex-col gap-1">
                <div className="w-6 h-2 bg-[var(--accent)] rounded-xs" />
                <div className="w-10 h-1 bg-[var(--border)] rounded-xs" />
              </div>
              <div className="w-16 h-12 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-2xs p-2 flex flex-col gap-1">
                <div className="w-8 h-2 bg-[var(--foreground)] rounded-xs" />
                <div className="w-6 h-1 bg-[var(--border)] rounded-xs" />
              </div>
              <div className="w-16 h-12 rounded-lg bg-[var(--accent)] shadow-2xs p-2 flex flex-col justify-center items-center text-[var(--foreground)]">
                <span className="text-[10px] font-semibold">Active</span>
              </div>
            </div>
          }
        />
        <BentoCard
          icon={<Box className="w-5 h-5 text-[var(--accent)]" />}
          title="WebGL & 3D Interactive"
          description="Bringing spatial depth to life with React Three Fiber, custom shaders, and offscreen-paused render loops."
          className="lg:col-span-2"
          graphic={
            <div className="w-full h-20 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] p-2.5 flex items-center justify-between text-[11px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[var(--foreground)] font-medium">InstancedMesh</span>
              </div>
              <span className="text-[var(--foreground)] bg-[var(--accent-soft)] px-2 py-0.5 rounded border border-[var(--border)]">60 FPS</span>
            </div>
          }
        />
        <BentoCard
          icon={<Activity className="w-5 h-5 text-[var(--accent)]" />}
          title="Product Motion"
          description="Choreographing smooth UI animations with Framer Motion and GSAP ScrollTrigger."
          className="lg:col-span-1"
          graphic={
            <div className="w-full h-20 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] p-2.5 flex flex-col justify-center gap-1.5">
              <div className="w-full h-1.5 bg-[var(--surface)] rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-[var(--accent)] rounded-full" />
              </div>
              <span className="text-[10px] font-mono text-[var(--foreground-muted)]">Ease: [0.16, 1, 0.3, 1]</span>
            </div>
          }
        />
      </div>
    </div>
  );
}

export function BentoCard({
  className = "",
  title,
  description,
  graphic,
  icon,
  large = false,
}: {
  className?: string;
  title: React.ReactNode;
  description: React.ReactNode;
  graphic?: React.ReactNode;
  icon?: React.ReactNode;
  large?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      className={cn(
        className,
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl",
        "bg-[var(--surface)] border border-[var(--border)] shadow-2xs",
        "hover:border-[var(--accent)] hover:shadow-md transition-all duration-200",
        large ? "min-h-[420px]" : "min-h-[280px]"
      )}
    >
      {graphic && (
        <div className="p-6 pb-0">
          {graphic}
        </div>
      )}

      <div className="p-6 sm:p-8 flex flex-col justify-end flex-1">
        {icon && (
          <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] border border-[var(--border)] flex items-center justify-center mb-4">
            {icon}
          </div>
        )}
        <h4 className="text-xl font-semibold tracking-tight text-[var(--foreground)] mb-2">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-[var(--foreground-muted)] font-normal leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
