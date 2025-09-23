<script lang="ts" setup>
const query = ref('');
async function search() {
    const response = await $fetch(`/players`, {
        method: 'GET',
        query: {
            query: query.value
        }
    });
}
</script>

<template>
    <form @submit.prevent="search">
        <input type="text" v-model="query" />
        <button @click="search">Search</button>
    </form>
</template>

<style scoped>

</style>