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
        <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
        <p
          v-if="description"
          class="mt-2 text-sm text-gray-600"
        >
          {{ description }}
        </p>
      </div>
      <NuxtLink
        v-if="actionText && actionTo"
        :to="actionTo"
        class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
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
