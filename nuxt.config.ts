// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/icon", "@pinia/nuxt"],
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  } as any,
  // routeRules: {
  //   '/**': { appMiddleware: ['auth'] }, // Apply to all routes
  //   '/login': { appMiddleware: [] }, // Exclude login page
  // },
  ui: {
    colorMode: false,
  },
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    public: {
      laravelBaseUrl: (process.env.LARAVEL_BASE_URL ||
        "http://localhost:8000") as string,
      nuxtBaseUrl: (process.env.FRONTEND_URL ||
        "http://localhost:3000") as string,
    },
  },
});
