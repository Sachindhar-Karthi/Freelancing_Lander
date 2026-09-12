"use client";

/* eslint-disable react-hooks/immutability */
import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom GLSL Shader for Fluid Abstract Terrain (Navy/Orange Aesthetic)
const terrainVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  // Classic Perlin 2D Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    
    // Wave calculations with mouse influence
    vec2 pos = position.xy;
    float distToMouse = length(pos - uMouse * 3.5);
    float mouseWave = sin(distToMouse * 2.0 - uTime * 2.5) * exp(-distToMouse * 0.4) * 0.45;

    float wave1 = snoise(pos * 0.4 + vec2(uTime * 0.15, uTime * 0.12)) * 0.8;
    float wave2 = snoise(pos * 0.85 - vec2(uTime * 0.08, uTime * 0.18)) * 0.35;
    float wave3 = sin(pos.x * 0.6 + uTime * 0.5) * cos(pos.y * 0.6 + uTime * 0.4) * 0.25;

    float elevation = wave1 + wave2 + wave3 + mouseWave;
    vElevation = elevation;

    vec3 newPosition = position;
    newPosition.z += elevation * 0.95;

    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const terrainFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uDark;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    // Navy / Indigo depths from relay_2.txt
    vec3 deepNavy = vec3(0.04, 0.08, 0.18);
    vec3 midBlue  = vec3(0.09, 0.28, 0.55);
    
    // Warm Sunset Amber / Orange peaks from relay_2.txt
    vec3 warmAmber = vec3(0.96, 0.62, 0.26);
    vec3 brightOrange = vec3(1.0, 0.42, 0.10);
    vec3 softFrost = vec3(0.92, 0.96, 0.98);

    // Normalize elevation: -1.2 to 1.5
    float normElevation = smoothstep(-1.0, 1.4, vElevation);

    // Color gradient interpolation
    vec3 color = mix(deepNavy, midBlue, smoothstep(0.0, 0.5, normElevation));
    color = mix(color, warmAmber, smoothstep(0.45, 0.82, normElevation));
    color = mix(color, brightOrange, smoothstep(0.78, 1.0, normElevation));

    // Specular crest rim highlight
    float rim = pow(clamp(vElevation * 0.65 + 0.35, 0.0, 1.0), 3.0);
    color += softFrost * rim * 0.25;

    // Edge falloff vignette
    float edgeAlpha = smoothstep(0.0, 0.2, vUv.x) * smoothstep(1.0, 0.8, vUv.x) *
                      smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.8, vUv.y);

    // Slightly tone down opacity when in light mode for subtle painterly integration
    float alpha = edgeAlpha * (uDark > 0.5 ? 0.85 : 0.68);

    gl_FragColor = vec4(color, alpha);
  }
`;

export function FluidTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uDark: { value: 0 },
  }), []);

  // eslint-disable-next-line
  useFrame((_, delta) => {
    if (!meshRef.current) return;

    // Update uniform time with delta tracking
    uniforms.uTime.value += delta;

    // Smooth delta interpolation for mouse interaction at 120 FPS
    mouseSmooth.current.x += (pointer.x - mouseSmooth.current.x) * 0.08;
    mouseSmooth.current.y += (pointer.y - mouseSmooth.current.y) * 0.08;
    uniforms.uMouse.value.copy(mouseSmooth.current);

    // Check dark mode class on document element
    if (typeof document !== "undefined") {
      uniforms.uDark.value = document.documentElement.classList.contains("dark") ? 1.0 : 0.0;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI * 0.32, 0, 0]}
      position={[0, -1.8, -2.5]}
      scale={[1.8, 1.5, 1.2]}
    >
      <planeGeometry args={[12, 10, 80, 80]} />
      <shaderMaterial
        vertexShader={terrainVertexShader}
        fragmentShader={terrainFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        wireframe={false}
      />
    </mesh>
  );
}
