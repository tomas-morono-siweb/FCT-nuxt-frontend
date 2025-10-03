export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  try {
    const apiUrl = `http://api.clubmanager.com/clubs/${id}`;
    const updatedClub = await $fetch(apiUrl, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://api.clubmanager.com'
      },
      body: body
    });

    return updatedClub;
  } catch (error: any) {
    console.error('Error actualizando club desde la API');
    return error;
  }
});
