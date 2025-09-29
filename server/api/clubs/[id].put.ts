export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  console.log("=== RECIBIENDO DATOS EN SERVIDOR ===");
  console.log("Club ID:", id);
  console.log("Body recibido:", JSON.stringify(body, null, 2));
  console.log("Body keys:", Object.keys(body));
  console.log("id_club in body:", 'id_club' in body);
  console.log("club in body:", 'club' in body);

  try {
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/clubs/${id}`;
    const updatedClub = await $fetch(apiUrl, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      },
      body: body
    });

    return updatedClub;
  } catch (error: any) {
    console.error('Error updating club from API:', error);

    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el club",
      data: { message: error.message || "Error de conexión con la API" }
    });
  }
});
