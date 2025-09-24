<script setup lang="ts">
interface Props {
  message?: string;
  variant?: "card" | "inline" | "table";
}

const props = withDefaults(defineProps<Props>(), {
  message: "Error al cargar los datos",
  variant: "card",
});
</script>

<template>
  <!-- Card variant -->
  <div
    v-if="variant === 'card'"
    class="rounded-xl border border-gray-200 bg-white shadow-sm"
  >
    <div class="p-12 text-center">
      <svg
        class="mx-auto mb-4 h-12 w-12 text-red-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p class="font-medium text-red-600">{{ message }}</p>
    </div>
  </div>

  <!-- Inline variant -->
  <div
    v-else-if="variant === 'inline'"
    class="p-6 text-center"
  >
    <svg
      class="mx-auto mb-4 h-12 w-12 text-red-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p class="font-medium text-red-600">{{ message }}</p>
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
        <svg
          class="mb-4 h-12 w-12 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p class="font-medium text-red-600">{{ message }}</p>
      </div>
    </td>
  </tr>
</template>
