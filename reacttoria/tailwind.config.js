/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sophisticated neutral palette
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Baseball green accents
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Dark theme colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          850: '#1a202c',
          900: '#0f172a',
          950: '#020617',
        },
        // Cubs colorway (landing page only)
        cubs: {
          50: '#eef3ff',
          100: '#d9e4ff',
          200: '#bccfff',
          300: '#8db0ff',
          400: '#5a8bfa',
          500: '#3468f0',
          600: '#1a4fd4',
          700: '#163fac',
          800: '#14358d',
          900: '#0E3386',
        },
        cubsred: {
          50: '#fff4f4',
          100: '#ffe1e1',
          200: '#ffc8c8',
          300: '#ffa1a1',
          400: '#ff6b6b',
          500: '#f04444',
          600: '#CC3433',
          700: '#ab2424',
          800: '#8c2020',
          900: '#741f1f',
        },
        // Enhanced MLB team colors
        mlb: {
          red: '#d50032',
          blue: '#003831',
          navy: '#13294b',
          gold: '#fdb827',
          green: '#005c5c',
          orange: '#ff6b35',
          brown: '#8b4513',
          gray: '#6c757d',
        },
        // Rich navy accents (classic baseball)
        navy: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['"Big Shoulders Display"', 'system-ui', 'sans-serif'],
        chicago: ['"Big Shoulders Text"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'landing-fade-up': 'landingFadeUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) both',
        'landing-fade-in': 'landingFadeIn 1.1s ease-out both',
        'landing-shine': 'landingShine 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        landingFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        landingFadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        landingShine: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.65' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}