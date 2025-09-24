<!-- pages/jugadores/index.vue -->
<script setup lang="ts">
import type { Player } from "~/interfaces/player";

const q = ref("");
const page = ref(1);
const pageSize = 10;
const { list, remove } = usePlayers();
const { withLoading } = useGlobalLoading();

const key = computed(() => `players-${q.value}-${page.value}`);
const { data, pending, error, refresh } = await useAsyncData(
  key,
  () => withLoading(() => list(q.value, page.value, pageSize), "Cargando jugadores..."),
  {
    watch: [q, page],
  }
);

// Extraer datos y metadatos de paginación
const players = computed(() => data.value?.data || []);
const pagination = computed(
  () =>
    data.value?.pagination || {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    }
);

const columns = [
  { key: "nombre", label: "Jugador" },
  { key: "apellidos", label: "Apellidos" },
  { key: "dorsal", label: "Dorsal" },
  { key: "id_club", label: "Club" },
];

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este jugador?")) return;
  await withLoading(async () => {
    await remove(id);
    await refresh();
  }, "Eliminando jugador...");
}

// Función para manejar cambio de página
function onPageChange(newPage: number) {
  page.value = newPage;
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Breadcrumb -->
      <UiBreadcrumb
        color="blue"
        class="mb-4"
      />

      <!-- Header Section -->
      <UiPageHeader
        title="Jugadores"
        description="Gestiona la información de los jugadores del equipo"
        action-text="Nuevo Jugador"
        action-to="/players/new"
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
          v-for="player in players"
          :key="player.id"
          :player="player"
          variant="desktop"
          @delete="onDelete"
        />

        <!-- Mobile Cards -->
        <template #mobile>
          <EntitiesPlayerCard
            v-for="player in players"
            :key="player.id"
            :player="player"
            variant="mobile"
            @delete="onDelete"
          />
        </template>
      </UiDataTable>

      <!-- Paginación -->
      <UiPagination
        v-if="pagination.totalPages > 1"
        :current-page="pagination.currentPage"
        :total-pages="pagination.totalPages"
        :total-items="pagination.totalItems"
        :items-per-page="pagination.pageSize"
        color="blue"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>
