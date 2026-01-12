
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
          pink: {
            50: "#fff0f3",
            100: "#ffccd5",
            200: "#ffb3c1",
            300: "#ff8fa3",
            400: "#ff758f",
            500: "#ff4d6d",
            DEFAULT: "#ff4d6d",
          },
          lavender: {
            50: "#f3e8ff",
            100: "#e9d5ff",
            200: "#d8b4fe",
            300: "#c084fc",
            400: "#a855f7",
            DEFAULT: "#a855f7",
          },
          blue: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            DEFAULT: "#93c5fd",
          },
          text: "#4a4e69",
          glass: "rgba(255, 255, 255, 0.6)",
          glassBorder: "rgba(255, 255, 255, 0.8)",
        },
      },
      backgroundImage: {
        "romantic-gradient": "linear-gradient(to top right, #ffccd5, #e0c3fc, #dbeafe)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 7s infinite",
        shimmer: "shimmer 2s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
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
