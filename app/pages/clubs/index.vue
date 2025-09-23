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

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este club?")) return;
  await remove(id);
  await refresh();
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <h1 class="text-2xl font-semibold">Clubs</h1>
      <NuxtLink to="/clubs/nuevo" class="btn btn-primary">Nuevo club</NuxtLink>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div class="field">
            <label class="label">Buscar</label>
            <input v-model="q" class="input" placeholder="Nombre del club" />
          </div>
        </div>
      </div>
    </div>

    <div class="card overflow-hidden">
      <div class="card-body p-0">
        <div class="overflow-x-auto">
          <table class="table">
            <thead class="bg-gray-50">
              <tr>
                <th class="th">Club</th>
                <th class="th">Ciudad</th>
                <th class="th">Estadio</th>
                <th class="th">Fundación</th>
                <th class="th text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-if="pending">
                <td class="td" colspan="5">Cargando…</td>
              </tr>
              <tr v-else-if="error">
                <td class="td text-red-600" colspan="5">Error: {{ error.message }}</td>
              </tr>
              <tr v-else v-for="club in data" :key="club.id" class="hover:bg-gray-50">
                <td class="td font-medium">
                  <NuxtLink :to="`/clubs/${club.id}`" class="hover:underline">{{ club.nombre }}</NuxtLink>
                </td>
                <td class="td">{{ club.ciudad }}</td>
                <td class="td">{{ club.estadio }}</td>
                <td class="td">{{ new Date(club.fundacion).getFullYear() }}</td>
                <td class="td">
                  <div class="flex justify-end gap-2">
                    <NuxtLink :to="`/clubs/${club.id}/editar`" class="btn btn-ghost">Editar</NuxtLink>
                    <button class="btn btn-danger" @click="onDelete(club.id)">Borrar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
