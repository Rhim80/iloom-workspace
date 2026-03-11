import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#c80a1e",
          "red-light": "#fdf2f2",
        },
        iloom: {
          text: "#333333",
          secondary: "#999999",
          border: "#E8E8E8",
          "border-light": "#F0F0F0",
          bg: "#F8F8F8",
          warm: "#FAFAF8",
          beige: "#F5F3F0",
        },
        status: {
          up: "#4A9B7F",
          down: "#c80a1e",
        },
      },
      fontFamily: {
        sans: ['"Noto Sans KR"', "sans-serif"],
        display: ["Montserrat", '"Noto Sans KR"', "sans-serif"],
      },
      fontSize: {
        "h1": ["32px", { lineHeight: "1.3", fontWeight: "700" }],
        "h2": ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "h3": ["18px", { lineHeight: "1.5", fontWeight: "500" }],
        "body": ["16px", { lineHeight: "1.6", letterSpacing: "-0.2px" }],
        "label": ["14px", { lineHeight: "1.5" }],
        "price": ["20px", { lineHeight: "1.3", fontWeight: "700" }],
        "small": ["12px", { lineHeight: "1.5" }],
      },
      spacing: {
        "section": "32px",
        "card-gap": "16px",
        "chart-gap": "24px",
      },
    },
  },
  plugins: [tailwindAnimate],
};
export default config;
