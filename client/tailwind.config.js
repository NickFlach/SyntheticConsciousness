/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'consciousness-primary': '#00d4ff',
        'consciousness-secondary': '#ff00ff',
        'consciousness-tertiary': '#00ff88',
        'consciousness-bg': '#0a0a1a',
        'consciousness-surface': '#1a1a2e',
        'consciousness-border': '#2a2a4e',
      },
    },
  },
  plugins: [],
}
