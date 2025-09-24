import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

export default createConfigForNuxt({
  features: {
    // Enable TypeScript support
    typescript: true,
    // Enable Vue support
    vue: true,
    // Enable Tailwind CSS support
    tailwindcss: true,
    // Enable Nuxt specific rules
    nuxt: true,
  },
  dirs: {
    // Only lint these directories
    src: ["app"],
    public: ["public"],
    server: ["server"],
  },
});
