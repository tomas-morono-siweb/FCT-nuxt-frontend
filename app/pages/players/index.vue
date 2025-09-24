<!-- pages/jugadores/index.vue -->
<script setup lang="ts">
import type { Player } from "~/interfaces/player";

const q = ref("");
const page = ref(1);
const pageSize = 10;
const { list, remove } = usePlayers();

const key = computed(() => `players-${q.value}-${page.value}`);
const { data, pending, error, refresh } = await useAsyncData<Player[]>(key, () => list(q.value, page.value, pageSize), {
  watch: [q, page],
});

const columns = [
  { key: "nombre", label: "Jugador" },
  { key: "posicion", label: "Posición" },
  { key: "dorsal", label: "Dorsal" },
  { key: "clubId", label: "Club" },
];

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este jugador?")) return;
  await remove(id);
  await refresh();
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Header Section -->
      <UiPageHeader
        title="Jugadores"
        description="Gestiona la información de los jugadores del equipo"
        action-text="Nuevo Jugador"
        action-to="/players/nuevo"
        action-icon="plus"
      />

      <!-- Search Section -->
      <UiSearchSection
        v-model="q"
        label="Buscar jugador"
        placeholder="Nombre o apellido del jugador..."
      />

      <!-- Players Section -->
      <UiDataTable
        :columns="columns"
        :loading="pending"
        :error="error?.message"
        loading-message="Cargando jugadores..."
      >
        <!-- Desktop Table Rows -->
        <EntitiesPlayerCard
          v-for="player in data"
          :key="player.id"
          :player="player"
          variant="desktop"
          @delete="onDelete"
        />

        <!-- Mobile Cards -->
        <template #mobile>
          <EntitiesPlayerCard
            v-for="player in data"
            :key="player.id"
            :player="player"
            variant="mobile"
            @delete="onDelete"
          />
        </template>
      </UiDataTable>
    </div>
  </div>
</template>
