export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/players/${id}`;
    await $fetch(apiUrl, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    return { success: true, message: `Jugador ${id} eliminado exitosamente` };
  } catch (error) {
    console.error('Error deleting player from API:', error);

    throw createError({
      statusCode: 500,
      statusMessage: "Error al eliminar el jugador",
    });
  }
});
