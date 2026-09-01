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
        census: {
          navy: {
            50: '#f0f4f8',
            100: '#d9e2ec',
            200: '#bcccdc',
            300: '#9fb3c8',
            400: '#829ab1',
            500: '#627d98',
            600: '#486581',
            700: '#334e68',
            800: '#102a43',
            900: '#0b192e',
            950: '#060d19',
          },
          saffron: {
            light: '#ffb366',
            DEFAULT: '#ff9933',
            dark: '#e67300',
          },
          green: {
            light: '#2ecc71',
            DEFAULT: '#138808',
            dark: '#0e6406',
          },
          ashoka: {
            DEFAULT: '#000080',
            light: '#1e40af',
          },
          gold: {
            DEFAULT: '#f59e0b',
            light: '#fde68a',
            dark: '#d97706',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
