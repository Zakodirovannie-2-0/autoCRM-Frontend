/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'merriweather': 'Merriweather, Helvetica, Arial, serif',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
      },
    },
  },
  plugins: [],
}
