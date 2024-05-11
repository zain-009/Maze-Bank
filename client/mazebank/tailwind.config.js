/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      red: "#ED3A3D",
      darkred: "#d81417",
      black: "#243142",
      white: "#f5f5f5",
      fullwhite: "#ffffff",
      grey: "#69777C",
      outer: "#3E4E50",
      smoke: "#F2F2F2",
      richblack: "#171D24",
      lightred: "#DFA4A6",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  plugins: [],
};
