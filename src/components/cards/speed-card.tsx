"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { LedText } from "@/components/ui/led-text";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function SpeedCard() {
  // Generate 23 ticks mathematically from 190deg to 300deg (center 163, 163)
  const ticks = useMemo(() => {
    const list: { x1: number; y1: number; x2: number; y2: number; isMajor: boolean }[] = [];
    const cx = 163;
    const cy = 163;
    const outerR = 142;

    for (let i = 0; i <= 22; i++) {
      const angle = ((190 + i * 5) * Math.PI) / 180;
      const isMajor = i % 5 === 0;
      const innerR = isMajor ? 129 : 133;

      const x1 = Math.round((cx + Math.cos(angle) * innerR) * 100) / 100;
      const y1 = Math.round((cy + Math.sin(angle) * innerR) * 100) / 100;
      const x2 = Math.round((cx + Math.cos(angle) * outerR) * 100) / 100;
      const y2 = Math.round((cy + Math.sin(angle) * outerR) * 100) / 100;

      list.push({ x1, y1, x2, y2, isMajor });
    }
    return list;
  }, []);

  const cardBackground = `
    radial-gradient(ellipse 34% 24% at 50% 2%, rgba(255,220,211,.10) 0%, transparent 76%),
    radial-gradient(ellipse 44% 34% at 106% 20%, rgba(255,222,211,.10) 0%, transparent 74%),
    radial-gradient(ellipse 40% 27% at 50% 82%, rgba(255,214,208,.08) 0%, transparent 74%),
    radial-gradient(ellipse 43% 31% at -7% 61%, rgba(127,31,53,.06) 0%, transparent 74%),
    radial-gradient(ellipse 47% 34% at 107% 82%, rgba(119,29,49,.07) 0%, transparent 74%),
    linear-gradient(180deg, rgba(255,246,241,.43) 0%, rgba(255,237,235,.19) 9%, transparent 22%),
    radial-gradient(ellipse 44% 34% at 50% 111%, rgba(55,0,20,.16) 0%, transparent 74%),
    radial-gradient(ellipse 105% 32% at 50% 80%, rgba(255,218,204,.20) 0%, rgba(255,205,196,.10) 48%, transparent 78%),
    radial-gradient(ellipse 55% 22% at -5% 39%, rgba(240,250,200,.15) 0%, transparent 76%),
    radial-gradient(ellipse 64% 49% at -8% 106%, rgba(255,222,199,.48) 0%, rgba(255,204,192,.25) 49%, transparent 78%),
    radial-gradient(ellipse 64% 49% at 108% 106%, rgba(255,222,199,.43) 0%, rgba(255,204,192,.22) 49%, transparent 78%),
    radial-gradient(ellipse 52% 54% at -8% 44%, rgba(255,216,207,.20) 0%, transparent 77%),
    radial-gradient(ellipse 68% 45% at -4% -3%, rgba(255,235,232,.73) 0%, rgba(255,226,226,.41) 46%, transparent 77%),
    radial-gradient(ellipse 70% 45% at 104% -4%, rgba(255,238,233,.78) 0%, rgba(255,226,226,.42) 48%, transparent 78%),
    radial-gradient(ellipse 93% 47% at 106% 58%, rgba(245,247,241,.73) 0%, rgba(246,231,229,.42) 48%, transparent 76%),
    radial-gradient(ellipse 74% 40% at -8% 73%, rgba(255,210,190,.48) 0%, rgba(255,194,181,.25) 48%, transparent 77%),
    radial-gradient(ellipse 77% 36% at 57% 58%, rgba(255,226,218,.30) 0%, rgba(255,206,207,.15) 50%, transparent 78%),
    radial-gradient(ellipse 54% 30% at 50% 17%, rgba(106,8,51,.22) 0%, transparent 78%),
    linear-gradient(180deg, #bd4468 0%, #ad355b 38%, #a63b50 72%, #8c1320 100%)
  `;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      className="gpu-accel relative overflow-hidden flex flex-col justify-between text-white w-full aspect-[429/554] rounded-[17px] border border-white/35 shadow-[0_2px_4px_rgba(50,28,39,0.3),inset_0_1px_0_rgba(255,255,255,0.24)]"
      style={{
        background: cardBackground,
        backgroundOrigin: "border-box",
      }}
    >
      {/* Light sheen layer */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen"
        style={{
          background: `linear-gradient(103deg, rgba(255,255,255,.08), transparent 31%, rgba(255,255,255,.055) 63%, transparent 88%),
                       radial-gradient(ellipse 92% 19% at 51% 0%, rgba(255,255,255,.08), transparent 78%)`,
        }}
      />

      {/* Card Header Title */}
      <div className="relative z-[4] pt-[6.3%] px-6 text-center">
        <h3 className="text-xl sm:text-[22.7px] font-semibold text-white tracking-normal leading-[1.48] drop-shadow-[0_1px_1px_rgba(72,28,48,0.14)]">
          Inference Speed <br />
          <span className="font-normal opacity-95">AI Response Latency</span>
        </h3>
      </div>

      {/* Interactive Framer Motion Radar Gauge */}
      <div className="absolute top-[24%] left-[10%] w-[80%] h-[58%] z-[2] pointer-events-none flex items-center justify-center">
        <svg
          viewBox="0 0 326 326"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="gaugeArc" x1="7" y1="136" x2="312" y2="109" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ff9ab7" stopOpacity="0.06" />
              <stop offset="8%" stopColor="#ff8caf" stopOpacity="0.44" />
              <stop offset="34%" stopColor="#ff6796" stopOpacity="0.94" />
              <stop offset="58%" stopColor="#ff6796" stopOpacity="1" />
              <stop offset="82%" stopColor="#ffe7ed" stopOpacity="0.74" />
              <stop offset="94%" stopColor="#fff8fa" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="gaugeShadow" x1="11" y1="136" x2="308" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6e1639" stopOpacity="0.04" />
              <stop offset="9%" stopColor="#6e1639" stopOpacity="0.17" />
              <stop offset="52%" stopColor="#72163d" stopOpacity="0.18" />
              <stop offset="78%" stopColor="#7b1a43" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#7b1a43" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="radarBeam" cx="163" cy="163" r="145" gradientUnits="userSpaceOnUse">
              <stop offset="30%" stopColor="#650f35" stopOpacity="0" />
              <stop offset="45%" stopColor="#650f35" stopOpacity="0.025" />
              <stop offset="70%" stopColor="#650f35" stopOpacity="0.065" />
              <stop offset="90%" stopColor="#650f35" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#650f35" stopOpacity="0.05" />
            </radialGradient>

            <linearGradient id="radarBeamEdge" x1="238" y1="33" x2="190.5" y2="115.4" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffe7ef" stopOpacity="0.19" />
              <stop offset="48%" stopColor="#ffd1df" stopOpacity="0.11" />
              <stop offset="82%" stopColor="#ffc6d7" stopOpacity="0.045" />
              <stop offset="100%" stopColor="#ffc6d7" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Shadow Arc */}
          <motion.path
            d="M11.34 136.26A154 154 0 0 1 307.71 110.33"
            fill="none"
            stroke="url(#gaugeShadow)"
            strokeWidth="3.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Outer Main Glow Arc */}
          <motion.path
            d="M6.91 135.48A158.5 158.5 0 0 1 311.94 108.79"
            fill="none"
            stroke="url(#gaugeArc)"
            strokeWidth="2.2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          {/* Fine Ring */}
          <path
            d="M19.22 137.65A146 146 0 0 1 236 36.56"
            fill="none"
            stroke="rgba(255,166,194,.31)"
            strokeWidth="1.15"
          />

          {/* Radar Sweep Animated Wedge */}
          <motion.g
            animate={{ rotate: [0, 18, 0] }}
            transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut" }}
            style={{ transformOrigin: "163px 163px" }}
          >
            <path
              d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z"
              fill="url(#radarBeam)"
            />
            <path
              d="M238 33.1L190.5 115.4"
              stroke="url(#radarBeamEdge)"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Ticks */}
          <g>
            {ticks.map((t, idx) => (
              <line
                key={idx}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke="rgba(255,188,210,0.38)"
                strokeWidth={t.isMajor ? 1.5 : 1}
              />
            ))}
          </g>
        </svg>
      </div>

      {/* Central LED Metric Readout */}
      <div className="relative z-[5] flex items-baseline justify-center gap-1.5 pt-[22%]">
        <div className="h-10 sm:h-12 flex items-center">
          <LedText text="118" dotRadius={2.05} pitchX={5} pitchY={4} color="#FFFFFF" glow />
        </div>
        <span className="text-2xl sm:text-[30.6px] font-normal tracking-tight text-white/95 translate-y-1">
          ms
        </span>
      </div>

      {/* Caption */}
      <div className="relative z-[5] text-center px-8">
        <p className="text-sm sm:text-[18px] text-white/90 leading-[1.4] font-normal drop-shadow-[0_1px_2px_rgba(60,21,35,0.16)]">
          Average global <br />
          response
        </p>
      </div>

      {/* Magnetic CTA Button */}
      <div className="relative z-[6] pb-[7.5%] flex justify-center">
        <MagneticButton
          className="h-[44px] px-7 rounded-full bg-white text-[#2d2d2d] font-medium text-xs sm:text-sm tracking-tight shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_3px_rgba(58,25,39,0.08)] hover:shadow-[0_8px_20px_rgba(58,25,39,0.22)] transition-shadow duration-200"
        >
          <span>Learn More</span>
        </MagneticButton>
      </div>
    </motion.article>
  );
}
