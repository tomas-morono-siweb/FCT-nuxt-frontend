export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    console.log('Datos recibidos para crear jugador:', body);
    const apiUrl = `http://api.clubmanager.com/players`;
    const newPlayer = await $fetch(apiUrl, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://api.clubmanager.com'
      },
      body: body
    });

    console.log('Respuesta de la API externa:', newPlayer);
    return newPlayer;
  } catch (error) {
    console.error('Error creando jugador desde la API');
    return error;
  }
});
