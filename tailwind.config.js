/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#2d4a7a',
          700: '#1e3a5f',
          800: '#162d4a',
          900: '#0f1e33',
          950: '#080f1a',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        brand: {
          primary:   '#1e3a5f',
          secondary: '#f59e0b',
          accent:    '#0ea5e9',
          light:     '#f0f7ff',
          dark:      '#0f1e33',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.svg')",
        'gradient-brand': 'linear-gradient(135deg, #1e3a5f 0%, #2d5f8e 50%, #1e3a5f 100%)',
        'gradient-gold':  'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
      },
      boxShadow: {
        card:    '0 4px 24px rgba(30, 58, 95, 0.08)',
        'card-hover': '0 8px 40px rgba(30, 58, 95, 0.16)',
        cta:     '0 8px 32px rgba(245, 158, 11, 0.35)',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease-out forwards',
        'fade-in':   'fadeIn 0.4s ease-out forwards',
        'slide-in':  'slideIn 0.5s ease-out forwards',
        'pulse-slow':'pulse 3s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideIn: {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
