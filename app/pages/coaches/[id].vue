<script setup lang="ts">
import type { Coach } from "~/interfaces/coach";
import type { Club } from "~/interfaces/club";

const route = useRoute();
const id = Number(route.params.id);
const { get: getCoach } = useCoaches();
const { get: getClub } = useClubs();

const { data: coach, pending, error } = await useAsyncData<Coach>(`coach:${id}`, () => getCoach(id));

// Obtener información del club si el coach tiene uno asignado
const { data: club } = await useAsyncData<Club | null>(
  `club:${coach.value?.id_club}`,
  async () => {
    if (coach.value?.id_club) {
      return await getClub(coach.value.id_club);
    }
    return null;
  },
  {
    watch: [coach],
  }
);
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Header Section -->
      <UiDetailHeader
        title="Detalle del Entrenador"
        description="Información completa del entrenador seleccionado"
        :avatar-text="coach ? `${coach.nombre.charAt(0)}${coach.apellidos.charAt(0)}` : 'E'"
        avatar-color="green"
        :edit-to="`/coaches/${coach?.id}/edit`"
        back-to="/coaches"
        :badges="
          coach
            ? [
                { text: coach.nacionalidad, color: 'green' as const },
                ...(coach.salario ? [{ text: `€${coach.salario.toLocaleString()}`, color: 'gray' as const }] : []),
              ]
            : []
        "
      >
        <template #title>
          {{ coach ? `${coach.nombre} ${coach.apellidos}` : "Entrenador" }}
        </template>
      </UiDetailHeader>

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

      <!-- Coach Details -->
      <div
        v-else-if="coach"
        class="space-y-6"
      >
        <!-- Coach Information Grid -->
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Personal Information -->
          <UiDataCard
            title="Información Personal"
            color="green"
          >
            <UiInfoGrid
              :items="[
                { label: 'Nombre', value: coach.nombre },
                { label: 'Apellidos', value: coach.apellidos },
                { label: 'Nacionalidad', value: coach.nacionalidad },
                { label: 'ID del Entrenador', value: coach.id },
              ]"
            />
          </UiDataCard>

          <!-- Professional Information -->
          <UiDataCard
            title="Información Profesional"
            color="green"
          >
            <UiInfoGrid
              :items="[
                { label: 'Salario', value: coach.salario ? `${coach.salario.toLocaleString()}€` : 'No disponible' },
                { label: 'Club Asignado', value: coach.id_club ? `Club ID: ${coach.id_club}` : 'Sin club asignado' },
              ]"
            />
          </UiDataCard>
        </div>

        <!-- Additional Information -->
        <UiDataCard
          title="Información Adicional"
          color="green"
        >
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-lg bg-green-50 p-4 text-center">
              <div class="text-2xl font-bold text-green-600">{{ coach.nombre.length + coach.apellidos.length }}</div>
              <div class="text-sm text-green-800">Total de Letras</div>
            </div>
            <div class="rounded-lg bg-gray-50 p-4 text-center">
              <div class="text-2xl font-bold text-gray-600">{{ coach.nacionalidad.length }}</div>
              <div class="text-sm text-gray-800">Letras en Nacionalidad</div>
            </div>
            <div class="rounded-lg bg-green-50 p-4 text-center">
              <div class="text-2xl font-bold text-green-600">{{ coach.salario.toLocaleString() }}€</div>
              <div class="text-sm text-green-800">Salario Configurado</div>
            </div>
          </div>
        </UiDataCard>

        <!-- Club Information (if assigned) -->
        <UiClubInfo
          :club="club"
          :club-id="coach.id_club"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
