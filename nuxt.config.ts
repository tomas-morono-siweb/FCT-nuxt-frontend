import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  components: [
    {
      path: "~/components/ui",
      prefix: "Ui",
    },
    {
      path: "~/components/entities",
      prefix: "Entities",
    },
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  modules: ["@nuxt/eslint"],
  runtimeConfig: {
    apiSecret: "process.env.API_KEY",
    public: {
      apiBase: "process.env.API_BASE_URL",
    },
  },
});
