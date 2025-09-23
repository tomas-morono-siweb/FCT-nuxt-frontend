<script setup lang="ts">
import type { Player } from "~/interfaces/player";
const route = useRoute();
const id = Number(route.params.id);
const { get } = usePlayers();
const { data: j, pending, error } = await useAsyncData<Player>(`player:${id}`, () => get(id));
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Ficha de player</h1>
      <div class="flex gap-2">
        <NuxtLink :to="`/players/${j?.id}/editar`" class="btn btn-primary">Editar</NuxtLink>
        <NuxtLink to="/players" class="btn btn-ghost">Volver</NuxtLink>
      </div>
    </div>

    <div class="card">
      <div class="card-body space-y-3">
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <div class="text-sm text-gray-500">Nombre</div>
            <div class="text-lg font-medium">{{ j?.nombre }} {{ j?.apellido }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Posición</div>
            <div class="text-lg font-medium">{{ j?.posicion ?? "-" }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Dorsal</div>
            <div class="text-lg font-medium">{{ j?.dorsal ?? "-" }}</div>
          </div>
          <div>
            <div class="text-sm text-gray-500">Club ID</div>
            <div class="text-lg font-medium">{{ j?.clubId ?? "-" }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pending" class="text-gray-600">Cargando…</div>
    <div v-if="error" class="text-red-600">Error: {{ error.message }}</div>
  </section>
</template>
