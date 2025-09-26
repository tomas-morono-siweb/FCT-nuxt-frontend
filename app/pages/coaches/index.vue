<script setup lang="ts">
import type { Coach } from "~/interfaces/coach";

const page = ref(1);
const pageSize = 10;
const { list, remove } = useCoaches();
const { withLoading } = useGlobalLoading();

const key = computed(() => `coaches-${page.value}`);
const { data, pending, error, refresh } = await useAsyncData(
  key,
  () => withLoading(() => list(page.value, pageSize), "Cargando entrenadores..."),
  {
    watch: [page],
  }
);

// Extraer datos y metadatos de paginación
const coaches = computed(() => data.value?.data || []);
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
  { key: "nombre", label: "Entrenador" },
  { key: "dni", label: "DNI" },
  { key: "salario", label: "Salario" },
  { key: "club", label: "Club" },
];

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este entrenador?")) return;
  await withLoading(async () => {
    await remove(id);

    // Invalidar cache específico del entrenador eliminado
    await clearNuxtData(`coach:${id}`);

    // Refrescar la lista
    await refresh();
  }, "Eliminando entrenador...");
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
        color="green"
        class="mb-4"
      />

      <!-- Header Section -->
      <UiPageHeader
        title="Entrenadores"
        description="Gestiona la información de los entrenadores del equipo"
        action-text="Nuevo Entrenador"
        action-to="/coaches/new"
        action-icon="plus"
      />

      <!-- Coaches Section -->
      <UiDataTable
        :columns="columns"
        :loading="pending"
        :error="error?.message"
        loading-message="Cargando entrenadores..."
      >
        <!-- Desktop Table Rows -->
        <EntitiesCoachCard
          v-for="coach in coaches"
          :key="coach.id"
          :coach="coach"
          variant="desktop"
          @delete="onDelete"
        />

        <!-- Mobile Cards -->
        <template #mobile>
          <EntitiesCoachCard
            v-for="coach in coaches"
            :key="coach.id"
            :coach="coach"
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
        color="green"
        @page-change="onPageChange"
      />
    </div>
  </div>
</template>

<style scoped></style>
