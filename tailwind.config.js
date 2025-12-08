// tailwind.config.js
module.exports = {
  darkMode: "class",
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(4px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.22s ease-out",
      },
      boxShadow: {
        neon: "0 0 35px rgba(52, 211, 235, 0.35)", // cyan glow
        "neon-purple": "0 0 35px rgba(129, 140, 248, 0.35)", // indigo glow
      },
    },
  },
  plugins: [],
};
