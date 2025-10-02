<script setup lang="ts">
import type { Player } from "~/interfaces/player";
import type { Club } from "~/interfaces/club";
import type { BackendError } from "~/interfaces/validation";

const { create } = usePlayers();
const { list: listClubs } = useClubs();

// Form errors handling
const formErrors = useFormErrors();
const { setErrors, clearErrors, clearFieldError, getFieldError, hasErrors, generalError } = formErrors;

// Provide form errors to child components
provide("formErrors", formErrors);

// Form data
const form = reactive<Partial<Player>>({
  nombre: "",
  apellidos: "",
  dorsal: undefined,
  salario: undefined,
  id_club: undefined,
});

// Loading states
const loading = ref(false);

// Load clubs for selection - OPTIMIZADO: usar caché compartido
const { data: clubsResponse } = await useAsyncData("clubs-list", () => listClubs(), {
  default: () => ({ data: [], pagination: null }),
  server: false, // Solo cargar en cliente para evitar SSR duplicado
});
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

// No position options needed - API doesn't include position

// Submit handler
const handleSubmit = async () => {
  loading.value = true;
  clearErrors();

  try {
    await create(form);
    await navigateTo("/players");
  } catch (err: any) {
    console.log("❌ Error al crear jugador:", err);
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
        color="blue"
        class="mb-4"
        :items="[
          { label: 'Inicio', to: '/', icon: 'home' },
          { label: 'Jugadores', to: '/players', icon: 'users' },
          { label: 'Nuevo', to: '', icon: 'plus' },
        ]"
      />

      <!-- Header Section -->
      <UiPageHeader
        title="Nuevo Jugador"
        description="Crea un nuevo jugador para el equipo"
        back-to="/players"
      />

      <!-- Form Section -->
      <div class="mt-8">
        <div class="rounded-lg bg-white shadow-sm">
          <div class="border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-medium text-gray-900">Información del Jugador</h3>
            <p class="mt-1 text-sm text-gray-500">Completa los datos básicos del nuevo jugador</p>
          </div>

          <form
            @submit.prevent="handleSubmit"
            class="space-y-6 p-6"
          >
            <!-- General Error Message (solo si hay error general) -->
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
              <!-- Nombre -->
              <UiFormField
                v-model="form.nombre"
                label="Nombre"
                placeholder="Nombre del jugador"
                required
                field-name="nombre"
                @focus="clearFieldError"
              />

              <!-- Apellidos -->
              <UiFormField
                v-model="form.apellidos"
                label="Apellidos"
                placeholder="Apellidos del jugador"
                required
                field-name="apellidos"
                @focus="clearFieldError"
              />

              <!-- Salario -->
              <UiFormField
                v-model="form.salario"
                label="Salario Anual (€)"
                placeholder="Ej: 5000000"
                type="number"
                field-name="salario"
                @focus="clearFieldError"
              />

              <!-- Dorsal -->
              <UiFormField
                v-model="form.dorsal"
                label="Dorsal"
                type="number"
                placeholder="Número de dorsal (1-99)"
                field-name="dorsal"
                @focus="clearFieldError"
              />

              <!-- Club -->
              <UiFormField
                v-model="selectedClubId"
                label="Club"
                :options="[
                  { value: '', label: 'Sin club' },
                  ...(clubs?.map((club) => ({ value: club.nombre, label: club.nombre })) || []),
                ]"
                field-name="id_club"
                @focus="clearFieldError"
              />
            </div>

            <!-- Form Actions -->
            <UiFormActions
              :loading="loading"
              submit-text="Crear Jugador"
              cancel-text="Cancelar"
              cancel-to="/players"
              @submit="handleSubmit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
