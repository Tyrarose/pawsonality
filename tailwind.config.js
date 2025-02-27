/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        odri: ['OdriHandwriting', 'sans-serif'], 
        gulfs: ['GulfsDisplay', 'sans-serif'], 
        lovelo: ['Lovelo', 'sans-serif'], 
      },
      colors: {  
        'brand-red': '#cb5365', 
        'brand-cards': '#faf4ea', 
        'brand-brown': '#5d3539',
      },    
    },
  },
  plugins: [],
}

