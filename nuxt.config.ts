import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  components: [
    {
      //Aqui jugaríamos con los prefijos de una ruta dada
      path: '~/components',
      pathPrefix: false
    },
    {
      path: '~/components/my-ui-library',
      prefix: 'X'
    }
  ],
  modules: [
    'nuxt-icon'
  ],
  runtimeConfig: {
    apiSecret: 'abc123.',
    public: {
      apiBase: 'http://localhost:8000'
    }
  }
})
