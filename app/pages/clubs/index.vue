<script setup lang="ts">
import type { Club } from "~/interfaces/club";

const q = ref("");
const page = ref(1);
const pageSize = 10;
const { list, remove } = useClubs();

const key = computed(() => `clubs-${q.value}-${page.value}`);
const { data, pending, error, refresh } = await useAsyncData<Club[]>(key, () => list(q.value, page.value, pageSize), {
  watch: [q, page],
});

const columns = [
  { key: "nombre", label: "Club" },
  { key: "ciudad", label: "Ciudad" },
  { key: "estadio", label: "Estadio" },
  { key: "fundacion", label: "Fundación" },
];

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este club?")) return;
  await remove(id);
  await refresh();
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Header Section -->
      <UiPageHeader
        title="Clubs"
        description="Gestiona la información de los clubs del equipo"
        action-text="Nuevo Club"
        action-to="/clubs/new"
        action-icon="plus"
      />

      <!-- Search Section -->
      <UiSearchSection
        v-model="q"
        label="Buscar club"
        placeholder="Nombre del club..."
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
          v-for="club in data"
          :key="club.id"
          :club="club"
          variant="desktop"
          @delete="onDelete"
        />

        <!-- Mobile Cards -->
        <template #mobile>
          <EntitiesClubCard
            v-for="club in data"
            :key="club.id"
            :club="club"
            variant="mobile"
            @delete="onDelete"
          />
        </template>
      </UiDataTable>
    </div>
  </div>
</template>

<style scoped></style>
