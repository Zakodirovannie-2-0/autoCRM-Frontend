/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'xm': '37.5rem',
      },
      backgroundImage: {
        'main-bg': "url('src/assets/background.png')"
      },
      fontFamily: {
        'golos': 'Golos Text, sans-serif',
        'mont': 'Montserrat, sans-serif',
      },
      fontSize: {
        '3.5xl': '2rem',
      },
      colors: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
}
