/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: "#ad2524",
        secondary: '#faa21b',
        dark:'#010202'
      }
    }
  },
  plugins: [],
}

