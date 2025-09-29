<script setup lang="ts">
import type { Coach } from "~/interfaces/coach";
import type { Club } from "~/interfaces/club";
import { formatMillions } from "~/utils/format";

interface Props {
  coach: Coach;
  variant?: "desktop" | "mobile";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "desktop",
});

const emit = defineEmits<{
  delete: [id: number];
}>();

const handleDelete = () => {
  emit("delete", props.coach.id);
};

// Obtener información del club
const { data: clubsResponse } = await useAsyncData("clubs", () => useClubs().list());
const clubs = computed(() => clubsResponse.value?.data || []);

// Computed para obtener el nombre del club
const clubName = computed(() => {
  if (!props.coach.id_club) return null;
  const club = clubs.value.find((c) => c.id_club === props.coach.id_club);
  return club ? club.nombre : props.coach.id_club;
});
</script>

<template>
  <!-- Desktop Table Row -->
  <tr
    v-if="variant === 'desktop'"
    class="group transition-all duration-200 hover:bg-green-50/30"
  >
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
          <span class="text-sm font-semibold text-green-700">
            {{ coach.nombre.charAt(0) }}{{ coach.apellidos.charAt(0) }}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="`/coaches/${coach.id}`"
            class="text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-green-600"
          >
            {{ coach.nombre }} {{ coach.apellidos }}
          </NuxtLink>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-2">
        <span
          class="bg-secondary-100 text-secondary-700 inline-flex items-center rounded-lg px-3 py-1 text-sm font-semibold"
        >
          {{ coach.dni }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
        {{ coach.salario ? formatMillions(coach.salario) : "-" }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-2">
        <span
          class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
        >
          {{ clubName ?? "-" }}
        </span>
      </div>
    </td>
    <td class="px-6 py-4 text-right whitespace-nowrap">
      <div class="flex justify-end space-x-2">
        <NuxtLink
          :to="`/coaches/edit-${coach.id}`"
          class="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-green-700"
        >
          Editar
        </NuxtLink>
        <button
          class="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700"
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
    class="border-secondary-200 mx-4 mb-4 rounded-xl border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
  >
    <div class="flex items-start justify-between">
      <div class="flex items-center space-x-3">
        <div class="h-12 w-12 flex-shrink-0">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <span class="text-sm font-medium text-green-600">
              {{ coach.nombre.charAt(0) }}{{ coach.apellidos.charAt(0) }}
            </span>
          </div>
        </div>
        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="`/coaches/${coach.id}`"
            class="text-base font-medium text-gray-900 transition-colors duration-150 hover:text-blue-600"
          >
            {{ coach.nombre }} {{ coach.apellidos }}
          </NuxtLink>
          <div class="mt-1 flex flex-wrap gap-2">
            <span class="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800">
              {{ coach.dni }}
            </span>
            <span
              v-if="coach.salario"
              class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800"
            >
              {{ formatMillions(coach.salario) }}
            </span>
          </div>
          <p
            v-if="clubName"
            class="mt-1 text-sm text-gray-500"
          >
            Club: {{ clubName }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <NuxtLink
          :to="`/coaches/edit-${coach.id}`"
          class="text-sm font-medium text-green-600 transition-colors duration-150 hover:text-green-900"
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
