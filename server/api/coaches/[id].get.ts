export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const apiUrl = `http://clubmanager/coaches/${id}`;
    const coach = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager'
      }
    });

    return coach;
  } catch (error) {
    console.log('Error al recibir entrenador desde la API');
    return error;
  }
});
