<script setup lang="ts">
interface Props {
  label: string;
  type?: "text" | "email" | "number" | "password" | "tel" | "url" | "date";
  placeholder?: string;
  required?: boolean;
  error?: string;
  modelValue: string | number | undefined;
  options?: Array<{ value: string | number; label: string }>;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number | undefined];
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  const value = props.type === "number" ? Number(target.value) : target.value;
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="space-y-2">
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >
        *
      </span>
    </label>

    <!-- Input Field -->
    <input
      v-if="!options"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      class="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': error }"
      @input="updateValue"
    />

    <!-- Select Field -->
    <select
      v-else
      :value="modelValue"
      :required="required"
      class="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': error }"
      @change="updateValue"
    >
      <option value="">Seleccionar...</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- Error Message -->
    <p
      v-if="error"
      class="text-sm text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>
