export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const apiUrl = `http://clubmanager/players/${id}`;
    const player = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager'
      }
    });

    return player;
  } catch (error) {
    console.log('Error al recibir jugador desde la API');
    return error;
  }
});
