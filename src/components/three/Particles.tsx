"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesProps {
  count?: number;
}

interface ParticleData {
  t: number;
  factor: number;
  speed: number;
  xFactor: number;
  yFactor: number;
  zFactor: number;
  mx: number;
  my: number;
}

/**
 * Deterministic pseudo-random particle generator
 * Ensures render purity for React 19 while generating natural spatial distributions.
 */
function createParticles(count: number): ParticleData[] {
  const temp: ParticleData[] = [];
  for (let i = 0; i < count; i++) {
    const p1 = Math.abs((Math.sin(i * 12.9898 + 78.233) * 43758.5453) % 1);
    const p2 = Math.abs((Math.sin(i * 39.346 + 11.135) * 43758.5453) % 1);
    const p3 = Math.abs((Math.sin(i * 73.156 + 54.321) * 43758.5453) % 1);
    const p4 = Math.abs((Math.sin(i * 91.734 + 23.456) * 43758.5453) % 1);
    const p5 = Math.abs((Math.sin(i * 105.31 + 67.891) * 43758.5453) % 1);

    const t = p1 * 100;
    const factor = 15 + p2 * 60;
    const speed = 0.005 + p3 / 300;
    const xFactor = -35 + p4 * 70;
    const yFactor = -35 + p5 * 70;
    const zFactor = -35 + ((p1 + p2) % 1) * 70;
    temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
  }
  return temp;
}

export function Particles({ count = 350 }: ParticlesProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const lastUpdateRef = useRef(0);
  const particlesRef = useRef<ParticleData[]>([]);

  // Synchronize simulation buffer outside of render cycle
  useEffect(() => {
    particlesRef.current = createParticles(count);
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current || !mesh.current.visible) return;

    if (particlesRef.current.length === 0) {
      particlesRef.current = createParticles(count);
    }

    // Throttle particle matrix calculation to ~60 FPS (16ms)
    // Avoids redundant calculations on 120Hz/144Hz high-refresh displays
    lastUpdateRef.current += delta;
    if (lastUpdateRef.current < 0.016) return;
    lastUpdateRef.current = 0;

    const particles = particlesRef.current;
    const len = particles.length;

    for (let i = 0; i < len; i++) {
      const particle = particles[i];
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      particle.t += speed / 2;
      const t = particle.t;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t) * 0.7;

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 3, s * 3, s * 3);
      dummy.updateMatrix();

      mesh.current.setMatrixAt(i, dummy.matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.12, 0]} />
      <meshBasicMaterial color="#354154" transparent opacity={0.06} />
    </instancedMesh>
  );
}
