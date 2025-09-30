export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  console.log(`🔄 Actualizando jugador ${id}:`, JSON.stringify(body, null, 2));

  try {
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/players/${id}`;
    const updatedPlayer = await $fetch(apiUrl, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      },
      body: body
    });

    console.log(`✅ Jugador ${id} actualizado exitosamente:`, JSON.stringify(updatedPlayer, null, 2));
    return updatedPlayer;
  } catch (error: any) {
    console.error('Error updating player from API:', error);

    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el jugador",
      data: { message: error.message || "Error de conexión con la API" }
    });
  }
});
