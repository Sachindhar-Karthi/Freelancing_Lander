"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Particles } from "./Particles";
import { FluidTerrain } from "./FluidTerrain";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { usePrefersReducedMotion } from "@/lib/motion";

function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  const scrollTarget = useRef({ y: 0, z: 5.5, rotX: 0 });
  
  useEffect(() => {
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Cinematic camera movement based on scroll mapped to target values
      // Eliminates race conditions between GSAP and useFrame pointer parallax
      gsap.to(scrollTarget.current, {
        z: 8,
        y: -1.5,
        rotX: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  useFrame((state) => {
    // When prefers-reduced-motion is active, lock camera to neutral resting position
    // with zero pointer parallax or scroll zooming
    if (reducedMotion) {
      state.camera.position.x += (0 - state.camera.position.x) * 0.08;
      state.camera.position.y += (0 - state.camera.position.y) * 0.08;
      state.camera.position.z += (5.5 - state.camera.position.z) * 0.08;
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // Smooth lerp camera with combined scroll kinematics and subtle pointer parallax
    const targetX = state.pointer.x * 0.28;
    const targetY = scrollTarget.current.y + state.pointer.y * 0.22;
    const targetZ = scrollTarget.current.z;

    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function ModularCore({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);
  const { viewport } = useThree();
  
  // Responsive offset for 2-column layout. When on large screens, move to left half.
  const isDesktop = viewport.width > 6;
  const targetX = isDesktop ? -viewport.width * 0.25 : 0;

  useFrame((_, delta) => {
    // Guard against delta spikes during tab reactivation
    const safeDelta = Math.min(delta, 0.05);
    timeRef.current += safeDelta;
    const t = timeRef.current;

    // Halt continuous orbital rotation when reduced motion is preferred
    if (!reducedMotion) {
      if (outerMeshRef.current) {
        outerMeshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
        outerMeshRef.current.rotation.y += 0.003;
      }
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y -= 0.006;
        coreMeshRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
      }
    }

    if (groupRef.current) {
      // Smoothly interpolate position for responsiveness
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
    }
  });

  return (
    <Float 
      speed={reducedMotion ? 0 : 1.8} 
      rotationIntensity={reducedMotion ? 0 : 0.4} 
      floatIntensity={reducedMotion ? 0 : 0.8}
    >
      <group ref={groupRef} position={[0, 0, -5]}>
        {/* Outer Matte Frost Shell */}
        <mesh ref={outerMeshRef} scale={2.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#FFFFFF"
            metalness={0.1}
            roughness={0.1}
            wireframe={true}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Central Vibrant Focal Core */}
        <mesh ref={coreMeshRef} scale={1.4}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#98F238"
            emissive="#5F921D"
            emissiveIntensity={0.4}
            metalness={0.3}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Translucent Ring */}
        <mesh position={[0, 0, 0]} scale={2.0}>
          <torusGeometry args={[1.2, 0.02, 16, 60]} />
          <meshStandardMaterial
            color="#98F238"
            metalness={0.4}
            roughness={0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function Scene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const [isVisible, setIsVisible] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Memoize stable Canvas configuration objects to prevent Canvas reconciler churn
  const cameraConfig = useMemo(() => ({ position: [0, 0, 5.5] as [number, number, number], fov: 45 }), []);
  const glConfig = useMemo(() => ({
    alpha: true,
    antialias: typeof window !== "undefined" ? window.innerWidth >= 768 : true,
    powerPreference: "high-performance" as const,
    precision: "mediump" as const,
  }), []);

  useEffect(() => {
    // 1. Detect WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        requestAnimationFrame(() => setHasWebGL(false));
      }
    } catch {
      requestAnimationFrame(() => setHasWebGL(false));
    }

    // State-guarded visibility updater: avoids dispatching React re-renders unless value changes
    const updateVisibility = (visible: boolean) => {
      if (isVisibleRef.current !== visible) {
        isVisibleRef.current = visible;
        setIsVisible(visible);
      }
    };

    // 2. Debounced mobile viewport check
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const checkMobile = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile((prev) => (prev !== mobile ? mobile : prev));
      }, 150);
    };
    window.addEventListener("resize", checkMobile);

    // 3. Tab visibility listener
    const handleVisibilityChange = () => {
      const active = !document.hidden && window.scrollY <= 1400;
      updateVisibility(active);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 4. Scroll listener to pause rendering when scrolled past hero / top area
    const handleScroll = () => {
      const active = !document.hidden && window.scrollY <= 1400;
      updateVisibility(active);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener("resize", checkMobile);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // WebGL Disabled / Unsupported Fallback
  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 z-[-1] pointer-events-none bg-[var(--background)] flex items-center justify-center">
        <div className="w-96 h-96 rounded-full border border-[var(--border)] opacity-20 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-[var(--accent-soft)] opacity-40 blur-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] pointer-events-none bg-[var(--background)] transition-colors duration-200">
      <Canvas
        camera={cameraConfig}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={glConfig}
        frameloop={isVisible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <CameraRig reducedMotion={reducedMotion} />
          {/* Soft Studio Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 15, 10]} intensity={1.4} color="#FFFFFF" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#E8F5EE" />
          <pointLight position={[0, 0, 2]} intensity={0.6} color="#98F238" />
          
          {/* Fluid Abstract Terrain Shader reacting to cursor */}
          <FluidTerrain />

          <ModularCore reducedMotion={reducedMotion} />
          <Particles count={isMobile ? 120 : 350} />
        </Suspense>
      </Canvas>
    </div>
  );
}
