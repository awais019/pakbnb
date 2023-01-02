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
    [
      "@nuxtjs/algolia",
      {
        applicationId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
      },
    ],
  ],
  plugins: ["~/plugins/clickOutside.ts", "~/plugins/homes.ts"],
  runtimeConfig: {
    public: {
      mapbox: {
        accessToken: process.env.MAPBOX_ACCESS_TOKEN,
      },
    },
  },
});
