import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 80px rgba(59, 130, 246, 0.35)",
        violetGlow: "0 0 80px rgba(139, 92, 246, 0.32)",
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.25) 1px, transparent 0)",
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        orbit: "orbit 18s linear infinite",
        shimmer: "shimmer 4s linear infinite",
        pulseSoft: "pulseSoft 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(2deg)" },
        },
        orbit: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
