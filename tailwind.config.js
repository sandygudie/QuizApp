/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(0deg 84% 60%)",
        secondary: "hsl(220deg 26% 14%)",
        "light-secondary": "hsl(218deg 21% 22%)",
        tourquise: "hsl(171deg 47% 63%)",
        dark: "hsl(0deg 0% 0%)",
        white: "hsl(0deg 0% 100%)",
        red: "hsl(0deg 100% 50%)",
        green: "hsl(120deg 100% 25%)",
        "slate-500": "rgb(100 116 139)",
        "slate-400": "rgb(148 163 184)",
      },
      // screens: {
      //   sm: "200px",
      //   md: "500px",
      //   lg: "700px",
      //   xl: "1280px",
      // },
      translate: {
        "2/4": "-50%",
      },

      fontFamily: {
        cursive: "cursive, sans-serif",
      },
      boxShadow: {
        "3xl":
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
      },
    },
  },
  plugins: [],
};
