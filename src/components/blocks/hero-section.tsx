"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    return (
      <div 
        className={cn("relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--background)] pt-20", className)} 
        ref={ref} 
        {...props}
      >
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 z-[0] h-[80vh] w-screen bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,var(--accent-soft),transparent)] opacity-40" />
        
        <RetroGrid 
          angle={65}
          cellSize={50}
          opacity={0.35}
          lineColor="var(--border)"
          {...gridOptions} 
        />
        
        <section className="relative max-w-full mx-auto z-10 pointer-events-none">
          <div className="max-w-screen-xl mx-auto px-6 py-20 md:py-32 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 max-w-4xl mx-auto text-center"
            >
              {/* Status Pill Badge */}
              <div className="pointer-events-auto w-fit mx-auto">
                <div 
                  className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--foreground)] bg-[var(--accent-soft)] border border-[var(--border)] px-4 py-2 rounded-full shadow-xs"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span>{title}</span>
                </div>
              </div>
              
              {/* Hero Headline */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl tracking-tight font-sans font-semibold text-[var(--foreground)] leading-[1.08] mx-auto">
                {subtitle.regular}
                <span className="relative inline-block">
                  {subtitle.highlight}
                  <span className="absolute bottom-1 left-0 right-0 h-[6px] bg-[var(--accent)]/40 -z-10 rounded-xs" />
                </span>
              </h1>
              
              {/* Description */}
              <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--foreground-muted)] font-normal leading-relaxed">
                {description}
              </p>
              
              {/* Action Buttons */}
              <div className="pt-4 items-center justify-center gap-4 flex flex-col sm:flex-row pointer-events-auto">
                <a
                  href={ctaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] px-8 py-4 text-sm font-semibold text-[var(--foreground)] shadow-xs hover:shadow transition-all active:scale-[0.98]"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--surface)] hover:bg-[var(--surface-muted)] border border-[var(--border)] px-7 py-4 text-sm font-medium text-[var(--foreground)] shadow-2xs transition-all active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                  <span>View Services</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }
);
HeroSection.displayName = "HeroSection";

export { HeroSection };
