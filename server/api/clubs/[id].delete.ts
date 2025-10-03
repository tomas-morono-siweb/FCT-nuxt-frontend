export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const apiUrl = `http://clubmanager/clubs/${id}`;
    await $fetch(apiUrl, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager'
      }
    });

    return { success: true, message: `Club ${id} eliminado exitosamente` };
  } catch (error) {
    console.error('Error borrando club desde la API');
    return error;
  }
});
