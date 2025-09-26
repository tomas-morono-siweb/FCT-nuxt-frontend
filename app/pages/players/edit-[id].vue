<script setup lang="ts">
import type { Player } from "~/interfaces/player";
import type { Club } from "~/interfaces/club";

const route = useRoute();
const id = Number(route.params.id);
const { get, update } = usePlayers();
const { list: listClubs } = useClubs();

// Load player data
const { data: player, pending, error } = await useAsyncData<Player>(`player:${id}`, () => get(id));

console.log("ID del jugador a editar:", id);
console.log("Estado de carga:", { pending: pending.value, error: error.value });
console.log("Datos del jugador:", player.value);

// Form data - initialize with player data
const form = reactive<Partial<Player>>({
  nombre: "",
  apellidos: "",
  dorsal: undefined,
  salario: undefined,
  club: undefined,
});

// Watch for player data changes to populate form
watch(
  player,
  (newPlayer) => {
    if (newPlayer) {
      form.nombre = newPlayer.nombre;
      form.apellidos = newPlayer.apellidos;
      form.dorsal = newPlayer.dorsal;
      form.salario = newPlayer.salario;
      form.club = newPlayer.club;
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

  if (!form.nombre?.trim()) {
    submitError.value = "El nombre es obligatorio";
    return false;
  }

  if (!form.apellidos?.trim()) {
    submitError.value = "Los apellidos son obligatorios";
    return false;
  }

  if (form.dorsal && (form.dorsal < 1 || form.dorsal > 99)) {
    submitError.value = "El dorsal debe estar entre 1 y 99";
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
    await clearNuxtData(`player:${id}`);
    await clearNuxtData(`club:${form.club}`);

    await navigateTo(`/players/${id}`);
  } catch (err: any) {
    submitError.value = err.data?.message || "Error al actualizar el jugador";
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
      />

      <!-- Header Section -->
      <UiPageHeader
        title="Editar Jugador"
        :description="
          player ? `Editando información de ${player.nombre} ${player.apellidos}` : 'Editando información del jugador'
        "
        back-to="/players"
      />

      <!-- Loading State -->
      <UiLoadingState
        v-if="pending"
        message="Cargando información del jugador..."
        color="blue"
      />

      <!-- Error State -->
      <UiErrorState
        v-else-if="error"
        :message="error.message"
      />

      <!-- Form Section -->
      <div
        v-else-if="player"
        class="mt-8"
      >
        <div class="rounded-lg bg-white shadow-sm">
          <div class="border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-medium text-gray-900">Información del Jugador</h3>
            <p class="mt-1 text-sm text-gray-500">Modifica los datos del jugador</p>
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
                label="Nombre"
                placeholder="Nombre del jugador"
                required
                :error="submitError && !form.nombre?.trim() ? 'El nombre es obligatorio' : ''"
              />

              <!-- Apellidos -->
              <UiFormField
                v-model="form.apellidos"
                label="Apellidos"
                placeholder="Apellidos del jugador"
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

              <!-- Dorsal -->
              <UiFormField
                v-model="form.dorsal"
                label="Dorsal"
                type="number"
                placeholder="Número de dorsal (1-99)"
                :error="
                  submitError && form.dorsal && (form.dorsal < 1 || form.dorsal > 99)
                    ? 'El dorsal debe estar entre 1 y 99'
                    : ''
                "
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
              :cancel-to="`/players/${id}`"
              @submit="handleSubmit"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
