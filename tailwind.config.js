/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,vue,ts}",
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.{js,vue,ts}",
    "./pages/**/*.{js,vue,ts}",
    "./plugins/**/*.{js,vue,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef6ff",
          100: "#d9ecff",
          200: "#bfe0ff",
          300: "#93caff",
          400: "#5dafff",
          500: "#338dff",
          600: "#1f6fff",
          700: "#1b59e6",
          800: "#1a49b3",
          900: "#183e8f",
        },
      },
    },
  },
  plugins: [],
};
