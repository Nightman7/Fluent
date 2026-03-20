/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#ffffff",
        "space-grey": "#000000",
        "dark-grey": "#0a0a0a",
        "light-text": "#ffffff",
        "bitcoin-orange": "#ffffff",
        "spike-blue": "#ffffff",
        "border-gray": "#222222",
        "text-gray": "#888888",
        "text-light-gray": "#aaaaaa",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        none: "0",
        sm: "4px",
      },
    },
  },
  plugins: [],
};
