export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const { public: { apiBase } } = useRuntimeConfig();
    const apiUrl = `${apiBase+id}`;
    const player = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': `${apiBase}`,
      }
    });

    return player;
  } catch (error) {
    console.log('Error al recibir usuario desde la API');
    return error;
  }
});
