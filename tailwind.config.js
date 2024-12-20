/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height:{
        '100': '800px',
      },
      maxHeight:{
        'xm': '448px'
      },
      maxWidth: {
        'xsm': '400px',
        'xm': '37.5rem',
        'sxl': '800px',
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
        '4xl': '3rem'
      },
      colors: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
}
