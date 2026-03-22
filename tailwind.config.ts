import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        background: '#0B0F14',
        foreground: '#F8FAFC',
        muted: '#111827',
        card: 'rgba(15, 23, 42, 0.65)',
        border: 'rgba(148, 163, 184, 0.15)',
        primary: '#0EA5E9',
        accent: '#8B5CF6',
        success: '#10B981',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-space-grotesk)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
        glow: 'radial-gradient(circle at top, rgba(14,165,233,0.2), transparent 45%), radial-gradient(circle at bottom right, rgba(139,92,246,0.18), transparent 35%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(14,165,233,0.2), 0 20px 60px rgba(2, 132, 199, 0.12)',
      },
      animation: {
        pulsegrid: 'pulsegrid 6s ease-in-out infinite',
      },
      keyframes: {
        pulsegrid: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
