export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    console.log(`Obteniendo club con ID: ${id}`);
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/clubs/${id}`;
    console.log(`URL de la API: ${apiUrl}`);
    const club = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    console.log('Club obtenido:', club);
    return club;
  } catch (error) {
    console.error('Error fetching club from API:', error);

    throw createError({
      statusCode: 404,
      statusMessage: "No hay datos del club",
    });
  }
});
