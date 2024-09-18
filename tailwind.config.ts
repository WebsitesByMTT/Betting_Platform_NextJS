import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      flex: {
        '.1': '.1 .1 0%',
        '.2': '.2 .2 0%',
        '.3': '.3 .3 0%',
        '.4': '.4 .4 0%',
        '.5': '.5 .5 0%',
        '.6': '.6 .6 0%',
        '.7': '.7 .7 0%',
        '.8': '.8 .8 0%',
        '.9': '.9 .9 0%',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors:{
        primary:'#0E1013',
        secondary:'#1E1E1E'
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config