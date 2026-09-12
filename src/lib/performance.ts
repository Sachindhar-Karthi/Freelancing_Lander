"use client";

import { useEffect, useState } from "react";

export type PerformanceTier = "ultra" | "high" | "low";

interface PerformanceStats {
  fps: number;
  delta: number;
  tier: PerformanceTier;
  isHighRefresh: boolean;
}

/**
 * 120 FPS requestAnimationFrame delta profiler
 * Dynamically scales WebGL fidelity & heavy visual layers based on hardware capability
 */
class PerformanceProfiler {
  private static instance: PerformanceProfiler;
  private lastTime = 0;
  private frameDeltas: number[] = [];
  private maxSamples = 60;
  private listeners: Set<(stats: PerformanceStats) => void> = new Set();
  private currentStats: PerformanceStats = {
    fps: 60,
    delta: 16.6,
    tier: "high",
    isHighRefresh: false,
  };
  private isRunning = false;
  private rafId: number | null = null;

  private constructor() {}

  static getInstance(): PerformanceProfiler {
    if (!PerformanceProfiler.instance) {
      PerformanceProfiler.instance = new PerformanceProfiler();
    }
    return PerformanceProfiler.instance;
  }

  start() {
    if (this.isRunning || typeof window === "undefined") return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.tick(this.lastTime);
  }

  stop() {
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  subscribe(listener: (stats: PerformanceStats) => void): () => void {
    this.listeners.add(listener);
    listener(this.currentStats);
    if (this.listeners.size === 1) {
      this.start();
    }
    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0) {
        this.stop();
      }
    };
  }

  private tick = (now: number) => {
    if (!this.isRunning) return;

    const delta = now - this.lastTime;
    this.lastTime = now;

    if (delta > 0 && delta < 150) {
      this.frameDeltas.push(delta);
      if (this.frameDeltas.length > this.maxSamples) {
        this.frameDeltas.shift();
      }

      const avgDelta = this.frameDeltas.reduce((a, b) => a + b, 0) / this.frameDeltas.length;
      const fps = Math.round(1000 / avgDelta);

      // Evaluate display & hardware tier:
      // ~8.3ms = 120hz (ultra)
      // ~16.6ms = 60hz (high)
      // >24ms = struggling low-end (low tier - drop heavy blur & noise)
      let tier: PerformanceTier = "high";
      const isHighRefresh = fps >= 90 || avgDelta < 11;

      if (isHighRefresh) {
        tier = "ultra";
      } else if (fps < 45 || avgDelta > 22) {
        tier = "low";
      } else {
        tier = "high";
      }

      this.currentStats = { fps, delta, tier, isHighRefresh };

      // Notify subscribers periodically
      if (this.frameDeltas.length % 15 === 0) {
        this.listeners.forEach((fn) => fn(this.currentStats));
      }
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  getStats(): PerformanceStats {
    return this.currentStats;
  }
}

export function usePerformanceTier(): PerformanceStats {
  const [stats, setStats] = useState<PerformanceStats>(() => {
    return typeof window !== "undefined"
      ? PerformanceProfiler.getInstance().getStats()
      : { fps: 60, delta: 16.6, tier: "high", isHighRefresh: false };
  });

  useEffect(() => {
    const profiler = PerformanceProfiler.getInstance();
    const unsubscribe = profiler.subscribe((newStats) => {
      setStats(newStats);
    });
    return unsubscribe;
  }, []);

  return stats;
}
