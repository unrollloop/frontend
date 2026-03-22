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
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-strong': 'rgb(var(--surface-strong) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        'subtle-foreground': 'rgb(var(--subtle-foreground) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-space-grotesk)'],
        mono: ['var(--font-jetbrains-mono)'],
      },
      backgroundImage: {
        grid: 'linear-gradient(rgb(var(--grid) / 0.18) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--grid) / 0.18) 1px, transparent 1px)',
        glow: 'radial-gradient(circle at top, rgb(var(--primary) / 0.16), transparent 45%), radial-gradient(circle at bottom right, rgb(var(--accent) / 0.14), transparent 35%)',
      },
      boxShadow: {
        glow: '0 0 0 1px rgb(var(--primary) / 0.18), 0 20px 60px rgb(var(--primary) / 0.14)',
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
