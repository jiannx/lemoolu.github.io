/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'pc': '640px',
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require('daisyui'),
  ],
  daisyui: {
    darkTheme: "dark",
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#D23669",
          secondary: "#F4D0B0",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          primary: "#D23669",
          secondary: "#F4D0B0",
        },
      },
    ],
  },
}

