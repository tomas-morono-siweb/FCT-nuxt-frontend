<script setup lang="ts">
interface Feature {
  icon: string;
  title: string;
  description: string;
  color: "blue" | "green" | "purple" | "gray";
}

interface Props {
  title: string;
  subtitle: string;
  features: Feature[];
}

const props = defineProps<Props>();

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  gray: "bg-gray-100 text-gray-600",
};

const iconPaths = {
  lightning: "M13 10V3L4 14h7v7l9-11h-7z",
  shield:
    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  mobile: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
  heart:
    "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
};
</script>

<template>
  <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ title }}</h2>
      <p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600">{{ subtitle }}</p>
    </div>

    <div class="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="text-center"
      >
        <div :class="`mx-auto flex h-12 w-12 items-center justify-center rounded-lg ${colorClasses[feature.color]}`">
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="iconPaths[feature.icon]"
            />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-gray-900">{{ feature.title }}</h3>
        <p class="mt-2 text-sm text-gray-600">{{ feature.description }}</p>
      </div>
    </div>
  </div>
</template>
