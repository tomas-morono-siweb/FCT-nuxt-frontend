<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

console.log("PÁGINA DE EDICIÓN DE COACH CARGADA");
console.log("ID:", id);
console.log("Ruta completa:", route.path);
</script>

<template>
  <div class="min-h-screen bg-green-100 p-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-4 text-4xl font-bold text-green-800">🚨 PÁGINA DE EDICIÓN DE COACH 🚨</h1>
      <p class="mb-4 text-xl text-green-700">ID del entrenador: {{ id }}</p>
      <p class="text-lg text-green-600">Ruta: {{ $route.path }}</p>
      <div class="mt-8 rounded-lg bg-white p-4">
        <p class="text-gray-800">Si ves esta página, significa que el routing está funcionando correctamente.</p>
      </div>
    </div>
  </div>
</template>
