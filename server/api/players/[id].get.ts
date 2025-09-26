export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    console.log(`Obteniendo jugador con ID: ${id}`);
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/players/${id}`;
    console.log(`URL de la API: ${apiUrl}`);
    const player = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    console.log('Jugador obtenido:', player);
    return player;
  } catch (error) {
    console.error('Error fetching player from API:', error);

    throw createError({
      statusCode: 404,
      statusMessage: "No hay datos del jugador",
    });
  }
});
