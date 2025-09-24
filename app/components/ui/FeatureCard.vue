<script setup lang="ts">
interface Props {
  title: string;
  description: string;
  icon: string;
  color: "blue" | "green" | "orange";
  linkTo: string;
  linkText: string;
}

const props = defineProps<Props>();

const colorClasses = {
  blue: {
    gradient: "from-blue-50 to-blue-100",
    icon: "bg-blue-100 group-hover:bg-blue-200",
    iconColor: "text-blue-600",
    link: "text-blue-600 hover:text-blue-900",
  },
  green: {
    gradient: "from-green-50 to-green-100",
    icon: "bg-green-100 group-hover:bg-green-200",
    iconColor: "text-green-600",
    link: "text-green-600 hover:text-green-900",
  },
  orange: {
    gradient: "from-orange-50 to-orange-100",
    icon: "bg-orange-100 group-hover:bg-orange-200",
    iconColor: "text-orange-600",
    link: "text-orange-600 hover:text-orange-900",
  },
};

const iconPaths = {
  users: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  check: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  building:
    "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
};
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <div
      :class="`absolute inset-0 bg-gradient-to-br ${colorClasses[color].gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`"
    />
    <div class="relative p-8">
      <div class="flex items-center">
        <div
          :class="`flex h-16 w-16 items-center justify-center rounded-full ${colorClasses[color].icon} transition-colors duration-300`"
        >
          <svg
            :class="`h-8 w-8 ${colorClasses[color].iconColor}`"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="iconPaths[icon]"
            />
          </svg>
        </div>
        <div class="ml-4">
          <h3 class="text-xl font-semibold text-gray-900">{{ title }}</h3>
        </div>
      </div>
      <p class="mt-4 text-gray-600">{{ description }}</p>
      <div class="mt-6">
        <NuxtLink
          :to="linkTo"
          :class="`inline-flex items-center font-medium ${colorClasses[color].link} transition-colors duration-150`"
        >
          {{ linkText }}
          <svg
            class="ml-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
