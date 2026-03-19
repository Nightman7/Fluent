/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#F2A900",
        "space-grey": "#0f1419",
        "dark-grey": "#1a1f2e",
        "light-text": "#e4e6eb",
        "bitcoin-orange": "#F2A900",
        "spike-blue": "#3b82f6",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "space-grotesk": ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        none: "0",
      },
    },
  },
  plugins: [],
};
