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

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este jugador?")) return;
  await remove(id);
  await refresh();
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <h1 class="text-2xl font-semibold">Players</h1>
      <NuxtLink to="/jugadores/nuevo" class="btn btn-primary">Nuevo jugador</NuxtLink>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div class="field">
            <label class="label">Buscar</label>
            <input v-model="q" class="input" placeholder="Nombre o apellido" />
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
                <th class="th">Player</th>
                <th class="th">Posición</th>
                <th class="th">Dorsal</th>
                <th class="th">Club</th>
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
              <tr v-else v-for="j in data" :key="j.id" class="hover:bg-gray-50">
                <td class="td font-medium">
                  <NuxtLink :to="`/players/${j.id}`" class="hover:underline">{{ j.nombre }} {{ j.apellido }}</NuxtLink>
                </td>
                <td class="td">
                  <span class="badge badge-neutral">{{ j.posicion }}</span>
                </td>
                <td class="td">{{ j.dorsal ?? "-" }}</td>
                <td class="td">{{ j.clubId ?? "-" }}</td>
                <td class="td">
                  <div class="flex justify-end gap-2">
                    <NuxtLink :to="`/players/${j.id}/editar`" class="btn btn-ghost">Editar</NuxtLink>
                    <button class="btn btn-danger" @click="onDelete(j.id)">Borrar</button>
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
