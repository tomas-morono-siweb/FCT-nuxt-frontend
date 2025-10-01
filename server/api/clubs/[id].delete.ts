export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const apiUrl = `http://127.0.0.1:8000/clubs/${id}`;
    await $fetch(apiUrl, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    return { success: true, message: `Club ${id} eliminado exitosamente` };
  } catch (error) {
    console.error('Error borrando club desde la API');
    return error;
  }
});
