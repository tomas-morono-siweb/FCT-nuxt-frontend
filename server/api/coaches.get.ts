export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page = 1, pageSize = 10 } = query;

  try {
    // Llamada real a la API de tu compañero - el backend maneja toda la paginación
    const apiUrl = `http://127.0.0.1:8000/coaches?${new URLSearchParams({
      page: page?.toString() || '1',
      pageSize: pageSize?.toString() || '10'
    }).toString()}`;

    const response = await $fetch(apiUrl, {
      timeout: 5000, // 5 segundos de timeout
      retry: false
    });

    // El backend devuelve la respuesta ya paginada, la devolvemos directamente
    return response;
  } catch (error: any) {
    console.error('Error fetching coaches from API:', error);

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
      message: "No hay datos de entrenadores",
      error: error.message || "Error de conexión con la API"
    };
  }
});
