<script setup lang="ts">
import type { Club } from "~/interfaces/club";

const route = useRoute();
const id = Number(route.params.id);
const { get } = useClubs();
const { data: club, pending, error } = await useAsyncData<Club>(`club:${id}`, () => get(id));
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Breadcrumb -->
      <UiBreadcrumb
        color="orange"
        class="mb-4"
        :items="[
          { label: 'Inicio', to: '/', icon: 'home' },
          { label: 'Clubes', to: '/clubs', icon: 'building' },
          { label: club?.nombre || 'Club', icon: 'building' },
        ]"
      />

      <!-- Header Section -->
      <UiDetailHeader
        title="Detalle del Club"
        description="Información completa del club seleccionado"
        :avatar-text="club?.nombre?.charAt(0) || 'C'"
        avatar-color="orange"
        :edit-to="`/clubs/edit-${club?.id}`"
        back-to="/clubs"
      >
        <template #title>
          {{ club?.nombre }}
        </template>
      </UiDetailHeader>

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

      <!-- Club Details -->
      <div
        v-else-if="club"
        class="space-y-6"
      >
        <!-- Club Information Grid -->
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Basic Information -->
          <UiDataCard
            title="Información Básica"
            color="orange"
          >
            <UiInfoGrid
              :items="[
                { label: 'Código del Club', value: club.id_club },
                { label: 'Nombre del Club', value: club.nombre },
                { label: 'Ciudad', value: club.ciudad },
                { label: 'Estadio', value: club.estadio },
                { label: 'Año de Fundación', value: club.fundacion.toString() },
                { label: 'Entrenador', value: club.entrenador || 'Sin entrenador' },
              ]"
            />
          </UiDataCard>

          <!-- Financial Information -->
          <UiDataCard
            title="Información Financiera"
            color="orange"
          >
            <UiInfoGrid
              :items="[
                {
                  label: 'Presupuesto Total',
                  value: club.presupuesto ? `${club.presupuesto.toLocaleString()} €` : 'Sin presupuesto',
                },
                {
                  label: 'Presupuesto Disponible',
                  value: club.presupuesto_restante
                    ? `${club.presupuesto_restante.toLocaleString()} €`
                    : 'Sin presupuesto',
                },
                { label: 'Código del Club', value: club.id_club },
              ]"
            />
          </UiDataCard>
        </div>

        <!-- Additional Information -->
        <UiDataCard
          title="Información Adicional"
          color="orange"
        >
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-lg bg-orange-50 p-4 text-center">
              <div class="text-2xl font-bold text-orange-600">
                {{ new Date().getFullYear() - club.fundacion }}
              </div>
              <div class="text-sm text-orange-800">Años de Historia</div>
            </div>
            <div class="rounded-lg bg-orange-50 p-4 text-center">
              <div class="text-2xl font-bold text-orange-600">
                {{ club.presupuesto ? `${club.presupuesto.toLocaleString()} €` : "Sin presupuesto" }}
              </div>
              <div class="text-sm text-orange-800">Presupuesto Total</div>
            </div>
            <div class="rounded-lg bg-green-50 p-4 text-center">
              <div class="text-2xl font-bold text-green-600">
                {{ club.presupuesto_restante ? `${club.presupuesto_restante.toLocaleString()} €` : "Sin presupuesto" }}
              </div>
              <div class="text-sm text-green-800">Presupuesto Disponible</div>
            </div>
          </div>
        </UiDataCard>

        <!-- Players Section -->
        <UiDataCard
          v-if="club.jugadores && club.jugadores.length > 0"
          title="Jugadores del Club"
          color="orange"
        >
          <div class="space-y-3">
            <div
              v-for="(jugador, index) in club.jugadores"
              :key="index"
              class="flex items-center justify-between rounded-lg bg-gray-50 p-3"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-sm font-medium text-orange-600"
                >
                  {{ index + 1 }}
                </div>
                <span class="text-gray-900">{{ jugador }}</span>
              </div>
            </div>
          </div>
        </UiDataCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
