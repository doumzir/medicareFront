/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/components/**/*.{js,ts,jsx,tsx}',
    './app/routes/**/*.{js,ts,jsx,tsx}',
    './app/lib/**/*.{js,ts,jsx,tsx}',
    './app/welcome/**/*.{js,ts,jsx,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0E7ACA',
        secondary: '#FFCD4D',
      },
    },
  },
  plugins: [],
}; 