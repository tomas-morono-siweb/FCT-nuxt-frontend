export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    console.log('Datos recibidos para crear entrenador:', body);
    const apiUrl = `http://127.0.0.1:8000/coaches`;
    const newCoach = await $fetch(apiUrl, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      },
      body: body
    });

    console.log('Respuesta de la API externa:', newCoach);
    return newCoach;
  } catch (error) {
    console.error('Error creando entrenador desde la API');
    return error;
  }
});
