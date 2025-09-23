<script lang="ts" setup>
const { id } = useRoute().params;
const query = ref("");
async function search() {
  const response = await $fetch(`/coaches/${id}`, {
    method: "GET",
    query: {
      id: id,
    },
  });
}
</script>

<template>
  <form @submit.prevent="search">
    <input type="text" v-model="query" />
    <button @click="search">Search</button>
  </form>
</template>

<style scoped></style>
