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
            background: "#ffffff",
            foreground: "#151515",
            primary: {
              DEFAULT: "#81667A",
              foreground: "#151515",
            },
          },
        },
        dark: {
          colors: {
            background: "#151515",
            foreground: "#ffffff",
            primary: {
              DEFAULT: "#81667A",
              foreground: "#151515",
            },
          },
        },
      },
    }),
  ],
};
