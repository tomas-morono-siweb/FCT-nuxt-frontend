export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const apiUrl = `http://clubmanager/clubs/${id}`;
    const club = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager'
      }
    });

    return club;
  } catch (error) {
    console.log('Error al recibir club desde la API');
    return error;
  }
});
