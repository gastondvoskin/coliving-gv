import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: "#f7f6f2",
        ink: "#1f2937",
        accent: "#0f766e",
        sand: "#e7dcc8"
      }
    }
  },
  plugins: []
};

export default config;
