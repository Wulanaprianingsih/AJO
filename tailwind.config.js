/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "0px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1600px",
      portrait: { raw: "(orientation: portrait)" },
      landscape: { raw: "(orientation: landscape)" },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        interMedium: ["Inter", "sans-serif"],
        interSemiBold: ["Inter", "sans-serif"],
        interBold: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
