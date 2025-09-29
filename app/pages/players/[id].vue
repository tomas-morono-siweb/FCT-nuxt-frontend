<script setup lang="ts">
import type { Player } from "~/interfaces/player";
import type { Club } from "~/interfaces/club";
import { formatMillions } from "~/utils/format";

const route = useRoute();
const id = Number(route.params.id);
const { get: getPlayer } = usePlayers();
const { get: getClub } = useClubs();

const { data: player, pending, error } = await useAsyncData<Player>(`player:${id}`, () => getPlayer(id));

// Obtener información del club si el player tiene uno asignado
const { data: club } = await useAsyncData<Club | null>(
  `club:${player.value?.club}`,
  async () => {
    if (player.value?.club) {
      // Buscar el club por nombre en lugar de por ID
      const clubs = await useClubs().list();
      return clubs.data.find((c) => c.nombre === player.value?.club) || null;
    }
    return null;
  },
  {
    watch: [player],
  }
);
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <!-- Breadcrumb -->
      <UiBreadcrumb
        color="blue"
        class="mb-4"
        :items="[
          { label: 'Inicio', to: '/', icon: 'home' },
          { label: 'Jugadores', to: '/players', icon: 'users' },
          { label: player ? `${player.nombre} ${player.apellidos}` : 'Jugador', icon: 'user' },
        ]"
      />

      <!-- Header Section -->
      <UiDetailHeader
        title="Detalle del Jugador"
        description="Información completa del jugador seleccionado"
        :avatar-text="player ? `${player.nombre.charAt(0)}${player.apellidos.charAt(0)}` : 'J'"
        avatar-color="blue"
        :edit-to="`/players/edit-${player?.id}`"
        back-to="/players"
        :badges="player ? [...(player.dorsal ? [{ text: `${player.dorsal}`, color: 'gray' as const }] : [])] : []"
      >
        <template #title>
          {{ player ? `${player.nombre} ${player.apellidos}` : "Jugador" }}
        </template>
      </UiDetailHeader>

      <!-- Loading State -->
      <UiLoadingState
        v-if="pending"
        message="Cargando información del jugador..."
        color="blue"
      />

      <!-- Error State -->
      <UiErrorState
        v-else-if="error"
        :message="error.message"
      />

      <!-- Player Details -->
      <div
        v-else-if="player"
        class="space-y-6"
      >
        <!-- Player Information Grid -->
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- Personal Information -->
          <UiDataCard
            title="Información Personal"
            color="blue"
          >
            <UiInfoGrid
              :items="[
                { label: 'Nombre', value: player.nombre },
                { label: 'Apellidos', value: player.apellidos },
                { label: 'ID del Jugador', value: player.id },
              ]"
            />
          </UiDataCard>

          <!-- Professional Information -->
          <UiDataCard
            title="Información Deportiva"
            color="blue"
          >
            <UiInfoGrid
              :items="[
                { label: 'Dorsal', value: player.dorsal ? `#${player.dorsal}` : 'Sin dorsal asignado' },
                { label: 'Salario', value: player.salario ? formatMillions(player.salario) : 'No disponible' },
                { label: 'Club', value: player.club ? `Club: ${player.club}` : 'Sin club asignado' },
              ]"
            />
          </UiDataCard>
        </div>

        <!-- Additional Information -->
        <UiDataCard
          title="Información Adicional"
          color="blue"
        >
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-lg bg-blue-50 p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">{{ player.dorsal || "N/A" }}</div>
              <div class="text-sm text-blue-800">Dorsal Asignado</div>
            </div>
            <div class="rounded-lg bg-gray-50 p-4 text-center">
              <div class="text-2xl font-bold text-gray-600">{{ player.entrenador || "Sin asignar" }}</div>
              <div class="text-sm text-gray-800">Entrenador</div>
            </div>
            <div class="rounded-lg bg-blue-50 p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">{{ formatMillions(player.salario) }}</div>
              <div class="text-sm text-blue-800">Salario Anual</div>
            </div>
          </div>
        </UiDataCard>

        <!-- Club Information (if assigned) -->
        <UiClubInfo
          :club="club"
          :club-id="player.club"
        />
      </div>
    </div>
  </div>
</template>
