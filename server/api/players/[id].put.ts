export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  console.log(`🔄 Actualizando jugador ${id}:`, JSON.stringify(body, null, 2));

  try {
    const apiUrl = `http://clubmanager/players/${id}`;
    const updatedPlayer = await $fetch(apiUrl, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager'
      },
      body: body
    });

    return updatedPlayer;
  } catch (error: any) {
    console.error('Error actualizando jugador desde la API');
    return error;
  }
});
