<script setup lang="ts">
interface InfoItem {
  label: string;
  value: string | number;
}

interface Props {
  items: InfoItem[];
  columns?: 1 | 2 | 3 | 4;
}

const props = withDefaults(defineProps<Props>(), {
  columns: 2,
});

const gridClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};
</script>

<template>
  <div :class="`grid gap-4 ${gridClasses[columns]}`">
    <div
      v-for="item in items"
      :key="item.label"
      class="flex items-center justify-between py-2"
    >
      <span class="text-sm font-medium text-gray-500">{{ item.label }}</span>
      <span class="text-sm font-semibold text-gray-900">{{ item.value }}</span>
    </div>
  </div>
</template>
