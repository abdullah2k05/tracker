
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        romantic: {
          purple: {
            50: "#f3e5f5",
            100: "#e1bee7",
            200: "#d1c4e9",
            300: "#d6a2e8",
            400: "#9b59b6",
            500: "#8e44ad",
            DEFAULT: "#8e44ad",
          },
          text: "#4a148c", // Darker purple for better contrast
          glass: "rgba(255, 255, 255, 0.15)",
          glassBorder: "rgba(214, 162, 232, 0.4)", // tinted border
        },
      },
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui"],
        heading: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "romantic-gradient": "linear-gradient(to bottom right, #f3e5f5, #e1bee7, #d1c4e9)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        blob: "blob 10s infinite",
        shimmer: "shimmer 3s linear infinite",
        pulse: "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-subtle": "bounce-subtle 0.3s ease-in-out",
        "glow-purple": "glow-purple 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(5deg)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(40px, -60px) scale(1.15)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
        "glow-purple": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(155, 89, 182, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(155, 89, 182, 0.6)" },
        },
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
export default config;
