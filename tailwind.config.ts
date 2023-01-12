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
        "secondary-light": "#F6F8FB",
        "athens-gray": "#F3F4F6",
        mischka: "#D1D5DB",
      },
      fontFamily: {
        sans: ["Lato", defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "2xl": "1280px",
        "4xl": "1920px",
      },
      width: {
        "30%": "30%",
        "70%": "70%",
      },
      minHeight: {
        "80vh": "80vh",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      borderWidth: {
        "1": "1px",
      },
      boxShadow: {
        xl: "0px 100px 80px rgba(0, 0, 0, 0.07), 0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198), 0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275), 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035), 0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725), 0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802)",
        custom:
          "0px 14px 43px rgba(0, 0, 0, 0.12), 0px 1.75302px 29.8928px rgba(0, 0, 0, 0.06)",
      },
      backgroundImage: {
        "minus-icon": "url('assets/images/icons/minus.svg')",
        "plus-icon": "url('assets/images/icons/plus.svg')",
        "location-icon": "url('assets/images/icons/location.svg')",
        "arrows-expand-icon": "url('assets/images/icons/arrows-expand.svg')",
        "arrows-shrink-icon": "url('assets/images/icons/arrows-shrink.svg')",
        "checked-icon": "url('assets/images/icons/checked.svg')",
        marker: "url('assets/images/icons/marker.svg')",
      },
      gridTemplateColumns: {
        "2": "1fr 5fr",
      },
    },
  },
};
