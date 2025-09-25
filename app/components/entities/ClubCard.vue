<script setup lang="ts">
import type { Club } from "~/interfaces/club";

interface Props {
  club: Club;
  variant?: "desktop" | "mobile";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "desktop",
});

const emit = defineEmits<{
  delete: [id: string];
}>();

const handleDelete = () => {
  emit("delete", props.club.id);
};
</script>

<template>
  <!-- Desktop Table Row -->
  <tr
    v-if="variant === 'desktop'"
    class="group hover:from-accent-50/30 hover:shadow-accent-500/10 transition-all duration-300 hover:bg-gradient-to-r hover:to-transparent hover:shadow-lg"
  >
    <td class="px-8 py-6 whitespace-nowrap">
      <div class="flex items-center space-x-4">
        <div class="relative">
          <div
            class="from-accent-100 to-accent-200 ring-accent-100 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br shadow-md ring-2"
          >
            <span class="text-accent-700 text-sm font-bold">
              {{ club.nombre.charAt(0) }}
            </span>
          </div>
          <div class="bg-accent-500 absolute -right-1 -bottom-1 h-4 w-4 rounded-full ring-2 ring-white"></div>
        </div>
        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="`/clubs/${club.id}`"
            class="group-hover:text-accent-600 text-secondary-800 hover:text-accent-700 text-base font-bold transition-colors duration-300"
          >
            {{ club.nombre }}
          </NuxtLink>
          <p class="text-secondary-500 text-sm">Club</p>
        </div>
      </div>
    </td>
    <td class="px-8 py-6 whitespace-nowrap">
      <div class="flex items-center space-x-2">
        <span
          class="from-accent-100 to-accent-200 text-accent-800 ring-accent-200 inline-flex items-center rounded-xl bg-gradient-to-r px-4 py-2 text-sm font-bold shadow-sm ring-1"
        >
          <svg
            class="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {{ club.ciudad }}
        </span>
      </div>
    </td>
    <td class="px-8 py-6 whitespace-nowrap">
      <div class="flex items-center space-x-2">
        <span
          class="bg-secondary-100 text-secondary-700 inline-flex items-center rounded-lg px-3 py-1 text-sm font-semibold"
        >
          {{ club.estadio }}
        </span>
      </div>
    </td>
    <td class="px-8 py-6 whitespace-nowrap">
      <div class="flex items-center space-x-2">
        <span
          class="from-primary-100 to-primary-200 text-primary-800 ring-primary-200 inline-flex items-center rounded-xl bg-gradient-to-r px-4 py-2 text-sm font-bold shadow-sm ring-1"
        >
          <svg
            class="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {{ club.fundacion }}
        </span>
      </div>
    </td>
    <td class="px-8 py-6 text-right whitespace-nowrap">
      <div class="flex justify-end space-x-3">
        <NuxtLink
          :to="`/clubs/${club.id}/edit`"
          class="group/edit from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 inline-flex items-center rounded-xl bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          <svg
            class="mr-2 h-4 w-4"
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
          Editar
        </NuxtLink>
        <button
          class="group/delete from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 inline-flex items-center rounded-xl bg-gradient-to-r px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          @click="handleDelete"
        >
          <svg
            class="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Borrar
        </button>
      </div>
    </td>
  </tr>

  <!-- Mobile Card -->
  <div
    v-else
    class="border-secondary-200 mx-4 mb-4 rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
  >
    <div class="flex items-start justify-between">
      <div class="flex items-center space-x-3">
        <div class="h-12 w-12 flex-shrink-0">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <span class="text-sm font-medium text-orange-600">
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
            <span class="inline-flex rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
              {{ club.fundacion }}
            </span>
          </div>
          <p class="mt-1 text-sm text-gray-500">{{ club.estadio }}</p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <NuxtLink
          :to="`/clubs/${club.id}/edit`"
          class="text-sm font-medium text-blue-600 transition-colors duration-150 hover:text-blue-900"
        >
          Editar
        </NuxtLink>
        <button
          class="text-sm font-medium text-red-600 transition-colors duration-150 hover:text-red-900"
          @click="handleDelete"
        >
          Borrar
        </button>
      </div>
    </div>
  </div>
</template>
