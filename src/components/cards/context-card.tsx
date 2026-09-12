"use client";

import React from "react";
import { motion } from "framer-motion";
import { LedText } from "@/components/ui/led-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MOTION_EASE } from "@/lib/motion";

export function ContextCard() {
  const cardBackground = `
    radial-gradient(ellipse 118% 66% at 48% -8%, rgba(221,232,255,.065), transparent 74%),
    radial-gradient(ellipse 106% 52% at 48% 112%, rgba(255,155,139,.075), transparent 73%),
    radial-gradient(ellipse 82% 15% at 50% 29%, rgba(240,204,244,.24), transparent 81%),
    radial-gradient(ellipse 64% 18% at 50% 61%, rgba(239,177,208,.17), transparent 81%),
    radial-gradient(ellipse 43% 42% at -5% 30%, rgba(228,220,255,.53), transparent 78%),
    radial-gradient(ellipse 43% 42% at 105% 30%, rgba(245,200,210,.54), transparent 78%),
    radial-gradient(ellipse 70% 48% at 70% 110%, rgba(238,204,201,.62), transparent 77%),
    radial-gradient(ellipse 70% 23% at 78% 1%, rgba(251,208,226,.56), transparent 78%),
    radial-gradient(ellipse 78% 25% at 15% 8%, rgba(218,211,255,.54), transparent 79%),
    radial-gradient(ellipse 38% 31% at 80% 90%, rgba(230,190,191,.38), transparent 74%),
    radial-gradient(ellipse 45% 26% at 47% 78%, rgba(236,184,183,.45), transparent 73%),
    linear-gradient(164deg, #c9b5e1 0%, #ad80ca 29%, #9d4f72 64%, #793246 100%)
  `;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.76, ease: MOTION_EASE, delay: 0.25 }}
      className="gpu-accel relative overflow-hidden flex flex-col justify-between text-white w-full aspect-[429/554] rounded-[17px] border border-white/35 shadow-[0_2px_4px_rgba(50,28,39,0.3),inset_0_1px_0_rgba(255,255,255,0.24)]"
      style={{
        background: cardBackground,
        backgroundOrigin: "border-box",
      }}
    >
      {/* Multiply sheen layer */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-50 mix-blend-multiply"
        style={{
          background: `radial-gradient(ellipse 18% 23% at 20% 32%, rgba(103,41,148,.24), transparent 76%),
                       radial-gradient(ellipse 20% 24% at 81% 30%, rgba(121,34,113,.22), transparent 76%),
                       radial-gradient(ellipse 66% 9% at 50% 30%, rgba(103,33,125,.26), transparent 82%),
                       radial-gradient(ellipse 68% 8% at 50% 69%, rgba(86,27,64,.23), transparent 83%)`,
        }}
      />

      {/* Card Header Title */}
      <div className="relative z-[4] pt-[6.3%] px-6 text-center">
        <h3 className="text-xl sm:text-[23px] font-semibold text-white tracking-normal leading-[1.48] drop-shadow-[0_1px_1px_rgba(72,28,48,0.14)]">
          Context Window <br />
          <span className="font-normal opacity-95">Long-form Understanding</span>
        </h3>
      </div>

      {/* Floating Frosted Glass Context Window */}
      <div className="absolute top-[28%] left-[18%] w-[64%] h-[28%] z-[3] pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: MOTION_EASE, delay: 0.3 }}
          className="w-full h-full rounded-[12px] p-4 flex flex-col justify-between relative overflow-hidden"
          style={{
            background: `linear-gradient(0deg, rgba(255,255,255,.30) 0%, rgba(255,255,255,.15) 45%, rgba(255,255,255,0) 80%),
                         linear-gradient(270deg, rgba(213,62,152,.62) 0px, rgba(213,62,152,0) 8px),
                         radial-gradient(ellipse 118% 70% at 60% 8%, rgba(255,203,252,.34), transparent 74%),
                         linear-gradient(105deg, rgba(250,232,250,.72) 0%, rgba(238,120,214,.68) 51%, rgba(222,86,177,.82) 100%)`,
            boxShadow: "0 13px 25px rgba(70,17,69,0.31), inset 0 1px 0 rgba(255,255,255,0.18)",
            backdropFilter: "blur(9px) saturate(1.1)",
          }}
        >
          {/* Animated Streaming Window Bars */}
          <div className="w-[32%] h-1.5 rounded-full bg-white/75 mb-1" />
          <motion.div
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
            className="w-full h-5 rounded-md shadow-xs"
            style={{
              background: "linear-gradient(90deg, rgba(255,240,253,.75), rgba(255,170,242,.78) 42%, rgba(255,108,235,.82))",
            }}
          />
          <div className="w-[85%] h-2 rounded-full bg-white/60 mt-1" />
        </motion.div>
      </div>

      {/* Central LED Metric Readout */}
      <div className="relative z-[5] flex items-baseline justify-center gap-1.5 pt-[22%]">
        <div className="h-10 sm:h-12 flex items-center">
          <LedText text="2.4" dotRadius={2.32} pitchX={5} pitchY={4} color="#FFFFFF" glow />
        </div>
        <span className="text-2xl sm:text-[30.6px] font-normal tracking-tight text-white/95 translate-y-1">
          M
        </span>
      </div>

      {/* Caption */}
      <div className="relative z-[5] text-center px-8">
        <p className="text-sm sm:text-[18px] text-white/90 leading-[1.4] font-normal drop-shadow-[0_1px_2px_rgba(60,21,35,0.16)]">
          Tokens processed <br />
          simultaneously
        </p>
      </div>

      {/* Magnetic CTA Button */}
      <div className="relative z-[6] pb-[7.5%] flex justify-center">
        <MagneticButton
          href="#capabilities"
          aria-label="Explore context window technical architecture"
          className="h-[44px] px-7 rounded-full bg-white text-[#2d2d2d] font-medium text-xs sm:text-sm tracking-tight shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_3px_rgba(58,25,39,0.08)] hover:shadow-[0_8px_20px_rgba(58,25,39,0.22)] transition-shadow duration-200"
        >
          <span>Learn More</span>
        </MagneticButton>
      </div>
    </motion.article>
  );
}
