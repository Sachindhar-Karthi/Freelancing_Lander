"use client";

import { useEffect, useState } from "react";
import { WifiOff, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function OfflineProvider({ children }: { children: React.ReactNode }) {
  const [isOffline, setIsOffline] = useState(false);
  const [showRestored, setShowRestored] = useState(false);

  useEffect(() => {
    // Check initial online status
    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);

      const handleOffline = () => {
        setIsOffline(true);
        setShowRestored(false);
      };

      const handleOnline = () => {
        setIsOffline(false);
        setShowRestored(true);
        const timer = setTimeout(() => setShowRestored(false), 3000);
        return () => clearTimeout(timer);
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111827] text-[#F8F9F6] border border-[#354154] shadow-xl text-xs font-mono"
            role="status"
            aria-live="polite"
          >
            <span className="w-2 h-2 rounded-full bg-[#98F238] animate-pulse" />
            <WifiOff className="w-4 h-4 text-[#DCE6F0]" />
            <div>
              <p className="font-semibold text-[#FFFFFF]">Offline Mode Active</p>
              <p className="text-[#DCE6F0]/70 text-[11px]">Running cached application shell</p>
            </div>
          </motion.div>
        )}

        {showRestored && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#E8FFD0] text-[#496F16] border border-[#98F238]/40 shadow-lg text-xs font-mono"
            role="status"
          >
            <CheckCircle2 className="w-4 h-4 text-[#496F16]" />
            <span className="font-semibold">Connection Restored</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
