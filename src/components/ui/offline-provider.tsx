"use client";

import { useEffect, useRef, useState } from "react";
import { WifiOff, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MOTION_EASE } from "@/lib/motion";

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const [showRestored, setShowRestored] = useState(false);
  const restoreTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check initial online status
    if (typeof window !== "undefined") {
      requestAnimationFrame(() => setIsOffline(!navigator.onLine));

      const handleOffline = () => {
        if (restoreTimerRef.current) {
          clearTimeout(restoreTimerRef.current);
          restoreTimerRef.current = null;
        }
        setIsOffline(true);
        setShowRestored(false);
      };

      const handleOnline = () => {
        if (restoreTimerRef.current) {
          clearTimeout(restoreTimerRef.current);
        }
        setIsOffline(false);
        setShowRestored(true);
        restoreTimerRef.current = setTimeout(() => {
          setShowRestored(false);
          restoreTimerRef.current = null;
        }, 3000);
      };

      window.addEventListener("offline", handleOffline);
      window.addEventListener("online", handleOnline);

      // Register Service Worker in production or supporting browsers
      if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("[SW] Registered with scope:", registration.scope);
          })
          .catch((err) => {
            console.warn("[SW] Registration failed:", err);
          });
      }

      return () => {
        if (restoreTimerRef.current) {
          clearTimeout(restoreTimerRef.current);
        }
        window.removeEventListener("offline", handleOffline);
        window.removeEventListener("online", handleOnline);
      };
    }
  }, []);

  return (
    <>
      {children}

      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.24, ease: MOTION_EASE }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto max-w-[calc(100vw-2rem)] sm:max-w-sm z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--surface-elevated)] text-[var(--foreground)] border border-[var(--border)] shadow-2xl text-xs font-mono backdrop-blur-md"
            role="status"
            aria-live="polite"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
            <WifiOff className="w-4 h-4 text-[var(--foreground-muted)] shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[var(--foreground)] truncate">Offline Mode Active</p>
              <p className="text-[var(--foreground-muted)] text-[11px] truncate">Running cached application shell</p>
            </div>
          </motion.div>
        )}

        {showRestored && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.24, ease: MOTION_EASE }}
            className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 left-4 sm:left-auto max-w-[calc(100vw-2rem)] sm:max-w-sm z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[var(--accent-soft)] text-[var(--foreground)] border border-[var(--border)] shadow-xl text-xs font-mono backdrop-blur-md"
            role="status"
          >
            <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span className="font-semibold text-[var(--foreground)]">Connection Restored</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
