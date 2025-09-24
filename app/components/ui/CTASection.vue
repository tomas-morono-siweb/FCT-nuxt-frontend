<script setup lang="ts">
interface Action {
  text: string;
  to: string;
  variant: "primary" | "secondary";
  icon?: string;
}

interface Props {
  title: string;
  subtitle: string;
  actions: Action[];
}

const props = defineProps<Props>();

const iconPaths = {
  plus: "M12 4v16m8-8H4",
  building:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
};
</script>

<template>
  <div class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
    <div class="absolute inset-0 bg-black/20"/>
    <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">{{ title }}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-blue-100">{{ subtitle }}</p>
        <div class="mt-10 flex justify-center">
          <div class="flex flex-col gap-4 sm:flex-row">
            <NuxtLink
              v-for="action in actions"
              :key="action.text"
              :to="action.to"
              :class="
                action.variant === 'primary'
                  ? 'inline-flex items-center rounded-lg bg-white px-8 py-3 font-medium text-blue-600 shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl'
                  : 'inline-flex items-center rounded-lg border-2 border-white px-8 py-3 font-medium text-white transition-all duration-200 hover:bg-white hover:text-blue-600'
              "
            >
              <svg
                v-if="action.icon"
                class="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="iconPaths[action.icon]"
                />
              </svg>
              {{ action.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
