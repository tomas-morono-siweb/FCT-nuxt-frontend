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
    class="transition-colors duration-150 hover:bg-gray-50"
  >
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="h-10 w-10 flex-shrink-0">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <span class="text-sm font-medium text-blue-600">
              {{ player.nombre.charAt(0) }}{{ player.apellido.charAt(0) }}
            </span>
          </div>
        </div>
        <div class="ml-4">
          <NuxtLink
            :to="`/players/${player.id}`"
            class="text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-blue-600"
          >
            {{ player.nombre }} {{ player.apellido }}
          </NuxtLink>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
        {{ player.posicion }}
      </span>
    </td>
    <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
      {{ player.dorsal ?? "-" }}
    </td>
    <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
      {{ player.clubId ?? "-" }}
    </td>
    <td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
      <div class="flex justify-end gap-2">
        <NuxtLink
          :to="`/players/${player.id}/edit`"
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
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <span class="text-sm font-medium text-blue-600">
              {{ player.nombre.charAt(0) }}{{ player.apellido.charAt(0) }}
            </span>
          </div>
        </div>
        <div class="min-w-0 flex-1">
          <NuxtLink
            :to="`/players/${player.id}`"
            class="text-base font-medium text-gray-900 transition-colors duration-150 hover:text-blue-600"
          >
            {{ player.nombre }} {{ player.apellido }}
          </NuxtLink>
          <div class="mt-1 flex flex-wrap gap-2">
            <span class="inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              {{ player.posicion }}
            </span>
            <span
              v-if="player.dorsal"
              class="inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-800"
            >
              Dorsal {{ player.dorsal }}
            </span>
          </div>
          <p
            v-if="player.clubId"
            class="mt-1 text-sm text-gray-500"
          >
            Club: {{ player.clubId }}
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
