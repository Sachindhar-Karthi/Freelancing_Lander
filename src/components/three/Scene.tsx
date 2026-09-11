"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Particles } from "./Particles";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function CameraRig() {
  const { camera } = useThree();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Cinematic camera movement based on scroll
      gsap.to(camera.position, {
        z: 8,
        y: -1.5,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
      
      gsap.to(camera.rotation, {
        x: 0.15,
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
  }, [camera]);

  useFrame((state) => {
    // Subtle mouse parallax
    state.camera.position.x += (state.pointer.x * 0.3 - state.camera.position.x) * 0.03;
    state.camera.position.y += (state.pointer.y * 0.3 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

function ModularCore() {
  const groupRef = useRef<THREE.Group>(null);
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      outerMeshRef.current.rotation.y += 0.003;
    }
    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y -= 0.006;
      coreMeshRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, 0, -4]}>
        {/* Outer Matte Frost Shell */}
        <mesh ref={outerMeshRef} scale={2.2}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial 
            color="#E8EEF5"
            metalness={0.1}
            roughness={0.3}
            wireframe={true}
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Central Vibrant Focal Core */}
        <mesh ref={coreMeshRef} scale={1.1}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial 
            color="#98F238"
            emissive="#496F16"
            emissiveIntensity={0.2}
            metalness={0.2}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Translucent Ring */}
        <mesh position={[0, 0, 0]} scale={1.6}>
          <torusGeometry args={[1.2, 0.04, 16, 60]} />
          <meshStandardMaterial
            color="#DCE6F0"
            metalness={0.3}
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
  const [isVisible, setIsVisible] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Detect WebGL support
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // 2. Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // 3. Tab visibility listener
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 4. Scroll listener to pause rendering when scrolled past hero / top area
    const handleScroll = () => {
      if (window.scrollY > 1400) {
        setIsVisible(false);
      } else if (!document.hidden) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
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
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: "high-performance", precision: "mediump" }}
        frameloop={isVisible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <CameraRig />
          {/* Soft Studio Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 15, 10]} intensity={1.2} color="#FFFFFF" />
          <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#E8F5EE" />
          <pointLight position={[0, 0, 2]} intensity={0.5} color="#98F238" />
          
          <ModularCore />
          <Particles count={isMobile ? 120 : 400} />
        </Suspense>
      </Canvas>
    </div>
  );
}
