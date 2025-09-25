<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  actionText?: string;
  actionTo?: string;
  actionIcon?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="mb-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-secondary-800 text-3xl font-bold">{{ title }}</h1>
        <p
          v-if="description"
          class="text-secondary-600 mt-2 text-sm"
        >
          {{ description }}
        </p>
      </div>
      <NuxtLink
        v-if="actionText && actionTo"
        :to="actionTo"
        class="from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 inline-flex items-center rounded-lg bg-gradient-to-r px-6 py-3 font-semibold shadow-lg transition-all duration-200 hover:shadow-xl"
      >
        <svg
          v-if="actionIcon === 'plus'"
          class="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <svg
          v-else-if="actionIcon === 'edit'"
          class="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <svg
          v-else-if="actionIcon === 'back'"
          class="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {{ actionText }}
      </NuxtLink>
    </div>
  </div>
</template>
