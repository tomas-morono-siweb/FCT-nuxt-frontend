<script setup lang="ts">
import type { Coach } from "~/interfaces/coach";
import type { Club } from "~/interfaces/club";

const route = useRoute();
const id = Number(route.params.id);
const { get, update } = useCoaches();
const { list: listClubs } = useClubs();

// Load coach data
const { data: coach, pending, error } = await useAsyncData<Coach>(`coach:${id}`, () => get(id));

console.log("ID del entrenador a editar:", id);
console.log("Estado de carga:", { pending: pending.value, error: error.value });
console.log("Datos del entrenador:", coach.value);

// Form data - initialize with coach data
const form = reactive<Partial<Coach>>({
  dni: "",
  nombre: "",
  apellidos: "",
  salario: undefined,
  club: undefined,
});

// Watch for coach data changes to populate form
watch(
  coach,
  (newCoach) => {
    if (newCoach) {
      form.dni = newCoach.dni;
      form.nombre = newCoach.nombre;
      form.apellidos = newCoach.apellidos;
      form.salario = newCoach.salario;
      form.club = newCoach.club;
    }
  },
  { immediate: true }
);

// Loading states
const loading = ref(false);
const submitError = ref("");

// Load clubs for selection
const { data: clubsResponse } = await useAsyncData("clubs", () => listClubs());
const clubs = computed(() => clubsResponse.value?.data || []);

// Validation
const validateForm = () => {
  submitError.value = "";

  if (!form.dni?.trim()) {
    submitError.value = "El DNI es obligatorio";
    return false;
  }

  if (!form.nombre?.trim()) {
    submitError.value = "El nombre es obligatorio";
    return false;
  }

  if (!form.apellidos?.trim()) {
    submitError.value = "Los apellidos son obligatorios";
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
    await navigateTo(`/coaches/${id}`);
  } catch (err: any) {
    submitError.value = err.data?.message || "Error al actualizar el entrenador";
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
        color="green"
        class="mb-4"
      />

      <!-- Header Section -->
      <UiPageHeader
        title="Editar Entrenador"
        :description="
          coach ? `Editando información de ${coach.nombre} ${coach.apellidos}` : 'Editando información del entrenador'
        "
        back-to="/coaches"
      />

      <!-- Loading State -->
      <UiLoadingState
        v-if="pending"
        message="Cargando información del entrenador..."
        color="green"
      />

      <!-- Error State -->
      <UiErrorState
        v-else-if="error"
        :message="error.message"
      />

      <!-- Form Section -->
      <div
        v-else-if="coach"
        class="mt-8"
      >
        <div class="rounded-lg bg-white shadow-sm">
          <div class="border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-medium text-gray-900">Información del Entrenador</h3>
            <p class="mt-1 text-sm text-gray-500">Modifica los datos del entrenador</p>
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
              <!-- DNI -->
              <UiFormField
                v-model="form.dni"
                label="DNI"
                placeholder="DNI del entrenador"
                required
                :error="submitError && !form.dni?.trim() ? 'El DNI es obligatorio' : ''"
              />

              <!-- Nombre -->
              <UiFormField
                v-model="form.nombre"
                label="Nombre"
                placeholder="Nombre del entrenador"
                required
                :error="submitError && !form.nombre?.trim() ? 'El nombre es obligatorio' : ''"
              />

              <!-- Apellidos -->
              <UiFormField
                v-model="form.apellidos"
                label="Apellidos"
                placeholder="Apellidos del entrenador"
                required
                :error="submitError && !form.apellidos?.trim() ? 'Los apellidos son obligatorios' : ''"
              />

              <!-- Salario -->
              <UiFormField
                v-model="form.salario"
                label="Salario (€)"
                type="number"
                placeholder="Salario anual en euros"
                :error="submitError && form.salario && form.salario < 0 ? 'El salario no puede ser negativo' : ''"
              />

              <!-- Club -->
              <UiFormField
                v-model="form.club"
                label="Club"
                :options="clubs?.map((club) => ({ value: club.nombre, label: club.nombre })) || []"
                :error="submitError && form.club && !clubs?.find((c) => c.nombre === form.club) ? 'Club no válido' : ''"
              />
            </div>

            <!-- Form Actions -->
            <UiFormActions
              :loading="loading"
              submit-text="Guardar Cambios"
              cancel-text="Cancelar"
              :cancel-to="`/coaches/${id}`"
              @submit="handleSubmit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
