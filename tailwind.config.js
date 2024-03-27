const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FAF5F0",
            foreground: "#262322",
            primary: {
              DEFAULT: "#C97D60",
              foreground: "#262322",
            },
          },
        },
        dark: {
          colors: {
            background: "#262322",
            foreground: "#F2E5D7",
            primary: {
              DEFAULT: "#C97D60",
              foreground: "#262322",
            },
          },
        },
      },
    }),
  ],
};
