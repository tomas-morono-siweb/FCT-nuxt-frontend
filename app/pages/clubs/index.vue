<script setup lang="ts">
import type { Club } from "~/interfaces/club";

const page = ref(1);
const pageSize = 20;
const { list, remove } = useClubs();
const { withLoading } = useGlobalLoading();

const key = computed(() => `clubs-${page.value}`);
const { data, pending, error, refresh } = await useAsyncData(
  key,
  () => withLoading(() => list(page.value, pageSize), "Cargando clubes..."),
  {
    watch: [page],
  }
);

// Extraer datos y metadatos de paginación
const clubs = computed(() => data.value?.data || []);
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
  { key: "nombre", label: "Club" },
  { key: "ciudad", label: "Ciudad" },
  { key: "estadio", label: "Estadio" },
  { key: "fundacion", label: "Fundación" },
];

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este club?")) return;
  await withLoading(async () => {
    await remove(id);

    // Invalidar cache específico del club eliminado
    await clearNuxtData(`club:${id}`);

    // Refrescar la lista
    await refresh();
  }, "Eliminando club...");
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
        color="orange"
        class="mb-4"
        :items="[
          { label: 'Inicio', to: '/', icon: 'home' },
          { label: 'Clubs', to: '', icon: 'users' },
        ]"
      />

      <!-- Header Section -->
      <UiPageHeader
        title="Clubs"
        description="Gestiona la información de los clubs del equipo"
        action-text="Nuevo Club"
        action-to="/clubs/new"
        action-icon="plus"
      />

      <!-- Clubs Section -->
      <UiDataTable
        :columns="columns"
        :loading="pending"
        :error="error?.message"
        loading-message="Cargando clubs..."
      >
        <!-- Desktop Table Rows -->
        <EntitiesClubCard
          v-for="club in clubs"
          :key="club.id"
          :club="club"
          variant="desktop"
          @delete="onDelete"
        />

        <!-- Mobile Cards -->
        <template #mobile>
          <EntitiesClubCard
            v-for="club in clubs"
            :key="club.id"
            :club="club"
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
        color="orange"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
