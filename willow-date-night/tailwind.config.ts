import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        willow: {
          green: "#00FFAA",
          dark: "#1A1A1A",
          gray: "#A0A0A0",
          white: "#FFFFFF",
          light: "#F8F9FA",
          "light-gray": "#E9ECEF",
          "dark-gray": "#495057",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        craftwork: ["Craftwork Grotesque", "Space Grotesk", "sans-serif"],
        sans: ["Craftwork Grotesque", "Space Grotesk", "sans-serif"],
      },
      fontWeight: {
        'craftwork-regular': '400',
        'craftwork-medium': '500',
        'craftwork-semibold': '600',
        'craftwork-bold': '700',
        'craftwork-heavy': '800',
      },
      animation: {
        "pulse-heart": "pulse-heart 1s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease",
        "spin": "spin 1s linear infinite",
        "pulse-recording": "pulse-recording 1s ease-in-out infinite",
      },
      keyframes: {
        "pulse-heart": {
          "0%, 100%": {
            transform: "scale(1)",
            opacity: "1",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.8",
          },
        },
        slideUp: {
          from: {
            transform: "translateX(-50%) translateY(100px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(-50%) translateY(0)",
            opacity: "1",
          },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "pulse-recording": {
          "0%, 100%": {
            backgroundColor: "#00FFAA",
          },
          "50%": {
            backgroundColor: "#ff4444",
          },
        },
      },
      boxShadow: {
        "willow": "0 10px 30px rgba(0, 0, 0, 0.3)",
        "willow-green": "0 5px 15px rgba(0, 255, 170, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;

