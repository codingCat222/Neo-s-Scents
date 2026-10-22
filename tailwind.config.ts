import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: { 50: "#FAF7FE", 100: "#F5F0FC", 200: "#E6D9F6", 300: "#D3BDEE", 400: "#B995E0", 500: "#9B6BE8" },
        plum: { DEFAULT: "#4A2878", dark: "#2B1450", soft: "#6B5A85" },
        gold: { DEFAULT: "#B8964E", soft: "#E3D3A8" },
      },
      fontFamily: { serif: ["var(--font-sans)", "system-ui", "sans-serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
      boxShadow: { soft: "0 10px 40px -12px rgba(74,40,120,.22)" },
    },
  },
  plugins: [],
};
export default config;