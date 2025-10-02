<script setup lang="ts">
interface Props {
  label: string;
  type?: "text" | "email" | "number" | "password" | "tel" | "url" | "date";
  placeholder?: string;
  required?: boolean;
  error?: string;
  modelValue: string | number | undefined;
  options?: Array<{ value: string | number; label: string }>;
  fieldName?: string; // Nombre del campo para obtener errores automáticamente
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  required: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number | undefined];
  "focus": [fieldName: string]; // Emitir cuando el campo recibe foco
}>();

// Composable para manejar errores (opcional)
const formErrors = inject('formErrors', null) as ReturnType<typeof useFormErrors> | null;

// Computed para obtener el error del campo
const fieldError = computed(() => {
  // Prioridad: error prop > error del composable > sin error
  if (props.error) {
    return props.error;
  }
  
  if (formErrors && props.fieldName) {
    return formErrors.getFieldError(props.fieldName);
  }
  
  return "";
});

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLSelectElement;
  let value: string | number | undefined;
  
  if (props.type === "number") {
    // Handle empty string for number inputs
    value = target.value === "" ? "" : Number(target.value);
  } else {
    value = target.value;
  }
  
  emit("update:modelValue", value);
};

const handleFocus = () => {
  if (props.fieldName) {
    emit("focus", props.fieldName);
    // Limpiar el error del campo cuando recibe foco
    if (formErrors) {
      formErrors.clearFieldError(props.fieldName);
    }
  }
};
</script>

<template>
  <div class="space-y-2">
    <label class="text-secondary-700 block text-sm font-semibold">
      {{ label }}
      <span
        v-if="required"
        class="text-error-500"
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
      class="border-secondary-300 text-secondary-800 focus:border-primary-500 focus:ring-primary-200 block w-full rounded-lg border bg-white px-4 py-3 text-sm transition-all duration-200 focus:bg-white focus:ring-2"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': fieldError }"
      @input="updateValue"
      @focus="handleFocus"
    />

    <!-- Select Field -->
    <select
      v-else
      :value="modelValue"
      :required="required"
      class="border-secondary-300 text-secondary-800 focus:border-primary-500 focus:ring-primary-200 block w-full rounded-lg border bg-white px-4 py-3 text-sm transition-all duration-200 focus:bg-white focus:ring-2"
      :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': fieldError }"
      @change="updateValue"
      @focus="handleFocus"
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
      v-if="fieldError"
      class="text-sm text-red-600"
    >
      {{ fieldError }}
    </p>
  </div>
</template>
