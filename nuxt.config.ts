// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/icon"],
  css: ["~/assets/css/main.css"],


  runtimeConfig: {
    public: {
      laravelBaseUrl: (process.env.LARAVEL_BASE_URL || 'http://localhost:8000') as string
    }
  },
});
