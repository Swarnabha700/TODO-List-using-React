/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl': '5px 15px 50px -5px rgb(51, 0, 102)',
      }
    },
  },
  plugins: [],
}
