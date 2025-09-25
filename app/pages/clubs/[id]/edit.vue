<script setup lang="ts">
import type { Club } from "~/interfaces/club";

const route = useRoute();
const id = Number(route.params.id);
const { get, update } = useClubs();

// Load club data
const { data: club, pending, error } = await useAsyncData<Club>(`club:${id}`, () => get(id));

// Form data - initialize with club data
const form = reactive<Partial<Club>>({
  nombre: "",
  ciudad: "",
  estadio: "",
  fundacion: undefined,
  presupuesto: undefined,
});

// Watch for club data changes to populate form
watch(
  club,
  (newClub) => {
    if (newClub) {
      form.nombre = newClub.nombre;
      form.ciudad = newClub.ciudad;
      form.estadio = newClub.estadio;
      form.fundacion = newClub.fundacion;
      form.presupuesto = newClub.presupuesto;
    }
  },
  { immediate: true }
);

// Loading states
const loading = ref(false);
const submitError = ref("");

// Validation
const validateForm = () => {
  submitError.value = "";

  if (!form.nombre?.trim()) {
    submitError.value = "El nombre del club es obligatorio";
    return false;
  }

  if (!form.ciudad?.trim()) {
    submitError.value = "La ciudad es obligatoria";
    return false;
  }

  if (!form.estadio?.trim()) {
    submitError.value = "El estadio es obligatorio";
    return false;
  }

  if (!form.fundacion || form.fundacion < 1800 || form.fundacion > new Date().getFullYear()) {
    submitError.value = "El año de fundación debe estar entre 1800 y el año actual";
    return false;
  }

  if (form.presupuesto && form.presupuesto < 0) {
    submitError.value = "El presupuesto no puede ser negativo";
    return false;
  }

  return true;
};

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return;

  loading.value = true;
  submitError.value = "";

  try {
    await update(id, form);
    await navigateTo(`/clubs/${id}`);
  } catch (err: any) {
    submitError.value = err.data?.message || "Error al actualizar el club";
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
        title="Editar Club"
        :description="club ? `Editando información de ${club.nombre}` : 'Editando información del club'"
        back-to="/clubs"
      />

      <!-- Loading State -->
      <UiLoadingState
        v-if="pending"
        message="Cargando información del club..."
        color="orange"
      />

      <!-- Error State -->
      <UiErrorState
        v-else-if="error"
        :message="error.message"
      />

      <!-- Form Section -->
      <div
        v-else-if="club"
        class="mt-8"
      >
        <div class="rounded-lg bg-white shadow-sm">
          <div class="border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-medium text-gray-900">Información del Club</h3>
            <p class="mt-1 text-sm text-gray-500">Modifica los datos del club</p>
          </div>

          <form
            @submit.prevent="handleSubmit"
            class="space-y-6 p-6"
          >
            <!-- Error Message -->
            <div
              v-if="submitError"
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
                    {{ submitError }}
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
                :error="submitError && !form.nombre?.trim() ? 'El nombre del club es obligatorio' : ''"
              />

              <!-- Ciudad -->
              <UiFormField
                v-model="form.ciudad"
                label="Ciudad"
                placeholder="Ciudad del club"
                required
                :error="submitError && !form.ciudad?.trim() ? 'La ciudad es obligatoria' : ''"
              />

              <!-- Estadio -->
              <UiFormField
                v-model="form.estadio"
                label="Estadio"
                placeholder="Nombre del estadio"
                required
                :error="submitError && !form.estadio?.trim() ? 'El estadio es obligatorio' : ''"
              />

              <!-- Fundación -->
              <UiFormField
                v-model="form.fundacion"
                label="Año de Fundación"
                type="number"
                placeholder="Ej: 1900"
                required
                :error="
                  submitError && (!form.fundacion || form.fundacion < 1800 || form.fundacion > new Date().getFullYear())
                    ? 'El año de fundación debe estar entre 1800 y el año actual'
                    : ''
                "
              />

              <!-- Presupuesto -->
              <UiFormField
                v-model="form.presupuesto"
                label="Presupuesto (€)"
                type="number"
                placeholder="Presupuesto anual en euros"
                :error="
                  submitError && form.presupuesto && form.presupuesto < 0 ? 'El presupuesto no puede ser negativo' : ''
                "
              />
            </div>

            <!-- Form Actions -->
            <UiFormActions
              :loading="loading"
              submit-text="Guardar Cambios"
              cancel-text="Cancelar"
              :cancel-to="`/clubs/${id}`"
              @submit="handleSubmit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
