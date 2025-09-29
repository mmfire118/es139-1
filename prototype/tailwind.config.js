/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        reddit: {
          orange: '#ff4500',
          blue: '#0079d3',
          dark: '#1a1a1b',
          gray: '#878a8c',
          lightgray: '#f6f7f8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
  darkMode: 'class'
} 