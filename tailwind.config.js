/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'travel-bg': '#fcfcfc',
        'travel-dark': '#1a1a1a',
      },
      letterSpacing: {
        'widest': '.25em',
      }
    },
  },
  plugins: [],
}
