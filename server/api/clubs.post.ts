export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const apiUrl = `http://clubmanager.com/clubs`;
    const newClub = await $fetch(apiUrl, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://clubmanager.com'
      },
      body: body
    });

    return newClub;
  } catch (error) {
    console.error('Error creando club desde la API');
    return error;
  }
});
