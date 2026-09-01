/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        formal: {
          navy: {
            50: '#f1f5f9',
            100: '#e2e8f0',
            200: '#cbd5e1',
            300: '#94a3b8',
            400: '#64748b',
            500: '#475569',
            600: '#334155',
            700: '#1e293b',
            800: '#112238', // Formal Ministry Indigo
            850: '#0c1829', // Card Panel Slate
            900: '#070e18', // Primary Deep Base
            950: '#040810',
          },
          saffron: {
            light: '#fbbf24',
            DEFAULT: '#d97706', // Formal Muted Saffron
            dark: '#b45309',
            deep: '#92400e',
          },
          terracotta: {
            light: '#f43f5e',
            DEFAULT: '#be123c', // Formal Muted Crimson/Rose
            dark: '#9f1239',
          },
          emerald: {
            light: '#10b981',
            DEFAULT: '#047857', // Official India Green
            dark: '#065f46',
          },
          parchment: {
            DEFAULT: '#f8fafc',
            dark: '#0f172a',
            border: '#1e293b',
          }
        }
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Merriweather', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'formal-sm': '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px -1px rgba(0, 0, 0, 0.5)',
        'formal': '0 4px 12px 0 rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.07)',
        'formal-elevated': '0 10px 25px -3px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(217, 119, 6, 0.25)',
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      }
    },
  },
  plugins: [],
}
