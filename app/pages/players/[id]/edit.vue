<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

console.log("PÁGINA DE EDICIÓN DE PLAYER CARGADA");
console.log("ID:", id);
console.log("Ruta completa:", route.path);
</script>

<template>
  <div class="min-h-screen bg-red-100 p-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-4 text-4xl font-bold text-red-800">🚨 PÁGINA DE EDICIÓN DE PLAYER 🚨</h1>
      <p class="mb-4 text-xl text-red-700">ID del jugador: {{ id }}</p>
      <p class="text-lg text-red-600">Ruta: {{ $route.path }}</p>
      <div class="mt-8 rounded-lg bg-white p-4">
        <p class="text-gray-800">Si ves esta página, significa que el routing está funcionando correctamente.</p>
      </div>
    </div>
  </div>
</template>
