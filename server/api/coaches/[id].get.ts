export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/coaches/${id}`;
    const coach = await $fetch(apiUrl);

    return coach;
  } catch (error) {
    console.error('Error fetching coach from API:', error);

    throw createError({
      statusCode: 404,
      statusMessage: "No hay datos del entrenador",
    });
  }
});
