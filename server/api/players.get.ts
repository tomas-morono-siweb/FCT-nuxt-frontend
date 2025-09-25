export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { nombre, page = 1, pageSize = 10 } = query;

  try {
    // Llamada real a la API de tu compañero - el backend maneja toda la paginación y filtrado
    const apiUrl = `http://127.0.0.1:8000/players?${new URLSearchParams({
      nombre: (nombre && typeof nombre === 'string') ? nombre : '',
      page: page?.toString() || '1',
      pageSize: pageSize?.toString() || '10'
    }).toString()}`;

    const response = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    // El backend devuelve la respuesta ya paginada y filtrada, la devolvemos directamente
    return response;
  } catch (error: any) {
    console.error('Error fetching players from API:', error);

    // Devolver respuesta vacía con mensaje de error
    return {
      data: [],
      pagination: {
        currentPage: Number(page),
        pageSize: Number(pageSize),
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      message: "No hay datos de jugadores",
      error: error.message || "Error de conexión con la API"
    };
  }
});
