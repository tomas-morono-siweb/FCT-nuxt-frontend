<script setup lang="ts">
// Función simple para probar la API
const testApi = async () => {
  const results = {
    players: null as any,
    coaches: null as any,
    clubs: null as any,
    errors: [] as string[],
  };

  // Test Players
  try {
    console.log("🔍 Probando /api/players...");
    results.players = await $fetch("/api/players?page=1&pageSize=5");
    console.log("✅ Players OK:", results.players);
  } catch (error: any) {
    results.errors.push(`Players: ${error.message}`);
    console.error("❌ Players Error:", error);
  }

  // Test Coaches
  try {
    console.log("🔍 Probando /api/coaches...");
    results.coaches = await $fetch("/api/coaches?page=1&pageSize=5");
    console.log("✅ Coaches OK:", results.coaches);
  } catch (error: any) {
    results.errors.push(`Coaches: ${error.message}`);
    console.error("❌ Coaches Error:", error);
  }

  // Test Clubs
  try {
    console.log("🔍 Probando /api/clubs...");
    results.clubs = await $fetch("/api/clubs?page=1&pageSize=5");
    console.log("✅ Clubs OK:", results.clubs);
  } catch (error: any) {
    results.errors.push(`Clubs: ${error.message}`);
    console.error("❌ Clubs Error:", error);
  }

  // Guardar resultados en log
  try {
    await $fetch("/api/save-test-log", {
      method: "POST",
      body: results,
    });
    console.log("💾 Resultados guardados en log");
  } catch (error) {
    console.error("❌ Error guardando log:", error);
  }

  return results;
};

const {
  data: apiResults,
  pending,
  execute,
} = await useAsyncData("api-test", testApi, {
  server: false,
});

const { data: logStatus } = await useAsyncData("log-status", () => $fetch("/api/get-test-logs"), {
  server: false,
});

const runTest = () => {
  execute();
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-4xl">
      <h1 class="mb-8 text-3xl font-bold text-gray-900">🔍 Verificación API</h1>

      <!-- Log Status -->
      <div
        v-if="logStatus"
        class="mb-6 rounded bg-gray-100 p-4"
      >
        <h3 class="mb-2 text-lg font-medium text-gray-900">📊 Estado del Log</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="font-medium">Total de logs:</span>
            {{ logStatus.totalLogs }}
          </div>
          <div>
            <span class="font-medium">Último log:</span>
            <span
              v-if="logStatus.latestLog"
              class="text-green-600"
            >
              {{ new Date(logStatus.latestLog.timestamp).toLocaleString() }}
            </span>
            <span
              v-else
              class="text-gray-500"
            >
              Ninguno
            </span>
          </div>
        </div>
        <p class="mt-2 text-xs text-gray-600">
          💾 Los resultados se guardan automáticamente en la consola del servidor y en api-test-results.json
        </p>
      </div>

      <div class="mb-6">
        <button
          @click="runTest"
          :disabled="pending"
          class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {{ pending ? "Probando..." : "Probar API" }}
        </button>
      </div>

      <div
        v-if="pending"
        class="rounded bg-white p-6 shadow"
      >
        <p>Ejecutando pruebas...</p>
      </div>

      <div
        v-else-if="apiResults"
        class="space-y-6"
      >
        <!-- Players -->
        <div class="rounded bg-white p-6 shadow">
          <h2 class="mb-4 text-xl font-bold">Jugadores</h2>
          <div
            v-if="apiResults.players"
            class="space-y-2"
          >
            <p class="text-green-600">✅ Conectado correctamente</p>
            <p>
              <strong>Datos:</strong>
              {{ apiResults.players.players?.length || 0 }} jugadores
            </p>
            <p>
              <strong>Paginación:</strong>
              {{ apiResults.players.pagination ? "Sí" : "No" }}
            </p>
            <details class="mt-4">
              <summary class="cursor-pointer text-blue-600">Ver estructura completa</summary>
              <pre class="mt-2 overflow-auto rounded bg-gray-100 p-4 text-sm">{{
                JSON.stringify(apiResults.players, null, 2)
              }}</pre>
            </details>
          </div>
          <div
            v-else
            class="text-red-600"
          >
            ❌ Error en conexión
          </div>
        </div>

        <!-- Coaches -->
        <div class="rounded bg-white p-6 shadow">
          <h2 class="mb-4 text-xl font-bold">Entrenadores</h2>
          <div
            v-if="apiResults.coaches"
            class="space-y-2"
          >
            <p class="text-green-600">✅ Conectado correctamente</p>
            <p>
              <strong>Datos:</strong>
              {{ apiResults.coaches.coaches?.length || 0 }} entrenadores
            </p>
            <p>
              <strong>Paginación:</strong>
              {{ apiResults.coaches.pagination ? "Sí" : "No" }}
            </p>
            <details class="mt-4">
              <summary class="cursor-pointer text-blue-600">Ver estructura completa</summary>
              <pre class="mt-2 overflow-auto rounded bg-gray-100 p-4 text-sm">{{
                JSON.stringify(apiResults.coaches, null, 2)
              }}</pre>
            </details>
          </div>
          <div
            v-else
            class="text-red-600"
          >
            ❌ Error en conexión
          </div>
        </div>

        <!-- Clubs -->
        <div class="rounded bg-white p-6 shadow">
          <h2 class="mb-4 text-xl font-bold">Clubes</h2>
          <div
            v-if="apiResults.clubs"
            class="space-y-2"
          >
            <p class="text-green-600">✅ Conectado correctamente</p>
            <p>
              <strong>Datos:</strong>
              {{ apiResults.clubs.clubs?.length || 0 }} clubes
            </p>
            <p>
              <strong>Paginación:</strong>
              {{ apiResults.clubs.pagination ? "Sí" : "No" }}
            </p>
            <details class="mt-4">
              <summary class="cursor-pointer text-blue-600">Ver estructura completa</summary>
              <pre class="mt-2 overflow-auto rounded bg-gray-100 p-4 text-sm">{{
                JSON.stringify(apiResults.clubs, null, 2)
              }}</pre>
            </details>
          </div>
          <div
            v-else
            class="text-red-600"
          >
            ❌ Error en conexión
          </div>
        </div>

        <!-- Errors -->
        <div
          v-if="apiResults.errors.length > 0"
          class="rounded bg-red-50 p-6 shadow"
        >
          <h2 class="mb-4 text-xl font-bold text-red-800">Errores</h2>
          <ul class="space-y-2">
            <li
              v-for="error in apiResults.errors"
              :key="error"
              class="text-red-600"
            >
              ❌ {{ error }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
