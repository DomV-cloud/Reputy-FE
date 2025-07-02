/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#8BC34A", // např. světle zelená
          dark: "#43A047",
          light: "#DCEDC8",
        },
        secondary: {
          DEFAULT: "#4CAF50", // sytější zelená
          dark: "#388E3C",
          light: "#C8E6C9",
        },
        accent: "#FFB300", // např. oranžová pro tlačítka
      },
    },
  },
  plugins: [],
};
