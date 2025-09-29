<script setup lang="ts">
import type { Club } from "~/interfaces/club";
import { formatMillions, parseMillions } from "~/utils/format";

const route = useRoute();
const id = Number(route.params.id);
const { get, update } = useClubs();

// Load club data
const { data: club, pending, error } = await useAsyncData<Club>(`club:${id}`, () => get(id));

console.log("ID del club a editar:", id);
console.log("Estado de carga:", { pending: pending.value, error: error.value });
console.log("Datos del club:", club.value);

// Form data - initialize with club data
const form = reactive<Partial<Club>>({
  id_club: "",
  nombre: "",
  fundacion: undefined,
  ciudad: "",
  estadio: "",
  presupuesto: undefined,
  presupuesto_disponible: undefined,
});

// Watch for club data changes to populate form
watch(
  club,
  (newClub) => {
    if (newClub) {
      form.id_club = newClub.id_club;
      form.nombre = newClub.nombre;
      form.fundacion = newClub.fundacion;
      form.ciudad = newClub.ciudad;
      form.estadio = newClub.estadio;
      form.presupuesto = newClub.presupuesto;
      form.presupuesto_disponible = newClub.presupuesto_disponible;
    }
  },
  { immediate: true }
);

// Loading states
const loading = ref(false);
const submitError = ref("");

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
  submitError.value = "";

  if (!form.id_club?.trim()) {
    submitError.value = "El ID del club es obligatorio";
    return false;
  }

  if (!form.nombre?.trim()) {
    submitError.value = "El nombre es obligatorio";
    return false;
  }

  if (form.presupuesto && form.presupuesto < 0) {
    submitError.value = "El presupuesto no puede ser negativo";
    return false;
  }

  if (form.presupuesto_disponible && form.presupuesto_disponible < 0) {
    submitError.value = "El presupuesto disponible no puede ser negativo";
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

    // Invalidar el cache de datos para forzar la recarga
    await clearNuxtData(`club:${id}`);

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
      <!-- Breadcrumb -->
      <UiBreadcrumb
        color="orange"
        class="mb-4"
        :items="[
          { label: 'Inicio', to: '/', icon: 'home' },
          { label: 'Clubs', to: '/clubs', icon: 'users' },
          { label: 'Editar', to: '', icon: 'edit' },
          { label: club ? club.nombre : 'Club', to: '', icon: 'user' },
        ]"
      />

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
              <!-- ID Club -->
              <UiFormField
                v-model="form.id_club"
                label="ID del Club"
                placeholder="Identificador único del club"
                required
                :error="submitError && !form.id_club?.trim() ? 'El ID del club es obligatorio' : ''"
              />

              <!-- Nombre -->
              <UiFormField
                v-model="form.nombre"
                label="Nombre"
                placeholder="Nombre del club"
                required
                :error="submitError && !form.nombre?.trim() ? 'El nombre es obligatorio' : ''"
              />

              <!-- Presupuesto Total -->
              <UiFormField
                v-model="formattedBudget"
                label="Presupuesto Total (Millones €)"
                placeholder="Ej: 500M €"
                :error="
                  submitError && form.presupuesto && form.presupuesto < 0 ? 'El presupuesto no puede ser negativo' : ''
                "
              />

              <!-- Presupuesto Disponible -->
              <UiFormField
                v-model="formattedAvailableBudget"
                label="Presupuesto Disponible (Millones €)"
                placeholder="Ej: 300M €"
                :error="
                  submitError && form.presupuesto_disponible && form.presupuesto_disponible < 0
                    ? 'El presupuesto disponible no puede ser negativo'
                    : ''
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
