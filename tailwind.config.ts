import { type Config } from "tailwindcss";

export default {
  darkMode: ["class", "[data-theme='dark']"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;
