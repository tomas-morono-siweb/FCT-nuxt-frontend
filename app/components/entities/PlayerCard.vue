<script setup lang="ts">
import type { Player } from "~/interfaces/player";

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
    class="hover:bg-secondary-50 transition-all duration-200 hover:shadow-sm"
  >
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="h-10 w-10 flex-shrink-0">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <span class="text-sm font-medium text-blue-600">
              {{ player.nombre.charAt(0) }}{{ player.apellidos.charAt(0) }}
            </span>
          </div>
        </div>
        <div class="ml-4">
          <NuxtLink
            :to="`/players/${player.id}`"
            class="text-secondary-800 hover:text-primary-600 text-sm font-semibold transition-colors duration-200"
          >
            {{ player.nombre }} {{ player.apellidos }}
          </NuxtLink>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="bg-primary-100 text-primary-800 inline-flex rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
        {{ player.salario ? `${player.salario.toLocaleString()}€` : "Sin salario" }}
      </span>
    </td>
    <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
      {{ player.dorsal ?? "-" }}
    </td>
    <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
      {{ player.id_club ?? "-" }}
    </td>
    <td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
      <div class="flex justify-end gap-2">
        <NuxtLink
          :to="`/players/${player.id}/edit`"
          class="bg-primary-50 text-primary-700 hover:bg-primary-100 hover:text-primary-800 rounded-md px-3 py-1 text-xs font-medium transition-all duration-200"
        >
          Editar
        </NuxtLink>
        <button
          class="bg-error-50 text-error-700 hover:bg-error-100 hover:text-error-800 rounded-md px-3 py-1 text-xs font-medium transition-all duration-200"
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
              {{ player.salario ? `${player.salario.toLocaleString()}€` : "Sin salario" }}
            </span>
            <span
              v-if="player.dorsal"
              class="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800"
            >
              Dorsal {{ player.dorsal }}
            </span>
          </div>
          <p
            v-if="player.id_club"
            class="mt-1 text-sm text-gray-500"
          >
            Club: {{ player.id_club }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <NuxtLink
          :to="`/players/${player.id}/edit`"
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
