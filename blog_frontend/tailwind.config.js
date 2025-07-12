/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        float: {
          '0%':   { transform: 'translateY(0) rotate(0deg)' },
          '50%':  { transform: 'translateY(-35px) rotate(5deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
};
