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
        primary: "#181818",
        secondary: "#FF5C23",
      },
      fontFamily: {
        sans: ["Lato", defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "4xl": "1920px",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
};
