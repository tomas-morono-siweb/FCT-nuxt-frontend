<script setup lang="ts">
import type { Player } from "~/interfaces/player";
import { formatMillions } from "~/utils/format";

interface Props {
  player: Player;
  variant?: "desktop" | "mobile";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "desktop",
});

const emit = defineEmits<{
  delete: [id: number];
}>();

const handleDelete = () => {
  emit("delete", props.player.id);
};
</script>

<template>
  <!-- Desktop Table Row -->
  <tr
    v-if="variant === 'desktop'"
    class="group transition-all duration-200 hover:bg-blue-50/30"
  >
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center space-x-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <span class="text-sm font-semibold text-blue-700">
            {{ player.nombre.charAt(0) }}{{ player.apellidos.charAt(0) }}
          </span>
        </div>
        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="`/players/${player.id}`"
            class="text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-blue-600"
          >
            {{ player.nombre }} {{ player.apellidos }}
          </NuxtLink>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        {{ player.salario ? formatMillions(player.salario) : "Sin salario" }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
        {{ player.dorsal ?? "-" }}
      </span>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span
        class="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800"
      >
        {{ player.club ?? "-" }}
      </span>
    </td>
    <td class="px-6 py-4 text-right whitespace-nowrap">
      <div class="flex justify-end space-x-2">
        <NuxtLink
          :to="`/players/edit-${player.id}`"
          class="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-blue-700"
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
    class="mx-4 mb-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
  >
    <div class="flex items-start justify-between">
      <div class="flex items-center space-x-3">
        <div class="h-12 w-12 flex-shrink-0">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <span class="text-sm font-medium text-blue-600">
              {{ player.nombre.charAt(0) }}{{ player.apellidos.charAt(0) }}
            </span>
          </div>
        </div>
        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="`/players/${player.id}`"
            class="text-base font-medium text-gray-900 transition-colors duration-150 hover:text-blue-600"
          >
            {{ player.nombre }} {{ player.apellidos }}
          </NuxtLink>
          <div class="mt-1 flex flex-wrap gap-2">
            <span class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              {{ player.salario ? formatMillions(player.salario) : "Sin salario" }}
            </span>
            <span
              v-if="player.dorsal"
              class="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800"
            >
              Dorsal {{ player.dorsal }}
            </span>
          </div>
          <p
            v-if="player.club"
            class="mt-1 text-sm text-gray-500"
          >
            Club: {{ player.club }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <NuxtLink
          :to="`/players/edit-${player.id}`"
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
