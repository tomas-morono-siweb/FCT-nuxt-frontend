import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  // ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      devSourcemap: true,
    },
    build: {
      sourcemap: true,
    },
    logLevel: 'warn',
    define: {
      __VUE_PROD_DEVTOOLS__: false,
    },
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
  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils/module",
    "nuxt-auth-utils",
  ],
  runtimeConfig: {
    apiSecret: "process.env.API_KEY",
    public: {
      apiBase: "process.env.API_BASE_URL",
    },
  },
});