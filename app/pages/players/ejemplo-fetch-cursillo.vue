<script setup>
import { usePlayers } from "~/composables/usePlayers";

const { list, get, create, update, remove } = usePlayers();

const query = ref("");
const players = ref([]);
async function search() {
  const { Search } = await $fetch(`/players`, {
    method: "GET",
    query: {
      query: query.value,
    },
  });
  players.value = Search;
}

async function deletePlayer(id) {
  await $fetch(`/players/${id}`, {
    method: "DELETE",
  });
}
</script>

<template>
  <form @submit.prevent="search">
    <input
      v-model="query"
      type="text"
    >
    <button @click="search">Search</button>
  </form>

  <ul>
    <li
      v-for="player in players"
      :key="player.id"
    >
      <NuxtLink :to="`/players/${player.id}`">{{ player.name }}</NuxtLink>
      <button @click="deletePlayer(player.id)">Delete</button>
    </li>
  </ul>
</template>

<style scoped></style>
