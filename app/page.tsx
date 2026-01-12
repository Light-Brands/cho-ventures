'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Sparkles, Layers, Network, Cpu, ChevronRight } from 'lucide-react';

// Dynamic import for ReactFlow (needs to be client-side only)
const EcosystemMap = dynamic(() => import('@/components/EcosystemMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-hub/20 border border-hub/30 flex items-center justify-center animate-pulse">
          <Sparkles className="w-8 h-8 text-hub" />
        </div>
        <p className="text-white/40 text-sm">Loading ecosystem...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
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
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 bg-cho-midnight flex items-center justify-center"
          >
            <div className="text-center">
              {/* Animated logo */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative mb-8"
              >
                {/* Glow rings */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0.3] }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                  className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-hub/20 blur-xl"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [0.8, 1.4, 1.2], opacity: [0, 0.3, 0.2] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-real-estate/20 blur-2xl"
                />

                <div className="relative w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-hub/30 to-hub/10 border-2 border-hub/50 flex items-center justify-center shadow-[0_0_60px_rgba(236,72,153,0.4)]">
                  <Sparkles className="w-14 h-14 text-hub-light" />
                </div>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl font-bold text-white mb-3"
              >
                Cho Ventures
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-white/50 mb-8"
              >
                AI-Powered Regenerative Ecosystem
              </motion.p>

              {/* Loading indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-2 text-white/30"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-hub animate-pulse" />
                <div className="w-1.5 h-1.5 rounded-full bg-real-estate animate-pulse delay-100" />
                <div className="w-1.5 h-1.5 rounded-full bg-regenerative animate-pulse delay-200" />
                <div className="w-1.5 h-1.5 rounded-full bg-authority animate-pulse delay-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-philanthropy animate-pulse delay-400" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: showIntro ? 3 : 0 }}
        className="absolute top-0 left-0 right-0 z-40"
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-hub/30 to-hub/10 border border-hub/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-hub-light" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Cho Ventures</h1>
              <p className="text-xs text-white/40">Ecosystem Intelligence</p>
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex items-center gap-3">
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-real-estate" />
              <span className="text-sm text-white/70">12 Entities</span>
            </div>
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
              <Network className="w-4 h-4 text-regenerative" />
              <span className="text-sm text-white/70">24 Connections</span>
            </div>
            <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-hub" />
              <span className="text-sm text-white/70">AI-Powered</span>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-hub to-hub-dark text-white font-medium text-sm shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-shadow"
          >
            Explore Ecosystem
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: showIntro ? 3.2 : 0.2 }}
        className="w-full h-full pt-20"
      >
        {isLoaded && <EcosystemMap />}
      </motion.div>

      {/* Floating help text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: showIntro ? 3.5 : 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
      >
        <div className="glass rounded-full px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-xs">Click</span>
            </div>
            <span>on any entity to explore details</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-sm text-white/50">
            <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-xs">Drag</span>
            </div>
            <span>to pan around the ecosystem</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2 text-sm text-white/50">
            <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-xs">Scroll</span>
            </div>
            <span>to zoom in/out</span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
