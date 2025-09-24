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
      <div class="mb-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Detalle del Club</h1>
            <p class="mt-2 text-sm text-gray-600">Información completa del club seleccionado</p>
          </div>
          <div class="flex gap-3">
            <NuxtLink
              :to="`/clubs/${club?.id}/edit`"
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
              Editar Club
            </NuxtLink>
            <NuxtLink
              to="/clubs"
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
              Volver a Clubs
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
          <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-purple-600" />
          <p class="mt-4 text-sm text-gray-500">Cargando información del club...</p>
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

      <!-- Club Details -->
      <div
        v-else-if="club"
        class="space-y-6"
      >
        <!-- Club Header Card -->
        <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div class="p-8">
            <div class="flex items-center space-x-6">
              <div class="h-20 w-20 flex-shrink-0">
                <div class="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
                  <span class="text-2xl font-bold text-purple-600">
                    {{ club.nombre.charAt(0) }}
                  </span>
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <h2 class="text-3xl font-bold text-gray-900">{{ club.nombre }}</h2>
                <div class="mt-2 flex flex-wrap gap-3">
                  <span class="inline-flex rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-800">
                    {{ club.ciudad }}
                  </span>
                  <span class="inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-800">
                    Fundado en {{ new Date(club.fundacion).getFullYear() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Club Information Grid -->
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Basic Information -->
          <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div class="border-b border-gray-200 px-6 py-4">
              <h3 class="text-lg font-semibold text-gray-900">Información Básica</h3>
            </div>
            <div class="space-y-4 p-6">
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Nombre del Club</span>
                <span class="text-sm font-semibold text-gray-900">{{ club.nombre }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Ciudad</span>
                <span class="text-sm font-semibold text-gray-900">{{ club.ciudad }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Estadio</span>
                <span class="text-sm font-semibold text-gray-900">{{ club.estadio }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Año de Fundación</span>
                <span class="text-sm font-semibold text-gray-900">{{ new Date(club.fundacion).getFullYear() }}</span>
              </div>
            </div>
          </div>

          <!-- Financial Information -->
          <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div class="border-b border-gray-200 px-6 py-4">
              <h3 class="text-lg font-semibold text-gray-900">Información Financiera</h3>
            </div>
            <div class="space-y-4 p-6">
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">Presupuesto</span>
                <span class="text-sm font-semibold text-gray-900">
                  {{ club.presupuesto ? `€${club.presupuesto.toLocaleString()}` : "No disponible" }}
                </span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm font-medium text-gray-500">ID del Club</span>
                <span class="text-sm font-semibold text-gray-900">{{ club.id }}</span>
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
              <div class="rounded-lg bg-purple-50 p-4 text-center">
                <div class="text-2xl font-bold text-purple-600">
                  {{ new Date().getFullYear() - new Date(club.fundacion).getFullYear() }}
                </div>
                <div class="text-sm text-purple-800">Años de Historia</div>
              </div>
              <div class="rounded-lg bg-gray-50 p-4 text-center">
                <div class="text-2xl font-bold text-gray-600">{{ club.ciudad.length }}</div>
                <div class="text-sm text-gray-800">Letras en Ciudad</div>
              </div>
              <div class="rounded-lg bg-purple-50 p-4 text-center">
                <div class="text-2xl font-bold text-purple-600">{{ club.nombre.length }}</div>
                <div class="text-sm text-purple-800">Letras en Nombre</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
