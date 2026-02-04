import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base dark theme
        'cho': {
          'midnight': '#080B14',
          'deep': '#0D1117',
          'slate': '#161B22',
          'steel': '#21262D',
          'muted': '#30363D',
        },
        // Conglomerate (replaces hub)
        'conglomerate': {
          DEFAULT: '#E879F7',
          light: '#F0ABFC',
          dark: '#C026D3',
          glow: 'rgba(232, 121, 247, 0.5)',
        },
        // Keep hub as alias for any missed references
        'hub': {
          DEFAULT: '#E879F7',
          light: '#F0ABFC',
          dark: '#C026D3',
          glow: 'rgba(232, 121, 247, 0.5)',
        },
        'real-estate': {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
          glow: 'rgba(59, 130, 246, 0.4)',
        },
        'regenerative': {
          DEFAULT: '#14B8A6',
          light: '#2DD4BF',
          dark: '#0D9488',
          glow: 'rgba(20, 184, 166, 0.4)',
        },
        'authority': {
          DEFAULT: '#0EA5E9',
          light: '#38BDF8',
          dark: '#0284C7',
          glow: 'rgba(14, 165, 233, 0.4)',
        },
        'philanthropy': {
          DEFAULT: '#6366F1',
          light: '#818CF8',
          dark: '#4F46E5',
          glow: 'rgba(99, 102, 241, 0.4)',
        },
        'development': {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
          glow: 'rgba(245, 158, 11, 0.4)',
        },
        'ai-layer': {
          DEFAULT: '#818CF8',
          light: '#A5B4FC',
          dark: '#6366F1',
          glow: 'rgba(129, 140, 248, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-sm': '0 0 12px -2px var(--tw-shadow-color)',
        'glow': '0 0 20px -4px var(--tw-shadow-color)',
        'glow-lg': '0 0 32px -4px var(--tw-shadow-color)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'spin-slow': 'spin 30s linear infinite',
        'ai-pulse': 'aiPulse 3s ease-in-out infinite',
        'ai-flow': 'aiFlow 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        aiPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        aiFlow: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
