<script setup lang="ts">
import type { Club } from "~/interfaces/club";

const { create } = useClubs();

// Form data
const form = reactive<Partial<Club>>({
  nombre: "",
  ciudad: "",
  estadio: "",
  fundacion: new Date().toISOString().split("T")[0], // Today's date as default
  presupuesto: undefined,
});

// Loading states
const loading = ref(false);
const error = ref("");

// Validation
const validateForm = () => {
  error.value = "";

  if (!form.nombre?.trim()) {
    error.value = "El nombre del club es obligatorio";
    return false;
  }

  if (!form.ciudad?.trim()) {
    error.value = "La ciudad es obligatoria";
    return false;
  }

  if (!form.estadio?.trim()) {
    error.value = "El estadio es obligatorio";
    return false;
  }

  if (!form.fundacion) {
    error.value = "La fecha de fundación es obligatoria";
    return false;
  }

  const fundacionYear = new Date(form.fundacion).getFullYear();
  const currentYear = new Date().getFullYear();

  if (fundacionYear < 1800 || fundacionYear > currentYear) {
    error.value = "La fecha de fundación debe estar entre 1800 y el año actual";
    return false;
  }

  if (form.presupuesto && form.presupuesto < 0) {
    error.value = "El presupuesto no puede ser negativo";
    return false;
  }

  return true;
};

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  error.value = "";

  try {
    await create(form);
    await navigateTo("/clubs");
  } catch (err: any) {
    error.value = err.data?.message || "Error al crear el club";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl">
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
              v-if="error"
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
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Fields -->
            <div class="grid gap-6 sm:grid-cols-2">
              <!-- Nombre -->
              <UiFormField
                v-model="form.nombre"
                label="Nombre del Club"
                placeholder="Nombre del club"
                required
                :error="error && !form.nombre?.trim() ? 'El nombre del club es obligatorio' : ''"
              />

              <!-- Ciudad -->
              <UiFormField
                v-model="form.ciudad"
                label="Ciudad"
                placeholder="Ciudad del club"
                required
                :error="error && !form.ciudad?.trim() ? 'La ciudad es obligatoria' : ''"
              />

              <!-- Estadio -->
              <UiFormField
                v-model="form.estadio"
                label="Estadio"
                placeholder="Nombre del estadio"
                required
                :error="error && !form.estadio?.trim() ? 'El estadio es obligatorio' : ''"
              />

              <!-- Fundación -->
              <UiFormField
                v-model="form.fundacion"
                label="Fecha de Fundación"
                type="date"
                required
                :error="error && !form.fundacion ? 'La fecha de fundación es obligatoria' : ''"
              />

              <!-- Presupuesto -->
              <UiFormField
                v-model="form.presupuesto"
                label="Presupuesto (€)"
                type="number"
                placeholder="Presupuesto anual en euros"
                :error="error && form.presupuesto && form.presupuesto < 0 ? 'El presupuesto no puede ser negativo' : ''"
              />
            </div>

            <!-- Form Actions -->
            <UiFormActions
              :loading="loading"
              submit-text="Crear Club"
              cancel-text="Cancelar"
              cancel-to="/clubs"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
