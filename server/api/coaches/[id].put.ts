export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  console.log(`🔄 Actualizando entrenador ${id}:`, JSON.stringify(body, null, 2));

  try {
    const apiUrl = `http://clubmanager.com/coaches/${id}`;
    const updatedCoach = await $fetch(apiUrl, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager.com'
      },
      body: body
    });

    return updatedCoach;
  } catch (error: any) {
    console.error('Error actualizando entrenador desde la API');
    return error;
  }
});
