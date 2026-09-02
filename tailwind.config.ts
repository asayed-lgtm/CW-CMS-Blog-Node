import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,mdx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        paper: "#fafaf9",
        accent: "#2563eb"
      },
      typography: {}
    }
  },
  plugins: []
};

export default config;
