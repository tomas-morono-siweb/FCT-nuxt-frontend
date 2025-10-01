export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { nombre, page = 1, pageSize = 20 } = query;

  try {
    // Llamada real a la API de tu compañero - el backend maneja toda la paginación y filtrado
    const apiUrl = `http://127.0.0.1:8000/players?${new URLSearchParams({
      nombre: (nombre && typeof nombre === 'string') ? nombre : '',
      page: page?.toString() || '1',
      pageSize: pageSize?.toString() || '20'
    }).toString()}`;

    console.log('Intentando conectar con API externa:', apiUrl);

    const response = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    console.log('✅ Recibiendo jugadores de la API externa');
    // El backend devuelve la respuesta ya paginada y filtrada, la devolvemos directamente
    return response;
  } catch (error: any) {
    console.error('Error al recibir jugadores de la API externa');
    return error;
  }
});
