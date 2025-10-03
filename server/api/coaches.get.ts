export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page = 1, pageSize = 20 } = query;

  try {
    const apiUrl = `http://clubmanager.com/coaches?${new URLSearchParams({
      page: page?.toString() || '1',
      pageSize: pageSize?.toString() || '20'
    }).toString()}`;

    const response = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager.com'
      }
    });

    console.log('✅ Recibiendo entrenadores de la API');
    return response;
  } catch (error: any) {
    console.log('Error al recibir entrenadores de la API');
    return error;
  }
});
