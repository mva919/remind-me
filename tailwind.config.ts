import { type Config } from "tailwindcss";

export default {
  darkMode: ["class", "[data-theme='dark']"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
} satisfies Config;
