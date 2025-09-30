<script setup lang="ts">
import type { Coach } from "~/interfaces/coach";
import type { Club } from "~/interfaces/club";
import type { BackendError } from "~/interfaces/validation";

const { create } = useCoaches();
const { list: listClubs } = useClubs();

// Form data
const form = reactive<Partial<Coach>>({
  dni: "",
  nombre: "",
  apellidos: "",
  salario: undefined,
  id_club: undefined,
});

// Loading states
const loading = ref(false);
const error = ref("");

// Load clubs for selection
const { data: clubsResponse } = await useAsyncData("clubs", () => listClubs());
const clubs = computed(() => clubsResponse.value?.data || []);

// Computed para manejar la selección del club
const selectedClubId = computed({
  get: () => {
    if (form.id_club) {
      const club = clubs.value.find((c) => c.id_club === form.id_club);
      return club ? club.nombre : "";
    }
    return "";
  },
  set: (clubName: string) => {
    const club = clubs.value.find((c) => c.nombre === clubName);
    form.id_club = club ? club.id_club : undefined;
  },
});

// Submit handler
const handleSubmit = async () => {
  loading.value = true;
  error.value = "";

  try {
    await create(form);
    await navigateTo("/coaches");
  } catch (err: any) {
    error.value = err.error || "Error al crear el entrenador";
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
        :items="[
          { label: 'Inicio', to: '/', icon: 'home' },
          { label: 'Entrenadores', to: '/coaches', icon: 'users' },
          { label: 'Nuevo', to: '', icon: 'plus' },
        ]"
      />

      <!-- Header Section -->
      <UiPageHeader
        title="Nuevo Entrenador"
        description="Crea un nuevo entrenador para el equipo"
        back-to="/coaches"
      />

      <!-- Form Section -->
      <div class="mt-8">
        <div class="rounded-lg bg-white shadow-sm">
          <div class="border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-medium text-gray-900">Información del Entrenador</h3>
            <p class="mt-1 text-sm text-gray-500">Completa los datos básicos del nuevo entrenador</p>
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
              <!-- DNI -->
              <UiFormField
                v-model="form.dni"
                label="DNI"
                placeholder="DNI del entrenador"
                required
                :error="''"
              />

              <!-- Nombre -->
              <UiFormField
                v-model="form.nombre"
                label="Nombre"
                placeholder="Nombre del entrenador"
                required
                :error="''"
              />

              <!-- Apellidos -->
              <UiFormField
                v-model="form.apellidos"
                label="Apellidos"
                placeholder="Apellidos del entrenador"
                required
                :error="''"
              />

              <!-- Salario -->
              <UiFormField
                v-model="form.salario"
                label="Salario Anual (€)"
                placeholder="Ej: 15000000"
                :error="''"
              />

              <!-- Club -->
              <UiFormField
                v-model="selectedClubId"
                label="Club"
                :options="clubs?.map((club) => ({ value: club.nombre, label: club.nombre })) || []"
                :error="''"
              />
            </div>

            <!-- Form Actions -->
            <UiFormActions
              :loading="loading"
              submit-text="Crear Entrenador"
              cancel-text="Cancelar"
              cancel-to="/coaches"
              @submit="handleSubmit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
