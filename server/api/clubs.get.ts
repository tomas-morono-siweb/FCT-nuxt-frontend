export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page = 1, pageSize = 10 } = query;

  console.log('=== INICIO clubs.get.ts ===');
  console.log('Query params:', { page, pageSize });

  try {
    // Llamada real a la API de tu compañero - el backend maneja toda la paginación
    const apiUrl = `http://127.0.0.1:8000/clubs?${new URLSearchParams({
      page: page?.toString() || '1',
      pageSize: pageSize?.toString() || '10'
    }).toString()}`;

    console.log('Intentando conectar con API externa:', apiUrl);

    const response = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    console.log('✅ Respuesta de la API externa para clubs:', response);
    // El backend devuelve la respuesta ya paginada, la devolvemos directamente
    return response;
  } catch (error: any) {
    console.error('❌ Error fetching clubs from API:', error);
    console.log('🔄 Usando datos mock para clubs');

    // Datos mock para testing local
    const mockClubs = [
      { id: 1, id_club: "FCB001", nombre: "Barcelona", fundacion: 1899, ciudad: "Barcelona", estadio: "Camp Nou", presupuesto: 500000000, presupuesto_disponible: 300000000 },
      { id: 2, id_club: "RMA002", nombre: "Real Madrid", fundacion: 1902, ciudad: "Madrid", estadio: "Santiago Bernabéu", presupuesto: 600000000, presupuesto_disponible: 400000000 },
      { id: 3, id_club: "PSG003", nombre: "PSG", fundacion: 1970, ciudad: "París", estadio: "Parc des Princes", presupuesto: 700000000, presupuesto_disponible: 500000000 },
      { id: 4, id_club: "MCI004", nombre: "Manchester City", fundacion: 1880, ciudad: "Manchester", estadio: "Etihad Stadium", presupuesto: 550000000, presupuesto_disponible: 350000000 },
      { id: 5, id_club: "LIV005", nombre: "Liverpool", fundacion: 1892, ciudad: "Liverpool", estadio: "Anfield", presupuesto: 400000000, presupuesto_disponible: 250000000 },
      { id: 6, id_club: "ATM006", nombre: "Atlético Madrid", fundacion: 1903, ciudad: "Madrid", estadio: "Wanda Metropolitano", presupuesto: 300000000, presupuesto_disponible: 200000000 },
      { id: 7, id_club: "CHE007", nombre: "Chelsea", fundacion: 1905, ciudad: "Londres", estadio: "Stamford Bridge", presupuesto: 450000000, presupuesto_disponible: 300000000 },
      { id: 8, id_club: "MUN008", nombre: "Manchester United", fundacion: 1878, ciudad: "Manchester", estadio: "Old Trafford", presupuesto: 500000000, presupuesto_disponible: 350000000 },
      { id: 9, id_club: "TOT009", nombre: "Tottenham", fundacion: 1882, ciudad: "Londres", estadio: "Tottenham Hotspur Stadium", presupuesto: 350000000, presupuesto_disponible: 250000000 },
      { id: 10, id_club: "ARS010", nombre: "Arsenal", fundacion: 1886, ciudad: "Londres", estadio: "Emirates Stadium", presupuesto: 380000000, presupuesto_disponible: 280000000 }
    ];

    // Paginación mock
    const currentPage = Number(page);
    const perPage = Number(pageSize);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedClubs = mockClubs.slice(startIndex, endIndex);
    const totalItems = mockClubs.length;
    const totalPages = Math.ceil(totalItems / perPage);

    const mockResponse = {
      clubs: paginatedClubs,
      pagination: {
        current_page: currentPage,
        per_page: perPage,
        total_items: totalItems,
        total_pages: totalPages,
        has_next_page: currentPage < totalPages,
        has_prev_page: currentPage > 1,
      }
    };

    console.log('✅ Devolviendo datos mock');
    console.log('=== FIN clubs.get.ts ===');
    return mockResponse;
  }
});
