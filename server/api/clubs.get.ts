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
      { id: 1, id_club: "FCB001", nombre: "Barcelona", presupuesto: 500000000, entrenador: "Xavi", jugadores: ["Lionel Messi", "Robert Lewandowski", "Pedri"] },
      { id: 2, id_club: "RMA002", nombre: "Real Madrid", presupuesto: 600000000, entrenador: "Carlo Ancelotti", jugadores: ["Cristiano Ronaldo", "Luka Modrić", "Vinicius Jr"] },
      { id: 3, id_club: "PSG003", nombre: "PSG", presupuesto: 700000000, entrenador: "Luis Enrique", jugadores: ["Kylian Mbappé", "Neymar Jr", "Marquinhos"] },
      { id: 4, id_club: "MCI004", nombre: "Manchester City", presupuesto: 550000000, entrenador: "Pep Guardiola", jugadores: ["Erling Haaland", "Kevin De Bruyne", "Phil Foden"] },
      { id: 5, id_club: "LIV005", nombre: "Liverpool", presupuesto: 400000000, entrenador: "Jürgen Klopp", jugadores: ["Mohamed Salah", "Virgil van Dijk", "Sadio Mané"] },
      { id: 6, id_club: "ATM006", nombre: "Atlético Madrid", presupuesto: 300000000, entrenador: "Diego Simeone", jugadores: ["Antoine Griezmann", "Jan Oblak", "Koke"] },
      { id: 7, id_club: "CHE007", nombre: "Chelsea", presupuesto: 450000000, entrenador: "Mauricio Pochettino", jugadores: ["Romelu Lukaku", "N'Golo Kanté", "Mason Mount"] },
      { id: 8, id_club: "MUN008", nombre: "Manchester United", presupuesto: 500000000, entrenador: "Erik ten Hag", jugadores: ["Marcus Rashford", "Bruno Fernandes", "Harry Maguire"] },
      { id: 9, id_club: "TOT009", nombre: "Tottenham", presupuesto: 350000000, entrenador: "Antonio Conte", jugadores: ["Harry Kane", "Son Heung-min", "Hugo Lloris"] },
      { id: 10, id_club: "ARS010", nombre: "Arsenal", presupuesto: 380000000, entrenador: "Mikel Arteta", jugadores: ["Bukayo Saka", "Martin Ødegaard", "Gabriel Jesus"] }
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

    console.log('✅ Devolviendo datos mock:', mockResponse);
    console.log('=== FIN clubs.get.ts ===');
    return mockResponse;
  }
});
