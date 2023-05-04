/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0a7d95ba",
        active: "#21d0f5ba"
      },
      backgroundImage: {
        mainai: "url(../public/mainai.jpg)"
      }
    },
  },
  plugins: [],
};
