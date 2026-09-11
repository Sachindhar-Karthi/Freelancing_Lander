"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { LedText } from "@/components/ui/led-text";

// Register plugins safely on the client to avoid SSR mismatch
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * High-end Freelancer Roster replacing the deprecated .intro paragraph.
 * Utilizes Framer Motion for granular micro-interaction hover states.
 */
function FreelancerRoster() {
  const roster = ['Sachindhar Karthi', 'Alex River', 'Jordan Lee', 'Casey Smith'];
  return (
    <div className="grid grid-cols-2 gap-3">
      {roster.map((name) => (
        <motion.div
          key={name}
          // Hyper-minimalist tailwind styling with glassmorphic pill background.
          // will-change-transform forces GPU hardware acceleration for hover paints.
          className="roster-item px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium tracking-wide text-white/60 will-change-transform text-center"
          whileHover={{ 
            color: "#ffffff", 
            // Glowing inset shadow matching the LED brand palette (#d84736)
            boxShadow: "inset 4px 0 0 0 #d84736",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.div>
      ))}
    </div>
  );
}

export function IntelligentPerformance() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Z-Axis Parallax for Background Scrub
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      });
    }

    // 2. GSAP Reveal Implementation for Masthead
    gsap.fromTo(".headline-word", 
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        duration: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    // 3. Roster Micro-Interactions Scroll Entrance
    gsap.fromTo(".roster-item",
      { x: 20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "back.out(1.2)",
        duration: 0.8,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative py-20 md:py-28 px-6 border-b border-[var(--border)] overflow-hidden"
      id="performance"
      aria-label="Intelligent Performance Capabilities"
    >
      <div 
        ref={bgRef} 
        className="absolute inset-0 z-[-1] pointer-events-none will-change-transform bg-[var(--background)]/20 backdrop-blur-[2px]"
      />

      <div className="max-w-screen-xl mx-auto relative">
        <div className="masthead relative z-50 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] border border-[var(--border)] text-[var(--foreground)] font-mono text-xs font-semibold mb-3 headline-word will-change-transform">
                <span>// 120 FPS Systems Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-[46px] font-semibold tracking-tight text-[var(--foreground)] leading-[1.18]">
                <span className="inline-flex items-center flex-wrap gap-2">
                  <span className="headline-word will-change-transform">Built</span>
                  <span className="headline-word will-change-transform">for</span>
                  <span className="inline-block h-7 sm:h-9 text-[var(--accent)] translate-y-1 headline-word will-change-transform">
                    <LedText text="Intelligent" dotRadius={1.8} pitchX={4} pitchY={4} glow />
                  </span>
                </span>
                <br />
                <span className="headline-word will-change-transform block mt-1">Performance</span>
              </h2>
            </div>
          </div>

          <div className="lg:col-span-5 pt-2">
            <FreelancerRoster />
          </div>
        </div>
      </div>
    </section>
  );
}
