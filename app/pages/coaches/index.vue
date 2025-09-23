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

async function onDelete(id: number) {
  if (!confirm("¿Seguro que deseas borrar este entrenador?")) return;
  await remove(id);
  await refresh();
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <h1 class="text-2xl font-semibold">Entrenadores</h1>
      <NuxtLink to="/coaches/nuevo" class="btn btn-primary">Nuevo entrenador</NuxtLink>
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
                <th class="th">Entrenador</th>
                <th class="th">Nacionalidad</th>
                <th class="th">Salario</th>
                <th class="th">Club ID</th>
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
              <tr v-else v-for="coach in data" :key="coach.id" class="hover:bg-gray-50">
                <td class="td font-medium">
                  <NuxtLink :to="`/coaches/${coach.id}`" class="hover:underline">
                    {{ coach.nombre }} {{ coach.apellidos }}
                  </NuxtLink>
                </td>
                <td class="td">{{ coach.nacionalidad }}</td>
                <td class="td">€{{ coach.salario?.toLocaleString() ?? "-" }}</td>
                <td class="td">{{ coach.id_club ?? "-" }}</td>
                <td class="td">
                  <div class="flex justify-end gap-2">
                    <NuxtLink :to="`/coaches/${coach.id}/editar`" class="btn btn-ghost">Editar</NuxtLink>
                    <button class="btn btn-danger" @click="onDelete(coach.id)">Borrar</button>
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
