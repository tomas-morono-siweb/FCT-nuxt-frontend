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
          <div class="mt-1">
            <span
              class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
            >
              Entrenador
            </span>
          </div>
        </div>
      </div>
    </td>
    <td class="px-8 py-6 whitespace-nowrap">
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
        {{ coach.salario ? `€${coach.salario.toLocaleString()}` : "-" }}
      </span>
    </td>
    <td class="px-8 py-6 whitespace-nowrap">
      <div class="flex items-center space-x-2">
        <span
          class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
        >
          {{ coach.club ?? "-" }}
        </span>
      </div>
    </td>
    <td class="px-8 py-6 text-right whitespace-nowrap">
      <div class="flex justify-end space-x-3">
        <NuxtLink
          :to="`/coaches/${coach.id}/edit`"
          class="inline-flex items-center rounded-md bg-green-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-green-700"
        >
          Editar
        </NuxtLink>
        <button
          class="inline-flex items-center rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700"
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
              €{{ coach.salario.toLocaleString() }}
            </span>
          </div>
          <p
            v-if="coach.club"
            class="mt-1 text-sm text-gray-500"
          >
            Club: {{ coach.club }}
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
