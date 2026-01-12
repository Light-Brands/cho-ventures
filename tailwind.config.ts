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
        // Cho Ventures Primary - Sophisticated dark theme with regenerative accents
        'cho': {
          'midnight': '#0A0F1C',
          'deep': '#111827',
          'slate': '#1E293B',
          'steel': '#334155',
        },
        // Entity Category Colors
        'real-estate': {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#1D4ED8',
          glow: 'rgba(59, 130, 246, 0.4)',
        },
        'regenerative': {
          DEFAULT: '#10B981',
          light: '#34D399',
          dark: '#059669',
          glow: 'rgba(16, 185, 129, 0.4)',
        },
        'authority': {
          DEFAULT: '#F59E0B',
          light: '#FBBF24',
          dark: '#D97706',
          glow: 'rgba(245, 158, 11, 0.4)',
        },
        'philanthropy': {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#7C3AED',
          glow: 'rgba(139, 92, 246, 0.4)',
        },
        'hub': {
          DEFAULT: '#EC4899',
          light: '#F472B6',
          dark: '#DB2777',
          glow: 'rgba(236, 72, 153, 0.5)',
        },
        // Accent colors
        'accent': {
          'cyan': '#06B6D4',
          'rose': '#F43F5E',
          'amber': '#F59E0B',
          'emerald': '#10B981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['4rem', { lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '-0.01em' }],
        'h2': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'xs': ['0.75rem', { lineHeight: '1.4' }],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px var(--tw-shadow-color)',
        'glow': '0 0 25px -5px var(--tw-shadow-color)',
        'glow-lg': '0 0 40px -5px var(--tw-shadow-color)',
        'glow-xl': '0 0 60px -10px var(--tw-shadow-color)',
        'inner-glow': 'inset 0 0 20px -5px var(--tw-shadow-color)',
        'card': '0 4px 20px -5px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 30px -5px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'spin-slow': 'spin 20s linear infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            opacity: '0.4',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '0.8',
            transform: 'scale(1.05)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(at 40% 20%, hsla(228, 83%, 66%, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(190, 90%, 50%, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(330, 80%, 50%, 0.1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(140, 80%, 50%, 0.1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(270, 80%, 50%, 0.1) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;
