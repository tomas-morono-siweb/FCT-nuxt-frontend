export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    const apiUrl = `http://api.clubmanager.com/coaches/${id}`;
    const coach = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://api.clubmanager.com'
      }
    });

    return coach;
  } catch (error) {
    console.log('Error al recibir entrenador desde la API');
    return error;
  }
});
