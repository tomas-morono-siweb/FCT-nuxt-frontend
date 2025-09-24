<script setup lang="ts">
import type { Coach } from "~/interfaces/coach";

const q = ref("");
const page = ref(1);
const pageSize = 10;
const { list, remove } = useCoaches();

const key = computed(() => `coaches-${q.value}-${page.value}`);
const { data, pending, error, refresh } = await useAsyncData<Coach[]>(key, () => list(q.value, page.value, pageSize), {
  watch: [q, page],
});

const columns = [
  { key: "nombre", label: "Entrenador" },
  { key: "dni", label: "DNI" },
  { key: "nacionalidad", label: "Nacionalidad" },
  { key: "salario", label: "Salario" },
  { key: "id_club", label: "Club ID" },
];

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este entrenador?")) return;
  await remove(id);
  await refresh();
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Header Section -->
      <UiPageHeader
        title="Entrenadores"
        description="Gestiona la información de los entrenadores del equipo"
        action-text="Nuevo Entrenador"
        action-to="/coaches/new"
        action-icon="plus"
      />

      <!-- Search Section -->
      <UiSearchSection
        v-model="q"
        label="Buscar entrenador"
        placeholder="Nombre o apellido del entrenador..."
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
          v-for="coach in data"
          :key="coach.id"
          :coach="coach"
          variant="desktop"
          @delete="onDelete"
        />

        <!-- Mobile Cards -->
        <template #mobile>
          <EntitiesCoachCard
            v-for="coach in data"
            :key="coach.id"
            :coach="coach"
            variant="mobile"
            @delete="onDelete"
          />
        </template>
      </UiDataTable>
    </div>
  </div>
</template>

<style scoped></style>
