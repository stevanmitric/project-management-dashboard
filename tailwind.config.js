/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      margin: {
        5: '5px', // Adding 55px margin
      },
      colors: {
        'dark-navy': '#001529',
      },
    },
  },
  plugins: [],
};
