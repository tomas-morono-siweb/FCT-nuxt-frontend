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
    apiSecret: "abc123.",
    public: {
      apiBase: "http://localhost:8000",
    },
  },
});
