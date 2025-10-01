export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  try {
    const apiUrl = `http://127.0.0.1:8000/clubs/${id}`;
    const updatedClub = await $fetch(apiUrl, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      },
      body: body
    });

    return updatedClub;
  } catch (error: any) {
    console.error('Error actualizando club desde la API');
    return error;
  }
});
