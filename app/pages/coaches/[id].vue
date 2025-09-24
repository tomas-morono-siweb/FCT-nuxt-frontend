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
      <div class="mb-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Detalle del Entrenador</h1>
            <p class="mt-2 text-sm text-gray-600">Información completa del entrenador seleccionado</p>
          </div>
          <div class="flex gap-3">
            <NuxtLink
              :to="`/coaches/${coach?.id}/edit`"
              class="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700"
            >
              <svg
                class="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Editar Entrenador
            </NuxtLink>
            <NuxtLink
              to="/coaches"
              class="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition-colors duration-200 hover:bg-gray-50"
            >
              <svg
                class="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Volver a Entrenadores
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="pending"
        class="rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <div class="p-12 text-center">
          <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-green-600" />
          <p class="mt-4 text-sm text-gray-500">Cargando información del entrenador...</p>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="rounded-xl border border-gray-200 bg-white shadow-sm"
      >
        <div class="p-12 text-center">
          <svg
            class="mx-auto mb-4 h-12 w-12 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="font-medium text-red-600">Error al cargar los datos</p>
          <p class="mt-1 text-sm text-gray-500">{{ error.message }}</p>
        </div>
      </div>

      <!-- Coach Details -->
      <div
        v-else-if="coach"
        class="space-y-6"
      >
        <!-- Coach Header Card -->
        <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div class="p-8">
            <div class="flex items-center space-x-6">
              <div class="h-20 w-20 flex-shrink-0">
                <div class="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <span class="text-2xl font-bold text-green-600">
                    {{ coach.nombre.charAt(0) }}{{ coach.apellidos.charAt(0) }}
                  </span>
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <h2 class="text-3xl font-bold text-gray-900">{{ coach.nombre }} {{ coach.apellidos }}</h2>
                <div class="mt-2 flex flex-wrap gap-3">
                  <span class="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                    {{ coach.nacionalidad }}
                  </span>
                  <span
                    v-if="coach.salario"
                    class="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800"
                  >
                    €{{ coach.salario.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Coach Information Grid -->
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Personal Information -->
          <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div class="border-b border-gray-200 px-6 py-4">
              <h3 class="text-lg font-semibold text-gray-900">Información Personal</h3>
            </div>
            <div class="space-y-4 p-6">
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Nombre</span>
                <span class="text-sm font-semibold text-gray-900">{{ coach.nombre }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Apellidos</span>
                <span class="text-sm font-semibold text-gray-900">{{ coach.apellidos }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Nacionalidad</span>
                <span class="text-sm font-semibold text-gray-900">{{ coach.nacionalidad }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">ID del Entrenador</span>
                <span class="text-sm font-semibold text-gray-900">{{ coach.id }}</span>
              </div>
            </div>
          </div>

          <!-- Professional Information -->
          <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div class="border-b border-gray-200 px-6 py-4">
              <h3 class="text-lg font-semibold text-gray-900">Información Profesional</h3>
            </div>
            <div class="space-y-4 p-6">
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Salario</span>
                <span class="text-sm font-semibold text-gray-900">
                  {{ coach.salario ? `€${coach.salario.toLocaleString()}` : "No disponible" }}
                </span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Club Asignado</span>
                <span class="text-sm font-semibold text-gray-900">
                  {{ coach.id_club ? `Club ID: ${coach.id_club}` : "Sin club asignado" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div class="border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-semibold text-gray-900">Información Adicional</h3>
          </div>
          <div class="p-6">
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
                <div class="text-2xl font-bold text-green-600">{{ coach.salario ? "€" : "N/A" }}</div>
                <div class="text-sm text-green-800">Salario Configurado</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Club Information (if assigned) -->
        <div
          v-if="coach.id_club"
          class="rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div class="border-b border-gray-200 px-6 py-4">
            <h3 class="text-lg font-semibold text-gray-900">Información del Club</h3>
          </div>
          <div class="p-6">
            <div class="flex items-center space-x-4">
              <div class="h-12 w-12 flex-shrink-0">
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <span class="text-sm font-medium text-purple-600">
                    {{ club?.nombre?.charAt(0) || coach.id_club }}
                  </span>
                </div>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ club?.nombre || `Club ID: ${coach.id_club}` }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ club ? "Este entrenador trabaja para este club" : "Este entrenador está asignado a un club" }}
                </p>
                <p
                  v-if="club"
                  class="mt-1 text-xs text-gray-400"
                >
                  {{ club.ciudad }} • Fundado en {{ new Date(club.fundacion).getFullYear() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
