/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#2563eb',
            600: '#1d4ed8',
            700: '#003580',
            800: '#002a6b',
            900: '#001d4a',
          },
          saffron: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            300: '#fdba74',
            400: '#fb923c',
            500: '#FF9933',
            600: '#ea580c',
            700: '#c2410c',
          },
          green: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            400: '#34d399',
            500: '#138808',
            600: '#059669',
            700: '#047857',
          },
          cream: '#FFFDF7',
          warm: '#FFF8F0',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['Noto Sans', 'Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'gov-md': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'gov-lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        DEFAULT: '6px',
        'md': '8px',
        'lg': '12px',
      }
    },
  },
  plugins: [],
}
