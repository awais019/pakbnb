import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./composables/**/*.{js,ts}",
    "./plugins/**/*.{js,ts}",
    "./App.{js,ts,vue}",
    "./app.{js,ts,vue}",
    "./Error.{js,ts,vue}",
    "./error.{js,ts,vue}",
    "./content/**/*.md",
  ],
  theme: {
    screens: {
      "4xl": "1920px",
    },
    extend: {
      colors: {
        primary: "#FF5C23",
        secondary: "#181818",
      },
      fontFamily: {
        sans: ["Lato", defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "4xl": "1920px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        custom:
          "0px 14px 43px rgba(0, 0, 0, 0.12), 0px 1.75302px 29.8928px rgba(0, 0, 0, 0.06)",
      },
    },
  },
};
