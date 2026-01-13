'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Sparkles, Network } from 'lucide-react';

const EcosystemMap = dynamic(() => import('@/components/EcosystemMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-hub/15 border border-hub/25 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-hub-light animate-pulse" />
        </div>
        <p className="text-white/30 text-xs">Loading...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setShowIntro(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-cho-midnight">
      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 bg-cho-midnight flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mb-6"
              >
                <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-hub/20 blur-2xl" />
                <div className="relative w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-hub/25 to-hub/10 border border-hub/40 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                  <Sparkles className="w-10 h-10 text-hub-light" />
                </div>
              </motion.div>

              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Cho Ventures
              </motion.h1>

              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
                className="text-sm text-white/40"
              >
                Ecosystem Intelligence
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-1.5 mt-6"
              >
                {['bg-hub', 'bg-real-estate', 'bg-regenerative', 'bg-authority', 'bg-philanthropy'].map((color, i) => (
                  <div
                    key={color}
                    className={`w-1 h-1 rounded-full ${color} animate-pulse`}
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimal Header */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: showIntro ? 2.2 : 0 }}
        className="absolute top-0 left-0 right-0 z-40"
      >
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-hub/20 to-hub/10 border border-hub/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-hub-light" />
            </div>
            <span className="text-sm font-medium text-white/90">Cho Ventures</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cho-slate/50 border border-cho-steel/30">
              <Network className="w-3 h-3 text-white/40" />
              <span className="text-[11px] text-white/50">12 Entities</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: showIntro ? 2.4 : 0.1 }}
        className="w-full h-full pt-14"
      >
        {isLoaded && <EcosystemMap />}
      </motion.div>
    </main>
  );
}
