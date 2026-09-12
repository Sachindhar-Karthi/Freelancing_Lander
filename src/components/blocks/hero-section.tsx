"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { GSAP_CUSTOM_EASE_PATH, GSAP_CUSTOM_EASE_NAME } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: {
    regular: string;
    highlight: string;
  };
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}


const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Available for Q4 freelance projects",
      subtitle = {
        regular: "Designing digital products ",
        highlight: "with clarity & precision.",
      },
      description = "We are a group of creative developer & UI/UX designer blending clean architecture and human-centered motion to craft calm, award-winning software.",
      ctaText = "Explore selected work",
      ctaHref = "#work",
      ...props
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => rootRef.current as HTMLDivElement);
    const badgeRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const accentHighlightRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      // Register custom ease curve from motion tokens
      gsap.registerPlugin(CustomEase);
      try {
        CustomEase.create(GSAP_CUSTOM_EASE_NAME, GSAP_CUSTOM_EASE_PATH);
      } catch {
        // Fallback if already registered
      }

      const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const ctx = gsap.context(() => {
        if (isReducedMotion) {
          if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 1, y: 0, scale: 1 });
          if (line1Ref.current) gsap.set(line1Ref.current, { y: "0%", opacity: 1 });
          if (line2Ref.current) gsap.set(line2Ref.current, { y: "0%", opacity: 1 });
          if (accentHighlightRef.current) gsap.set(accentHighlightRef.current, { scaleX: 1 });
          if (descRef.current) gsap.set(descRef.current, { opacity: 1, y: 0 });
          if (ctaRef.current) {
            const targets = ctaRef.current.children.length > 0 ? ctaRef.current.children : ctaRef.current;
            gsap.set(targets, { opacity: 1, y: 0 });
          }
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: GSAP_CUSTOM_EASE_NAME } });

        // Staggered sequence ported from relay_2.txt specifications
        // t = 0.18s: badge wipes in
        if (badgeRef.current) {
          tl.fromTo(
            badgeRef.current,
            { opacity: 0, y: 12, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6 },
            0.18
          );
        }

        // t = 0.26s: Headline line 1 rises (0.85s type-rise backwards from translate3d(0, 118%, 0))
        if (line1Ref.current) {
          tl.fromTo(
            line1Ref.current,
            { y: "118%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.85 },
            0.26
          );
        }

        // t = 0.40s: Headline line 2 rises
        if (line2Ref.current) {
          tl.fromTo(
            line2Ref.current,
            { y: "118%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.85 },
            0.40
          );
        }

        // t = 0.70s: Accent highlight fill
        if (accentHighlightRef.current) {
          tl.fromTo(
            accentHighlightRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.85, ease: GSAP_CUSTOM_EASE_NAME, transformOrigin: "left center" },
            0.70
          );
        }

        // t = 0.78s: Description fades in
        if (descRef.current) {
          tl.fromTo(
            descRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.72 },
            0.78
          );
        }

        // t = 0.56s & 0.66s: CTA actions entrance (staggered entrance for CTA buttons)
        if (ctaRef.current) {
          const targets = ctaRef.current.children.length > 0 ? ctaRef.current.children : ctaRef.current;
          tl.fromTo(
            targets,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
            0.56
          );
        }
      }, rootRef);

      return () => ctx.revert();
    }, []);

    return (
      <div
        className={cn("relative min-h-[90vh] w-full flex items-center overflow-hidden pt-20", className)}
        ref={rootRef}
        {...props}
      >
        <section className="relative w-full z-10 pointer-events-none">
          <div className="max-w-screen-xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

            {/* Left side empty for 3D centralized animation to show through clearly */}
            <div className="hidden lg:block"></div>

            {/* Right side for Title and Text with responsive frosted container on mobile */}
            <div className="space-y-6 sm:space-y-8 max-w-xl mx-auto lg:mx-0 text-left pointer-events-auto bg-[var(--background)]/75 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-5 sm:p-7 lg:p-0 rounded-2xl sm:rounded-3xl border border-[var(--border)]/60 lg:border-transparent">

              {/* Status Pill Badge */}
              <div className="w-fit" ref={badgeRef}>
                <div
                  className="gpu-accel inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--foreground)] bg-[var(--surface)]/80 glass-pill border border-[var(--border)] px-4 py-2 rounded-full shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span>{title}</span>
                </div>
              </div>

              {/* Hero Headline */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-sans font-semibold text-[var(--foreground)] leading-[1.12]">
                <span className="type-mask block pb-1 -mb-1">
                  <span ref={line1Ref} className="gpu-accel inline-block">
                    {subtitle?.regular}
                  </span>
                </span>
                <span className="type-mask block pb-1 -mb-1">
                  <span ref={line2Ref} className="gpu-accel inline-block relative">
                    {subtitle?.highlight}
                    <span
                      ref={accentHighlightRef}
                      className="absolute bottom-1 left-0 right-0 h-[6px] bg-[var(--accent)]/50 -z-10 rounded-xs origin-left"
                    />
                  </span>
                </span>
              </h1>

              {/* Description */}
              <p ref={descRef} className="gpu-accel max-w-md text-sm sm:text-base md:text-lg text-[var(--foreground-muted)] font-normal leading-relaxed">
                {description}
              </p>

              {/* Action Buttons */}
              <div ref={ctaRef} className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4 w-full sm:w-auto">
                <MagneticButton
                  href={ctaHref}
                  strength={0.28}
                  textStrength={0.14}
                  className="w-full sm:w-auto rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-foreground)] px-8 py-3.5 sm:py-4 text-sm font-semibold shadow-xs hover:shadow transition-shadow justify-center"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--accent-foreground)]" />
                </MagneticButton>

                <MagneticButton
                  href="#services"
                  strength={0.28}
                  textStrength={0.14}
                  className="w-full sm:w-auto rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)] px-7 py-3.5 sm:py-4 text-sm font-medium shadow-2xs transition-shadow justify-center"
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span>View Services</span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
);
HeroSection.displayName = "HeroSection";

export { HeroSection };
