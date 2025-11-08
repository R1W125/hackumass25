/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-primary': '#1a1a2e',
        'game-secondary': '#2d2d44',
        'game-accent': '#4d4d73',
      },
    },
  },
  plugins: [],
}