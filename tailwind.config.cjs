 /** @type {import('tailwindcss').Config} */
module.exports = {
  purge:{
  enabled:false,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]},
  theme: {
    extend: {
    },
  },
  plugins: [],
}