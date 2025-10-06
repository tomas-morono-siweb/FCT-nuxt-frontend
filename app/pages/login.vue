<script setup lang="ts">
definePageMeta({
  layout: 'blank'
})

const { login } = useAuth();

const user = reactive({
  email: "",
  password: "",
});

const error = ref<string | null>(null);

async function handleLogin() {
  try {
    await login(user.email, user.password);
    await navigateTo(process.env.API_BASE_URL);
  } catch {
    error.value = "Credenciales inválidas. Por favor, inténtalo de nuevo.";
  }
}
</script>

<template>
  <section class="bg-gray-50">
    <div class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <a
        href="#"
        class="mb-6 flex items-center text-2xl font-semibold text-gray-900"
      >
      <!-- <img
          class="mr-2 h-8 w-8"          
          src="../../public/favicon-32x32.png"
          alt="⚽"
        > -->
        ⚽ ClubManager
      </a>
      <div
        class="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0"
      >
        <div class="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 class="text-xl leading-tight font-bold tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>

          <form
            class="space-y-4 md:space-y-6"
            @submit.prevent="handleLogin"
          >
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-900">
                Correo electrónico
                <input
                  id="email"
                  v-model="user.email"
                  type="email"
                  name="email"
                  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  placeholder="tunombre@dominio.com"
                  required
                >
              </label>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-900">
                Contraseña
                <input
                  id="password"
                  v-model="user.password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  required
                >
              </label>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-3"
                    required
                  >
                </div>

                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    class="text-gray-500"
                  >
                    Recordarme
                  </label>
                </div>
              </div>
              <a
                href="#"
                class="text-primary-600 text-sm font-medium hover:underline"
              >
                Olvidaste la contraseña?
              </a>
            </div>

            <button
              type="submit"
              class="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-500">
              Todavía no tienes una cuenta?
              <a
                href="#"
                class="text-primary-600 font-medium hover:underline"
              >
                Regístrate
              </a>
            </p>
            <p v-if="error">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
