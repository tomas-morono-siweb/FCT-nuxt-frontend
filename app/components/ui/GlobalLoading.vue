<script setup lang="ts">
interface Props {
  loading: boolean;
  message?: string;
}

const props = withDefaults(defineProps<Props>(), {
  message: "Cargando...",
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="loading"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <div class="mx-4 max-w-sm rounded-xl bg-white p-8 shadow-2xl">
          <!-- Spinner animado -->
          <div class="mb-4 flex justify-center">
            <div class="relative">
              <!-- Círculo exterior -->
              <div class="border-secondary-200 h-12 w-12 rounded-full border-4"></div>
              <!-- Círculo animado -->
              <div
                class="border-t-primary-500 absolute top-0 left-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent"
              ></div>
            </div>
          </div>

          <!-- Mensaje -->
          <div class="text-center">
            <h3 class="text-secondary-800 mb-2 text-lg font-semibold">
              {{ message }}
            </h3>
            <p class="text-secondary-600 text-sm">Por favor espera un momento...</p>
          </div>

          <!-- Barra de progreso animada -->
          <div class="mt-6">
            <div class="bg-secondary-200 h-2 w-full rounded-full">
              <div class="from-primary-500 to-primary-600 h-2 animate-pulse rounded-full bg-gradient-to-r"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
