import type { Config } from "tailwindcss";
const config = {
  darkMode: "selector",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "0.5rem",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
} satisfies Config;

export default config;
