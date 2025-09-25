export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/players`;
    const newPlayer = await $fetch(apiUrl, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      },
      body: body
    });

    return newPlayer;
  } catch (error) {
    console.error('Error creating player from API:', error);

    throw createError({
      statusCode: 500,
      statusMessage: "Error al crear el jugador",
    });
  }
});
