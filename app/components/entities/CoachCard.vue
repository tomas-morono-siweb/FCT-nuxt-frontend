<script setup lang="ts">
import type { Coach } from "~/interfaces/coach";

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
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <span class="text-sm font-medium text-green-600">
              {{ coach.nombre.charAt(0) }}{{ coach.apellidos.charAt(0) }}
            </span>
          </div>
        </div>
        <div class="ml-4">
          <NuxtLink
            :to="`/coaches/${coach.id}`"
            class="text-sm font-medium text-gray-900 transition-colors duration-150 hover:text-blue-600"
          >
            {{ coach.nombre }} {{ coach.apellidos }}
          </NuxtLink>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
      {{ coach.dni }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <span class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
        {{ coach.nacionalidad }}
      </span>
    </td>
    <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
      {{ coach.salario ? `€${coach.salario.toLocaleString()}` : "-" }}
    </td>
    <td class="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
      {{ coach.id_club ?? "-" }}
    </td>
    <td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
      <div class="flex justify-end gap-2">
        <NuxtLink
          :to="`/coaches/${coach.id}/edit`"
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
              {{ coach.nacionalidad }}
            </span>
            <span
              v-if="coach.salario"
              class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800"
            >
              €{{ coach.salario.toLocaleString() }}
            </span>
          </div>
          <p
            v-if="coach.id_club"
            class="mt-1 text-sm text-gray-500"
          >
            Club ID: {{ coach.id_club }}
          </p>
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <NuxtLink
          :to="`/coaches/${coach.id}/edit`"
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
