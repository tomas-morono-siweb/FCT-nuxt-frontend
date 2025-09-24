<script setup lang="ts">
import type { Club } from "~/interfaces/club";

interface Props {
  club: Club | null | undefined;
  clubId?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <UiDataCard
    v-if="clubId"
    color="orange"
  >
    <div class="-mx-8 -mt-8 mb-8 border-b border-gray-200 px-6 py-4">
      <h3 class="text-lg font-semibold text-gray-900">Información del Club</h3>
    </div>
    <div class="flex items-center space-x-4">
      <div class="h-12 w-12 flex-shrink-0">
        <div class="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <span class="text-sm font-medium text-orange-600">
            {{ club?.nombre?.charAt(0) || clubId }}
          </span>
        </div>
      </div>
      <div>
        <p class="text-sm font-medium text-gray-900">
          {{ club?.nombre || `Club ID: ${clubId}` }}
        </p>
        <p class="text-sm text-gray-500">
          {{ club ? "Este elemento está asignado a este club" : "Este elemento está asignado a un club" }}
        </p>
        <p
          v-if="club"
          class="mt-1 text-xs text-gray-400"
        >
          {{ club.ciudad }} • Fundado en {{ club.fundacion }}
        </p>
      </div>
    </div>
  </UiDataCard>
</template>
