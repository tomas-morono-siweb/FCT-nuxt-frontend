export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const apiUrl = `http://clubmanager/coaches/${id}`;
    await $fetch(apiUrl, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager'
      }
    });

    return { success: true, message: `Entrenador ${id} eliminado exitosamente` };
  } catch (error) {
    console.error('Error borrando entrenador desde la API');
    return error;
  }
});
