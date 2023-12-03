/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      md: { max: "767px" },
      sm: { max: "639px" },
    }
  },
  plugins: [require("@tailwindcss/typography")],

};
