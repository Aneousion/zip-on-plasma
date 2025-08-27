import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#4a9b5f",
        secondary: "#5fb574",
        accent: "#00ff44",
        dark: "#0f0f0f",
        light: "#e7e9ea",
        muted: "#71767b",
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': {
            'box-shadow': '0 0 5px rgba(74, 155, 95, 0.2), 0 0 10px rgba(74, 155, 95, 0.2)',
          },
          'to': {
            'box-shadow': '0 0 10px rgba(0, 255, 68, 0.4), 0 0 20px rgba(0, 255, 68, 0.2)',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;