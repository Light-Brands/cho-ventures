'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Network, Box, FileText } from 'lucide-react';
import Link from 'next/link';
import LockScreen from '@/components/LockScreen';

// Flickering code-style text reveal component
function FlickeringText({ text, delay = 0 }: { text: string; delay?: number }) {
  const chars = text.split('');

  return (
    <div className="flex items-center justify-center">
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block font-mono text-[10px] text-white/30 tracking-[0.4em] uppercase"
          initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.8 }}
          animate={{
            opacity: [0, 0.3, 0.9, 0.4, 1, 0.7, 1],
            filter: ['blur(4px)', 'blur(2px)', 'blur(0px)', 'blur(1px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
            scale: [0.8, 1.1, 0.95, 1.05, 1],
          }}
          transition={{
            duration: 0.9,
            delay: delay + index * 0.06,
            times: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
            ease: 'easeOut',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  );
}

const EcosystemMap = dynamic(() => import('@/components/EcosystemMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <Image
          src="/logo.png"
          alt="Cho Ventures"
          width={200}
          height={60}
          className="opacity-80"
          priority
        />
        <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/30 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <FlickeringText text="COMMAND CENTER" delay={0.5} />
      </motion.div>
    </div>
  ),
});

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [showIntro, setShowIntro] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!isLocked) {
      setIsLoaded(true);
      const timer = setTimeout(() => setShowIntro(false), 2200);
      return () => clearTimeout(timer);
    }
  }, [isLocked]);

  const handleUnlock = () => {
    setIsLocked(false);
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-cho-midnight">
      {/* Lock Screen */}
      <AnimatePresence>
        {isLocked && <LockScreen onUnlock={handleUnlock} />}
      </AnimatePresence>

      {/* Intro Animation */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-50 bg-cho-midnight flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <Image
                src="/logo.png"
                alt="Cho Ventures"
                width={240}
                height={72}
                className="opacity-90"
                priority
              />
              <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/30 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              <FlickeringText text="COMMAND CENTER" delay={0.5} />
            </motion.div>
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
            <Image
              src="/logo.png"
              alt="Cho Ventures"
              width={120}
              height={36}
              className="opacity-90"
              priority
            />
          </div>

          {/* Stats & Version Toggle */}
          <div className="flex items-center gap-2">
            {/* Master Plan Link */}
            <Link
              href="/plan"
              className="flex items-center justify-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 hover:border-purple-500/50 hover:from-purple-500/30 hover:to-blue-500/30 transition-all group"
              title="Master Plan"
            >
              <FileText className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-purple-400 group-hover:text-purple-300" />
              <span className="hidden sm:inline text-[11px] text-purple-300 font-medium group-hover:text-purple-200">Master Plan</span>
            </Link>

            <div className="w-px h-4 bg-white/10" />

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cho-slate/50 border border-cho-steel/30">
              <Network className="w-3 h-3 text-white/40" />
              <span className="text-[11px] text-white/50">13 Entities</span>
            </div>

            {/* Toggle to 3D version */}
            <Link
              href="/v2"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-hub/20 border border-hub/30 hover:bg-hub/30 transition-colors"
            >
              <Box className="w-3 h-3 text-hub-light" />
              <span className="text-[11px] text-hub-light font-medium">3D</span>
            </Link>
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
