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
  delete: [id: number];
}>();

const handleDelete = () => {
  emit("delete", props.club.id);
};
</script>

<template>
  <!-- Desktop Table Row -->
  <tr
    v-if="variant === 'desktop'"
    class="transition-colors duration-150 hover:bg-gray-50"
  >
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="h-10 w-10 flex-shrink-0">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
            <span class="text-sm font-medium text-orange-600">
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
      <span class="inline-flex rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-800">
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
          @click="handleDelete"
        >
          Borrar
        </button>
      </div>
    </td>
  </tr>

  <!-- Mobile Card -->
  <div
    v-else
    class="p-6 transition-colors duration-150 hover:bg-gray-50"
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
              {{ new Date(club.fundacion).getFullYear() }}
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
