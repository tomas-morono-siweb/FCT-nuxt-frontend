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
      <!-- Header Section -->
      <UiDetailHeader
        title="Detalle del Club"
        description="Información completa del club seleccionado"
        :avatar-text="club?.nombre?.charAt(0) || 'C'"
        avatar-color="orange"
        :edit-to="`/clubs/${club?.id}/edit`"
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
                { label: 'Nombre del Club', value: club.nombre },
                { label: 'Ciudad', value: club.ciudad },
                { label: 'Estadio', value: club.estadio },
                { label: 'Año de Fundación', value: new Date(club.fundacion).getFullYear() },
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
                  label: 'Presupuesto',
                  value: club.presupuesto ? `€${club.presupuesto.toLocaleString()}` : 'No disponible',
                },
                { label: 'ID del Club', value: club.id },
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
                {{ new Date().getFullYear() - new Date(club.fundacion).getFullYear() }}
              </div>
              <div class="text-sm text-orange-800">Años de Historia</div>
            </div>
            <div class="rounded-lg bg-gray-50 p-4 text-center">
              <div class="text-2xl font-bold text-gray-600">{{ club.ciudad.length }}</div>
              <div class="text-sm text-gray-800">Letras en Ciudad</div>
            </div>
            <div class="rounded-lg bg-orange-50 p-4 text-center">
              <div class="text-2xl font-bold text-orange-600">{{ club.nombre.length }}</div>
              <div class="text-sm text-orange-800">Letras en Nombre</div>
            </div>
          </div>
        </UiDataCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
