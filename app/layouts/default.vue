<script setup lang="ts">
const { isLoading, loadingMessage } = useGlobalLoading();
const { logout } = useAuth();
</script>

<template>
  <div>
    <header class="border-secondary-200 sticky top-0 z-30 border-b bg-white/95 shadow-sm backdrop-blur">
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div class="flex items-center gap-3">
          <NuxtLink
            to="/"
            class="flex items-center gap-3"
          >
            <div
              class="from-primary-500 to-primary-600 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-md"
            >
              <!-- Icono de estrella deportiva -->
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
            </div>
            <span class="text-secondary-800 text-xl font-bold">Gestión Deportiva</span>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-2">
          <NuxtLink
            to="/players"
            class="text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            Jugadores
          </NuxtLink>
          <NuxtLink
            to="/coaches"
            class="text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            Entrenadores
          </NuxtLink>
          <NuxtLink
            to="/clubs"
            class="text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
          >
            Clubes
          </NuxtLink>
        </div>

        <div>
          <NuxtLink
          class="text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
          to="/login"
          @click="logout"
          >
            Cerrar sesión
          </NuxtLink>
        </div>
      </nav>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <slot />
    </main>

    <!-- Carga global -->
    <UiGlobalLoading
      :loading="isLoading"
      :message="loadingMessage"
    />
  </div>
</template>
