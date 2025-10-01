export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const apiUrl = `http://127.0.0.1:8000/clubs`;
    const newClub = await $fetch(apiUrl, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      },
      body: body
    });

    return newClub;
  } catch (error) {
    console.error('Error creando club desde la API');
    return error;
  }
});
