<script setup lang="ts">
interface Props {
  message?: string;
  color?: "blue" | "green" | "purple" | "red";
  variant?: "card" | "inline" | "table";
}

const props = withDefaults(defineProps<Props>(), {
  message: "Cargando...",
  color: "blue",
  variant: "card",
});

const colorClasses = {
  blue: "border-blue-600",
  green: "border-green-600",
  purple: "border-purple-600",
  red: "border-red-600",
};
</script>

<template>
  <!-- Card variant -->
  <div
    v-if="variant === 'card'"
    class="rounded-xl border border-gray-200 bg-white shadow-sm"
  >
    <div class="p-12 text-center">
      <div :class="`mx-auto h-8 w-8 animate-spin rounded-full border-b-2 ${colorClasses[color]}`" />
      <p class="mt-4 text-sm text-gray-500">{{ message }}</p>
    </div>
  </div>

  <!-- Inline variant -->
  <div
    v-else-if="variant === 'inline'"
    class="p-6 text-center"
  >
    <div :class="`mx-auto h-8 w-8 animate-spin rounded-full border-b-2 ${colorClasses[color]}`" />
    <p class="mt-2 text-sm text-gray-500">{{ message }}</p>
  </div>

  <!-- Table variant -->
  <tr
    v-else-if="variant === 'table'"
    class="table-row"
  >
    <td
      colspan="5"
      class="px-6 py-12 text-center"
    >
      <div class="flex flex-col items-center">
        <div :class="`h-8 w-8 animate-spin rounded-full border-b-2 ${colorClasses[color]}`" />
        <p class="mt-2 text-sm text-gray-500">{{ message }}</p>
      </div>
    </td>
  </tr>
</template>
