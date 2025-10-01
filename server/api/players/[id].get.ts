export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const apiUrl = `http://127.0.0.1:8000/players/${id}`;
    const player = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    return player;
  } catch (error) {
    console.log('Error al recibir jugador desde la API');
    return error;
  }
});
