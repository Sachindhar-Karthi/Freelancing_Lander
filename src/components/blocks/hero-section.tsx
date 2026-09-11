"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
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
  gridOptions?: {
    angle?: number;
    cellSize?: number;
    opacity?: number;
    lineColor?: string;
  };
}

const RetroGrid = ({
  angle = 65,
  cellSize = 55,
  opacity = 0.35,
  lineColor = "var(--border)",
}) => {
  const gridStyles = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--grid-line": lineColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        `opacity-[var(--opacity)]`
      )}
      style={gridStyles}
    >
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div className="animate-grid [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_0),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_0)] [background-repeat:repeat] [background-size:var(--cell-size)_var(--cell-size)] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent to-90%" />
    </div>
  );
};

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      className,
      title = "Available for Q4 freelance projects",
      subtitle = {
        regular: "Designing digital products ",
        highlight: "with clarity & precision.",
      },
      description = "I am a creative developer & UI/UX designer blending clean architecture and human-centered motion to craft calm, award-winning software.",
      ctaText = "Explore selected work",
      ctaHref = "#work",
      gridOptions,
      ...props
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const accentHighlightRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      // Register custom ease curve from relay_2.txt
      gsap.registerPlugin(CustomEase);
      try {
        CustomEase.create("custom", "M0,0 C0.16,1 0.3,1 1,1");
      } catch {
        // Fallback if already registered
      }

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "custom" } });

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
            { scaleX: 1, duration: 0.85, ease: "power2.out" },
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

        // t = 0.56s & 0.66s: CTA actions entrance
        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7 },
            0.56
          );
        }
      }, rootRef);

      return () => ctx.revert();
    }, []);

    return (
      <div 
        className={cn("relative min-h-[90vh] w-full flex items-center overflow-hidden pt-20", className)} 
        ref={ref || rootRef} 
        {...props}
      >
        <section className="relative w-full z-10 pointer-events-none">
          <div className="max-w-screen-xl mx-auto px-6 py-20 md:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left side empty for 3D centralized animation to show through clearly */}
            <div className="hidden lg:block"></div>

            {/* Right side for Title and Text */}
            <div className="space-y-8 max-w-xl mx-auto lg:mx-0 text-left pointer-events-auto">
              
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
              <h1 className="text-4xl sm:text-6xl md:text-7xl tracking-tight font-sans font-semibold text-[var(--foreground)] leading-[1.08]">
                <span className="type-mask block">
                  <span ref={line1Ref} className="gpu-accel inline-block">
                    {subtitle.regular}
                  </span>
                </span>
                <span className="type-mask block">
                  <span ref={line2Ref} className="gpu-accel inline-block relative">
                    {subtitle.highlight}
                    <span 
                      ref={accentHighlightRef}
                      className="absolute bottom-1 left-0 right-0 h-[6px] bg-[var(--accent)]/50 -z-10 rounded-xs origin-left" 
                    />
                  </span>
                </span>
              </h1>
              
              {/* Description */}
              <p ref={descRef} className="gpu-accel max-w-md text-base sm:text-lg text-[var(--foreground-muted)] font-normal leading-relaxed">
                {description}
              </p>
              
              {/* Action Buttons */}
              <div ref={ctaRef} className="pt-4 flex flex-col sm:flex-row items-start justify-start gap-4">
                <MagneticButton
                  href={ctaHref}
                  strength={0.28}
                  textStrength={0.14}
                  className="rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--foreground)] px-8 py-4 text-sm font-semibold shadow-xs hover:shadow transition-shadow"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--foreground)]" />
                </MagneticButton>

                <MagneticButton
                  href="#services"
                  strength={0.28}
                  textStrength={0.14}
                  className="rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] border border-[var(--border)] text-[var(--foreground)] px-7 py-4 text-sm font-medium shadow-2xs transition-shadow"
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
