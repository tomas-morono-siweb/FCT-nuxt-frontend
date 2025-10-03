export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page = 1, pageSize = 20 } = query;

  try {
    const apiUrl = `http://api.clubmanager.com/clubs?${new URLSearchParams({
      page: page?.toString() || '1',
      pageSize: pageSize?.toString() || '20'
    }).toString()}`;

    const response = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://api.clubmanager.com'
      }
    });

    console.log('✅ Recibiendo clubes de la API externa');
    return response;
  } catch (error: any) {
    console.log('Error al recibir clubes de la API externa');
    return error;
  }
});
