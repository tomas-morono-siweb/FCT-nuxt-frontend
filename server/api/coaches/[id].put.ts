export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  console.log(`🔄 Actualizando entrenador ${id}:`, JSON.stringify(body, null, 2));

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

    console.log(`✅ Entrenador ${id} actualizado exitosamente:`, JSON.stringify(updatedCoach, null, 2));
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
