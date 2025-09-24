<script setup lang="ts">
interface Props {
  title?: string;
  color?: "blue" | "green" | "purple" | "gray";
}

const props = withDefaults(defineProps<Props>(), {
  color: "gray",
});

const colorClasses = {
  blue: "from-blue-50 to-blue-100",
  green: "from-green-50 to-green-100",
  purple: "from-purple-50 to-purple-100",
  gray: "from-gray-50 to-gray-100",
};
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  >
    <div
      :class="`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-0 transition-opacity duration-300 group-hover:opacity-100`"
    />
    <div class="relative p-8">
      <div
        v-if="title"
        class="-mx-8 -mt-8 mb-8 border-b border-gray-200 px-6 py-4"
      >
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      </div>
      <slot />
    </div>
  </div>
</template>
