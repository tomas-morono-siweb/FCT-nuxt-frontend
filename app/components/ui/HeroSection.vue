<script setup lang="ts">
interface Props {
  title: string;
  subtitle: string;
  primaryAction?: {
    text: string;
    to: string;
    icon?: string;
  };
  secondaryAction?: {
    text: string;
    to: string;
    icon?: string;
  };
}

const props = defineProps<Props>();
</script>

<template>
  <div class="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-green-600">
    <div class="absolute inset-0 bg-black/20"/>
    <div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{{ title }}</h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg text-blue-100 sm:text-xl">{{ subtitle }}</p>
        <div class="mt-10 flex justify-center">
          <div class="flex flex-col gap-4 sm:flex-row">
            <NuxtLink
              v-if="primaryAction"
              :to="primaryAction.to"
              class="inline-flex items-center rounded-lg bg-white px-6 py-3 font-medium text-blue-600 shadow-lg transition-all duration-200 hover:bg-blue-50 hover:shadow-xl"
            >
              <svg
                v-if="primaryAction.icon === 'users'"
                class="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <svg
                v-else-if="primaryAction.icon === 'check'"
                class="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ primaryAction.text }}
            </NuxtLink>
            <NuxtLink
              v-if="secondaryAction"
              :to="secondaryAction.to"
              class="inline-flex items-center rounded-lg border-2 border-white px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <svg
                v-if="secondaryAction.icon === 'check'"
                class="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ secondaryAction.text }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="absolute right-0 -bottom-1 left-0 h-12 bg-gray-50"/>
  </div>
</template>
