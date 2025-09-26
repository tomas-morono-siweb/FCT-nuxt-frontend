<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

console.log("PÁGINA DE EDICIÓN DE CLUB CARGADA");
console.log("ID:", id);
console.log("Ruta completa:", route.path);
</script>

<template>
  <div class="min-h-screen bg-orange-100 p-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-4 text-4xl font-bold text-orange-800">🚨 PÁGINA DE EDICIÓN DE CLUB 🚨</h1>
      <p class="mb-4 text-xl text-orange-700">ID del club: {{ id }}</p>
      <p class="text-lg text-orange-600">Ruta: {{ $route.path }}</p>
      <div class="mt-8 rounded-lg bg-white p-4">
        <p class="text-gray-800">Si ves esta página, significa que el routing está funcionando correctamente.</p>
      </div>
    </div>
  </div>
</template>
