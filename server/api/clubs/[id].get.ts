export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/clubs/${id}`;
    const club = await $fetch(apiUrl);

    return club;
  } catch (error) {
    console.error('Error fetching club from API:', error);

    throw createError({
      statusCode: 404,
      statusMessage: "No hay datos del club",
    });
  }
});
