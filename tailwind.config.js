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
        'merriweather': 'Merriweather, Helvetica, Arial, serif',
      },
      colors: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
}
