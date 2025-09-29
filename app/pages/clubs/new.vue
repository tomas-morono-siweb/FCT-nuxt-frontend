<script setup lang="ts">
import type { Club } from "~/interfaces/club";
import { formatMillions, parseMillions } from "~/utils/format";

const { create } = useClubs();

// Form data
const form = reactive<Partial<Club>>({
  id_club: "",
  nombre: "",
  ciudad: "",
  estadio: "",
  fundacion: new Date().getFullYear(), // Current year as default
  presupuesto: undefined,
  presupuesto_disponible: undefined,
});

// Loading states
const loading = ref(false);
const error = ref("");

// Computed para manejar el presupuesto formateado
const formattedBudget = computed({
  get: () => {
    return form.presupuesto ? formatMillions(form.presupuesto) : "";
  },
  set: (value: string) => {
    form.presupuesto = parseMillions(value);
  },
});

// Computed para manejar el presupuesto disponible formateado
const formattedAvailableBudget = computed({
  get: () => {
    return form.presupuesto_disponible ? formatMillions(form.presupuesto_disponible) : "";
  },
  set: (value: string) => {
    form.presupuesto_disponible = parseMillions(value);
  },
});

// Validation
const validateForm = () => {
  error.value = "";

  if (!form.id_club?.trim()) {
    error.value = "El código del club es obligatorio";
    return false;
  }

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

  if (!form.fundacion || form.fundacion < 1800 || form.fundacion > new Date().getFullYear()) {
    error.value = "El año de fundación debe estar entre 1800 y el año actual";
    return false;
  }

  if (form.presupuesto && form.presupuesto < 0) {
    error.value = "El presupuesto no puede ser negativo";
    return false;
  }

  if (form.presupuesto_disponible && form.presupuesto_disponible < 0) {
    error.value = "El presupuesto disponible no puede ser negativo";
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
              <!-- Código del Club -->
              <UiFormField
                v-model="form.id_club"
                label="Código del Club"
                placeholder="Ej: FCB, RMA, PSG"
                required
                :error="error && !form.id_club?.trim() ? 'El código del club es obligatorio' : ''"
              />

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
                label="Año de Fundación"
                type="number"
                placeholder="Ej: 1900"
                required
                :error="
                  error && (!form.fundacion || form.fundacion < 1800 || form.fundacion > new Date().getFullYear())
                    ? 'El año de fundación debe estar entre 1800 y el año actual'
                    : ''
                "
              />

              <!-- Presupuesto Total -->
              <UiFormField
                v-model="formattedBudget"
                label="Presupuesto Total (Millones €)"
                placeholder="Ej: 500M €"
                :error="error && form.presupuesto && form.presupuesto < 0 ? 'El presupuesto no puede ser negativo' : ''"
              />

              <!-- Presupuesto Disponible -->
              <UiFormField
                v-model="formattedAvailableBudget"
                label="Presupuesto Disponible (Millones €)"
                placeholder="Ej: 300M €"
                :error="
                  error && form.presupuesto_disponible && form.presupuesto_disponible < 0
                    ? 'El presupuesto disponible no puede ser negativo'
                    : ''
                "
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
