module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        "media-blue": "#C4E2FF",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(280px, 1fr))",
      },
    },
  },
  plugins: [],
};
