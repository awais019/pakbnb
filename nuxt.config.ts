// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    [
      "@nuxtjs/tailwindcss",
      {
        jit: true,
        cssPath: "~/assets/css/tailwind.css",
      },
    ],
  ],
  plugins: ["~/plugins/clickOutside.ts"],
  runtimeConfig: {
    public: {
      mapbox: {
        accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      },
    },
  },
});
