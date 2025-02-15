/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Scan all files inside `app/`
    "./pages/**/*.{js,ts,jsx,tsx}", // If using `pages/` directory
    "./components/**/*.{js,ts,jsx,tsx}", // If you have a `components/` folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
