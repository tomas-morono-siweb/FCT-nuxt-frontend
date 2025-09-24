<script setup lang="ts">
import type { Club } from "~/interfaces/club";

const q = ref("");
const page = ref(1);
const pageSize = 10;
const { list, remove } = useClubs();

const key = computed(() => `clubs-${q.value}-${page.value}`);
const { data, pending, error, refresh } = await useAsyncData<Club[]>(key, () => list(q.value, page.value, pageSize), {
  watch: [q, page],
});

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este club?")) return;
  await remove(id);
  await refresh();
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Header Section -->
      <div class="mb-8">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Clubs</h1>
            <p class="mt-2 text-sm text-gray-600">Gestiona la información de los clubs del equipo</p>
          </div>
          <NuxtLink
            to="/clubs/new"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo Club
          </NuxtLink>
        </div>
      </div>

      <!-- Search Section -->
      <div class="mb-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div class="p-6">
          <div class="flex flex-col gap-4 sm:flex-row">
            <div class="flex-1">
              <label class="mb-2 block text-sm font-medium text-gray-700">Buscar club</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  v-model="q"
                  class="block w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 transition-colors duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del club..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Clubs Section -->
      <div class="rounded-xl border border-gray-200 bg-white shadow-sm">
        <!-- Desktop Table View -->
        <div class="hidden lg:block">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Club</th>
                  <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Ciudad</th>
                  <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Estadio
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Fundación
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <!-- Loading State -->
                <tr v-if="pending">
                  <td
                    colspan="5"
                    class="px-6 py-12 text-center"
                  >
                    <div class="flex flex-col items-center">
                      <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
                      <p class="mt-2 text-sm text-gray-500">Cargando clubs...</p>
                    </div>
                  </td>
                </tr>

                <!-- Error State -->
                <tr v-else-if="error">
                  <td
                    colspan="5"
                    class="px-6 py-12 text-center"
                  >
                    <div class="flex flex-col items-center">
                      <svg
                        class="mb-4 h-12 w-12 text-red-400"
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
                  </td>
                </tr>

                <!-- Clubs Data -->
                <tr
                  v-for="club in data"
                  v-else
                  :key="club.id"
                  class="transition-colors duration-150 hover:bg-gray-50"
                >
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="h-10 w-10 flex-shrink-0">
                        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                          <span class="text-sm font-medium text-purple-600">
                            {{ club.nombre.charAt(0) }}
                          </span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <NuxtLink
                          :to="`/clubs/${club.id}`"
                          class="text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-blue-600"
                        >
                          {{ club.nombre }}
                        </NuxtLink>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-800"
                    >
                      {{ club.ciudad }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{{ club.estadio }}</td>
                  <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {{ new Date(club.fundacion).getFullYear() }}
                  </td>
                  <td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div class="flex justify-end gap-2">
                      <NuxtLink
                        :to="`/clubs/${club.id}/edit`"
                        class="text-blue-600 transition-colors duration-150 hover:text-blue-900"
                      >
                        Editar
                      </NuxtLink>
                      <button
                        class="text-red-600 transition-colors duration-150 hover:text-red-900"
                        @click="onDelete(club.id)"
                      >
                        Borrar
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Mobile Card View -->
        <div class="lg:hidden">
          <!-- Loading State -->
          <div
            v-if="pending"
            class="p-6 text-center"
          >
            <div class="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
            <p class="mt-2 text-sm text-gray-500">Cargando clubs...</p>
          </div>

          <!-- Error State -->
          <div
            v-else-if="error"
            class="p-6 text-center"
          >
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

          <!-- Clubs Cards -->
          <div
            v-else
            class="divide-y divide-gray-200"
          >
            <div
              v-for="club in data"
              :key="club.id"
              class="p-6 transition-colors duration-150 hover:bg-gray-50"
            >
              <div class="flex items-start justify-between">
                <div class="flex items-center space-x-3">
                  <div class="h-12 w-12 flex-shrink-0">
                    <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                      <span class="text-sm font-medium text-purple-600">
                        {{ club.nombre.charAt(0) }}
                      </span>
                    </div>
                  </div>
                  <div class="min-w-0 flex-1">
                    <NuxtLink
                      :to="`/clubs/${club.id}`"
                      class="text-base font-medium text-gray-900 transition-colors duration-150 hover:text-blue-600"
                    >
                      {{ club.nombre }}
                    </NuxtLink>
                    <div class="mt-1 flex flex-wrap gap-2">
                      <span class="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
                        {{ club.ciudad }}
                      </span>
                      <span
                        class="inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-800"
                      >
                        {{ new Date(club.fundacion).getFullYear() }}
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{ club.estadio }}</p>
                  </div>
                </div>
                <div class="flex flex-col gap-2">
                  <NuxtLink
                    :to="`/clubs/${club.id}/editar`"
                    class="text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-900"
                  >
                    Editar
                  </NuxtLink>
                  <button
                    class="text-sm font-medium text-red-600 transition-colors duration-150 hover:text-red-900"
                    @click="onDelete(club.id)"
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
