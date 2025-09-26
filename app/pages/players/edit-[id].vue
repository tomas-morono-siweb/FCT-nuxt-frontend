<script setup lang="ts">
const route = useRoute();
const id = route.params.id;

console.log("PÁGINA DE EDICIÓN ALTERNATIVA CARGADA");
console.log("ID:", id);
console.log("Ruta completa:", route.path);
</script>

<template>
  <div class="min-h-screen bg-purple-100 p-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-4 text-4xl font-bold text-purple-800">🚨 PÁGINA DE EDICIÓN ALTERNATIVA 🚨</h1>
      <p class="mb-4 text-xl text-purple-700">ID: {{ id }}</p>
      <p class="text-lg text-purple-600">Ruta: {{ $route.path }}</p>
      <div class="mt-8 rounded-lg bg-white p-4">
        <p class="text-gray-800">Esta es una página de prueba con una ruta diferente.</p>
      </div>
    </div>
  </div>
</template>
