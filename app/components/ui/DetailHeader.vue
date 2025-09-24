<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  avatarText: string;
  avatarColor: "blue" | "green" | "purple";
  badges?: Array<{
    text: string;
    color: "blue" | "green" | "purple" | "gray";
  }>;
  editTo?: string;
  backTo?: string;
}

const props = defineProps<Props>();

const avatarClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
};

const badgeClasses = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  gray: "bg-gray-100 text-gray-800",
};
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
      <div class="flex gap-3">
        <NuxtLink
          v-if="editTo"
          :to="editTo"
          class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
        >
          <svg
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
          Editar
        </NuxtLink>
        <NuxtLink
          v-if="backTo"
          :to="backTo"
          class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50"
        >
          <svg
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
          Volver
        </NuxtLink>
      </div>
    </div>
  </div>

  <!-- Entity Header Card -->
  <UiDataCard
    :color="avatarColor"
    class="mb-6"
  >
    <div class="flex items-center space-x-6">
      <div class="h-20 w-20 flex-shrink-0">
        <div :class="`flex h-20 w-20 items-center justify-center rounded-full ${avatarClasses[avatarColor]}`">
          <span class="text-2xl font-bold">{{ avatarText }}</span>
        </div>
      </div>
      <div class="min-w-0 flex-1">
        <h2 class="text-3xl font-bold text-gray-900">
          <slot name="title" />
        </h2>
        <div
          v-if="badges && badges.length > 0"
          class="mt-2 flex flex-wrap gap-3"
        >
          <span
            v-for="badge in badges"
            :key="badge.text"
            :class="`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeClasses[badge.color]}`"
          >
            {{ badge.text }}
          </span>
        </div>
      </div>
    </div>
  </UiDataCard>
</template>
