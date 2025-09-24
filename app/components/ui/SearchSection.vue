<script setup lang="ts">
interface Props {
  placeholder: string;
  label: string;
  modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
    <div class="p-6">
      <div class="flex flex-col gap-4 sm:flex-row">
        <div class="flex-1">
          <label class="mb-2 block text-sm font-medium text-gray-700">{{ label }}</label>
          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              :value="modelValue"
              class="block w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              :placeholder="placeholder"
              @input="updateValue"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
