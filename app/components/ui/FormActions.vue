<script setup lang="ts">
interface Props {
  loading?: boolean;
  submitText?: string;
  cancelText?: string;
  cancelTo?: string;
  variant?: "primary" | "secondary";
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  submitText: "Guardar",
  cancelText: "Cancelar",
  variant: "primary",
});

const emit = defineEmits<{
  submit: [];
}>();

const handleSubmit = () => {
  emit("submit");
};

const buttonClasses = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
};
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
    <!-- Cancel Button -->
    <NuxtLink
      v-if="cancelTo"
      :to="cancelTo"
      class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      {{ cancelText }}
    </NuxtLink>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="loading"
      :class="`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-colors duration-200 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${buttonClasses[variant]}`"
      @click="handleSubmit"
    >
      <svg
        v-if="loading"
        class="mr-2 h-4 w-4 animate-spin"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {{ loading ? "Guardando..." : submitText }}
    </button>
  </div>
</template>
