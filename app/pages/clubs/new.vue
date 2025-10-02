<script setup lang="ts">
import type { Club } from "~/interfaces/club";
import type { BackendError } from "~/interfaces/validation";

const { create } = useClubs();

// Form data
const form = reactive<Partial<Club>>({
  id_club: "",
  nombre: "",
  ciudad: "",
  estadio: "",
  fundacion: new Date().getFullYear(), // Current year as default
  presupuesto: undefined,
});

// Loading states
const loading = ref(false);

// Sistema de errores simplificado
const fieldErrors = ref<Record<string, string>>({});
const generalError = ref("");

// Función para limpiar errores
const clearErrors = () => {
  fieldErrors.value = {};
  generalError.value = "";
};

// Función para establecer errores desde el backend
const setErrors = (error: any) => {
  clearErrors();

  // Errores por campo (formato: { "campo" => "mensaje" })
  if (error?.errores) {
    fieldErrors.value = { ...error.errores };
  }

  // Error general
  if (error?.error) {
    generalError.value = error.error;
  } else {
    generalError.value = "Ha ocurrido un error inesperado";
  }
};

// Función para obtener error de campo
const getFieldError = (fieldName: string) => {
  return fieldErrors.value[fieldName] || "";
};

// Submit handler
const handleSubmit = async () => {
  loading.value = true;
  clearErrors();

  try {
    await create(form);
    await navigateTo("/clubs");
  } catch (err: any) {
    setErrors(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl">
      <!-- Breadcrumb -->
      <UiBreadcrumb
        color="orange"
        class="mb-4"
        :items="[
          { label: 'Inicio', to: '/', icon: 'home' },
          { label: 'Clubs', to: '/clubs', icon: 'users' },
          { label: 'Nuevo', to: '', icon: 'plus' },
        ]"
      />

      <!-- Header Section -->
      <UiPageHeader
        title="Nuevo Club"
        description="Crea un nuevo club para el equipo"
        back-to="/clubs"
      />

      <!-- Form Section -->
      <div class="mt-8">
        <div class="rounded-lg bg-white shadow-sm">
          <div class="border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-medium text-gray-900">Información del Club</h3>
            <p class="mt-1 text-sm text-gray-500">Completa los datos básicos del nuevo club</p>
          </div>

          <form
            @submit.prevent="handleSubmit"
            class="space-y-6 p-6"
          >
            <!-- Error Message -->
            <div
              v-if="generalError"
              class="rounded-lg bg-red-50 p-4"
            >
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    class="h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">Error</h3>
                  <div class="mt-2 text-sm text-red-700">
                    {{ generalError }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Fields -->
            <div class="grid gap-6 sm:grid-cols-2">
              <!-- Código del Club -->
              <UiFormField
                v-model="form.id_club"
                label="Código del Club"
                placeholder="Ej: FCB, RMA, PSG"
                required
                :error="getFieldError('id_club')"
              />

              <!-- Nombre -->
              <UiFormField
                v-model="form.nombre"
                label="Nombre del Club"
                placeholder="Nombre del club"
                required
                :error="getFieldError('nombre')"
              />

              <!-- Ciudad -->
              <UiFormField
                v-model="form.ciudad"
                label="Ciudad"
                placeholder="Ciudad del club"
                required
                :error="getFieldError('ciudad')"
              />

              <!-- Estadio -->
              <UiFormField
                v-model="form.estadio"
                label="Estadio"
                placeholder="Nombre del estadio"
                required
                :error="getFieldError('estadio')"
              />

              <!-- Fundación -->
              <UiFormField
                v-model="form.fundacion"
                label="Año de Fundación"
                type="number"
                placeholder="Ej: 1900"
                required
                :error="getFieldError('fundacion')"
              />

              <!-- Presupuesto Total -->
              <UiFormField
                v-model="form.presupuesto"
                label="Presupuesto Total (€)"
                placeholder="Ej: 100000000"
                :error="getFieldError('presupuesto')"
              />
            </div>

            <!-- Form Actions -->
            <UiFormActions
              :loading="loading"
              submit-text="Crear Club"
              cancel-text="Cancelar"
              cancel-to="/clubs"
              @submit="handleSubmit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
