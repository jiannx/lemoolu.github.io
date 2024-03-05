/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    screens: {
      // 'sm': '640px',
      // 'md': '768px',
      'pc': '768px',
      // 'lg': '1024px',
      // 'xl': '1280px',
      // '2xl': '1536px',
    },
    colors: {
      primary: "rgb(var(--rgb-primary) / <alpha-value>)",
      secondary: "rgb(var(--rgb-secondary) / <alpha-value>)",
      contrast: 'rgb(var(--rgb-contrast) / <alpha-value>)',
      white: 'rgb(var(--rgb-white) / <alpha-value>)',
      gray: 'rgb(var(--rgb-gray) / <alpha-value>)',
      dark: 'rgb(var(--rgb-dark) / <alpha-value>)',
      black: 'rgb(var(--rgb-black) / <alpha-value>)',
      transparent: 'transparent',
      current: 'currentColor',
    },
    extend: {},
  },
  darkMode: 'selector',
  plugins: [],
}
