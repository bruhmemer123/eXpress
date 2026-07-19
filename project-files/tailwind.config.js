/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: '"Poppins", "Inter", system-ui, sans-serif',
        body: '"Inter", system-ui, sans-serif',
      },
      animation: {
        scrollhint: "scrollhint 1.8s ease-in-out infinite",
      },
      keyframes: {
        scrollhint: {
          "0%, 100%": { transform: "scaleY(1)", opacity: "0.4" },
          "50%": { transform: "scaleY(1.4)", opacity: "1" },
        },
      },
      colors: {
        "express-purple": "#9b87f5",
        "color-bg": "#060509",
        "color-bg-soft": "#0b0a12",
        "color-purple": "#8b5cf6",
        "color-purple-light": "#c4b5fd",
        "color-purple-dim": "#6d28d9",
        "color-text": "#f4f2f8",
        "color-text-dim": "#a8a3b3",
        "color-border": "rgba(139, 92, 246, 0.55)",
        "color-border-soft": "rgba(139, 92, 246, 0.22)",
        // Shorthand aliases for convenience
        bg: "#060509",
        "bg-soft": "#0b0a12",
        text: "#f4f2f8",
        "text-dim": "#a8a3b3",
        "border-soft": "rgba(139, 92, 246, 0.22)",
        "purple-light": "#c4b5fd",
        "purple-dim": "#6d28d9",
      },
    },
  },
  plugins: [],
};
