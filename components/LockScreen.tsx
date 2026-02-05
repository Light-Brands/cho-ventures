'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Lock, Delete } from 'lucide-react';

const CORRECT_PIN = '7788';

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

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleDigit = useCallback((digit: string) => {
    if (pin.length >= 4 || success) return;

    const newPin = pin + digit;
    setPin(newPin);
    setError(false);

    if (newPin.length === 4) {
      if (newPin === CORRECT_PIN) {
        setSuccess(true);
        setTimeout(() => {
          onUnlock();
        }, 600);
      } else {
        setError(true);
        setTimeout(() => {
          setPin('');
          setError(false);
        }, 500);
      }
    }
  }, [pin, success, onUnlock]);

  const handleDelete = useCallback(() => {
    if (success) return;
    setPin(prev => prev.slice(0, -1));
    setError(false);
  }, [success]);

  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-cho-midnight flex flex-col items-center justify-center"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-radial from-hub/5 via-transparent to-transparent opacity-50" />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative flex flex-col items-center gap-8"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <Image
            src="/logo.png"
            alt="Cho Ventures"
            width={180}
            height={54}
            className="opacity-90"
            priority
          />
          <FlickeringText text="COMMAND CENTER" delay={0.3} />
        </motion.div>

        {/* Lock Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4, type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-cho-slate/50 border border-cho-steel/30"
        >
          <Lock className="w-6 h-6 text-white/40" />
        </motion.div>

        {/* PIN Dots */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: error ? [1, 1.2, 1] : success && pin.length === 4 ? [1, 1.3, 1] : 1,
                backgroundColor: error
                  ? 'rgb(239 68 68)'
                  : success && pin.length === 4
                    ? 'rgb(34 197 94)'
                    : index < pin.length
                      ? 'rgb(168 85 247)'
                      : 'rgba(255 255 255 / 0.1)',
              }}
              transition={{ duration: 0.15 }}
              className={`w-3.5 h-3.5 rounded-full border transition-colors ${
                error
                  ? 'border-red-500'
                  : success && pin.length === 4
                    ? 'border-green-500'
                    : index < pin.length
                      ? 'border-hub shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                      : 'border-cho-steel/50'
              }`}
            />
          ))}
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[11px] text-red-400 font-medium tracking-wide"
            >
              Incorrect PIN
            </motion.p>
          )}
        </AnimatePresence>

        {/* PIN Pad */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-3 gap-3"
        >
          {digits.map((digit, index) => {
            if (digit === '') {
              return <div key={index} className="w-16 h-16" />;
            }

            if (digit === 'del') {
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  disabled={pin.length === 0 || success}
                  className="w-16 h-16 rounded-xl bg-cho-slate/30 border border-cho-steel/30 flex items-center justify-center text-white/40 hover:text-white/60 hover:bg-cho-slate/50 hover:border-cho-steel/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Delete className="w-5 h-5" />
                </motion.button>
              );
            }

            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleDigit(digit)}
                disabled={success}
                className="w-16 h-16 rounded-xl bg-cho-slate/30 border border-cho-steel/30 flex items-center justify-center text-lg font-medium text-white/70 hover:text-white hover:bg-cho-slate/50 hover:border-hub/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {digit}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-[10px] text-white/20 tracking-wider uppercase"
        >
          Enter PIN to access
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
