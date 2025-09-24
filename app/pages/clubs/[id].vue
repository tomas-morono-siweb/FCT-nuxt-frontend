<script lang="ts" setup>
const { id } = useRoute().params;
const query = ref("");
async function search() {
  const response = await $fetch(`/clubs/${id}`, {
    method: "GET",
    query: {
      id: id,
    },
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
</template>

<style scoped></style>
