/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif']
      },
      colors: {
        softgreen: '#C5DCA0',      // main background
        lightgreen: '#EAEFD3',     // secondary
        accentgreen: '#A6D785',    // highlights
        income: '#16a34a',          // income green
        expense: '#ef4444',         // expense red
        savings: '#facc15',         // savings yellow/gold
      }
    }
  },
  plugins: []
}
