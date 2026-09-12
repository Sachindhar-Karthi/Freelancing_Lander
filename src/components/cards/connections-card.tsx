"use client";

import React, { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { LedText } from "@/components/ui/led-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { MOTION_EASE } from "@/lib/motion";

// Exact node coordinates mapped from relay_1.txt (viewBox 0 0 429 238)
const NODE_COORDS = [
  { x: (45 / 429) * 4 - 2, y: -(117 / 238) * 2.2 + 1.1, z: 0, color: "#ffffff" },
  { x: (133 / 429) * 4 - 2, y: -(61 / 238) * 2.2 + 1.1, z: 0, color: "#fff4a7" },
  { x: (189 / 429) * 4 - 2, y: -(61 / 238) * 2.2 + 1.1, z: 0, color: "#fff1a4" },
  { x: (319 / 429) * 4 - 2, y: -(61 / 238) * 2.2 + 1.1, z: 0, color: "#fff4a6" },
  { x: (319 / 429) * 4 - 2, y: -(117 / 238) * 2.2 + 1.1, z: 0, color: "#fff2a0" },
];

function InteractiveInstancedNodes() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const clockRef = useRef(0);

  // Initialize color on instances
  useMemo(() => {
    // prepare matrix buffers
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    clockRef.current += delta;
    const t = clockRef.current;

    NODE_COORDS.forEach((node, i) => {
      // 120hz smooth pulsing equation
      const pulseScale = 0.12 + Math.sin(t * 3.5 + i * 1.2) * 0.035;
      dummy.position.set(node.x, node.y, node.z);
      dummy.scale.set(pulseScale, pulseScale, pulseScale);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, NODE_COORDS.length]}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color="#fff4a7"
        emissive="#ff9234"
        emissiveIntensity={0.6}
        roughness={0.1}
      />
    </instancedMesh>
  );
}

export function ConnectionsCard() {
  const cardBackground = `
    radial-gradient(ellipse 54% 14% at 56% 0%, rgba(255,206,190,.16), transparent 76%),
    radial-gradient(ellipse 38% 24% at 102% 8%, rgba(255,190,164,.24), transparent 75%),
    radial-gradient(ellipse 28% 24% at -5% 66%, rgba(255,192,174,.30), transparent 74%),
    radial-gradient(ellipse 46% 30% at 104% 32%, rgba(255,146,52,.42), transparent 74%),
    radial-gradient(ellipse 80% 36% at 62% 57%, rgba(255,141,36,.62), transparent 72%),
    radial-gradient(ellipse 58% 30% at 6% 103%, rgba(199,49,45,.38), transparent 76%),
    radial-gradient(ellipse 60% 32% at 97% 101%, rgba(190,40,44,.42), transparent 76%),
    linear-gradient(177deg, #d84736 0%, #dd523c 24%, #e8703d 52%, #de5641 78%, #d34239 100%)
  `;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.76, ease: MOTION_EASE, delay: 0.35 }}
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
          background: `linear-gradient(102deg, rgba(255,255,255,.07), transparent 30%, rgba(255,255,255,.05) 62%, transparent 88%),
                       radial-gradient(ellipse 84% 26% at 54% 4%, rgba(255,255,255,.11), transparent 74%)`,
        }}
      />

      {/* Card Header Title */}
      <div className="relative z-[4] pt-[6.3%] px-6 text-center">
        <h3 className="text-xl sm:text-[23px] font-semibold text-white tracking-normal leading-[1.48] drop-shadow-[0_1px_1px_rgba(72,28,48,0.14)]">
          Intelligent Connections <br />
          <span className="font-normal opacity-95">Cross-Source Context</span>
        </h3>
      </div>

      {/* Node Map Container: Background SVG Network Curves + R3F Instanced Pulsing Nodes */}
      <div className="absolute top-[21%] left-0 w-full h-[43%] z-[3] pointer-events-none overflow-hidden">
        {/* Vector Network Track Paths */}
        <svg
          viewBox="0 0 429 238"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full opacity-80"
          style={{
            maskImage: "linear-gradient(180deg, #000 0%, #000 50%, rgba(0,0,0,.46) 67%, rgba(0,0,0,.15) 83%, transparent 96%)",
            WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 50%, rgba(0,0,0,.46) 67%, rgba(0,0,0,.15) 83%, transparent 96%)",
          }}
        >
          {/* White and warm connection tracks */}
          <path
            d="M0 5H128c27 0 36 7 39 26 2 16 9 22 24 22h106c16 0 23-8 25-25 2-16 10-23 31-23h76"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.25"
          />
          <path
            d="M0 117h46c15 0 22 8 26 25 5 23 12 31 31 31h174c18 0 25-8 30-31 4-17 11-25 26-25h96"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.32"
          />
          <path
            d="M0 173h87c15 0 22 7 27 25 4 15 11 22 28 22h140c17 0 25-7 29-22 5-18 12-25 28-25h90"
            fill="none"
            stroke="white"
            strokeWidth="1"
            opacity="0.36"
          />
          {/* Primary Warm Highlighting Tracks */}
          <path
            d="M0 61h95c14 0 22-6 27-20 4-13 12-20 27-20h115c15 0 23 6 27 20 5 14 13 20 28 20h110"
            fill="none"
            stroke="#fff8dd"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <path
            d="M0 117h88c15 0 22-8 25-25 4-24 12-31 31-31h129c20 0 27 7 31 31 3 17 10 25 26 25h99"
            fill="none"
            stroke="#fff8dd"
            strokeWidth="1.2"
            opacity="0.9"
          />
        </svg>

        {/* 120hz R3F Instanced Mesh Pulsing Nodes */}
        <Canvas
          camera={{ position: [0, 0, 3], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true }}
          className="w-full h-full"
        >
          <ambientLight intensity={1.2} />
          <pointLight position={[0, 0, 2]} intensity={2.0} color="#fff4a7" />
          <InteractiveInstancedNodes />
        </Canvas>
      </div>

      {/* Central LED Metric Readout */}
      <div className="relative z-[5] flex items-baseline justify-center gap-1.5 pt-[22%]">
        <div className="h-10 sm:h-12 flex items-center">
          <LedText text="16" dotRadius={2.05} pitchX={5} pitchY={4} color="#FFFFFF" glow />
        </div>
        <span className="text-2xl sm:text-[30.6px] font-normal tracking-tight text-white/95 translate-y-1">
          K
        </span>
      </div>

      {/* Caption */}
      <div className="relative z-[5] text-center px-8">
        <p className="text-sm sm:text-[18px] text-white/90 leading-[1.4] font-normal drop-shadow-[0_1px_2px_rgba(60,21,35,0.16)]">
          Connected data <br />
          sources
        </p>
      </div>

      {/* Magnetic CTA Button */}
      <div className="relative z-[6] pb-[7.5%] flex justify-center">
        <MagneticButton
          href="#capabilities"
          aria-label="Explore cross-source intelligent connections architecture"
          className="h-[44px] px-7 rounded-full bg-white text-[#2d2d2d] font-medium text-xs sm:text-sm tracking-tight shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_3px_rgba(58,25,39,0.08)] hover:shadow-[0_8px_20px_rgba(58,25,39,0.22)] transition-shadow duration-200"
        >
          <span>Learn More</span>
        </MagneticButton>
      </div>
    </motion.article>
  );
}
