export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  console.log("=== RECIBIENDO DATOS EN SERVIDOR ===");
  console.log("Coach ID:", id);
  console.log("Body recibido:", JSON.stringify(body, null, 2));
  console.log("Body keys:", Object.keys(body));
  console.log("id_club in body:", 'id_club' in body);
  console.log("club in body:", 'club' in body);

  try {
    const apiUrl = `http://127.0.0.1:8000/coaches/${id}`;
    const updatedCoach = await $fetch(apiUrl, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      },
      body: body
    });

    return updatedCoach;
  } catch (error: any) {
    console.error('Error updating coach from API:', error);

    throw createError({
      statusCode: 500,
      statusMessage: "Error al actualizar el entrenador",
      data: { message: error.message || "Error de conexión con la API" }
    });
  }
});
