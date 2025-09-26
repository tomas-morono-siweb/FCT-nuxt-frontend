export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { nombre, page = 1, pageSize = 10 } = query;

  console.log('=== INICIO players.get.ts ===');
  console.log('Query params:', { nombre, page, pageSize });

  try {
    // Llamada real a la API de tu compañero - el backend maneja toda la paginación y filtrado
    const apiUrl = `http://127.0.0.1:8000/players?${new URLSearchParams({
      nombre: (nombre && typeof nombre === 'string') ? nombre : '',
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

    console.log('✅ Respuesta de la API externa para jugadores:', response);
    // El backend devuelve la respuesta ya paginada y filtrada, la devolvemos directamente
    return response;
  } catch (error: any) {
    console.error('❌ Error fetching players from API:', error);
    console.log('🔄 Usando datos mock para jugadores');

    // Datos mock para testing local
    const mockPlayers = [
      { id: 1, nombre: "Lionel", apellidos: "Messi", dorsal: 10, salario: 50000000, club: "Barcelona", entrenador: "Xavi" },
      { id: 2, nombre: "Cristiano", apellidos: "Ronaldo", dorsal: 7, salario: 45000000, club: "Real Madrid", entrenador: "Carlo Ancelotti" },
      { id: 3, nombre: "Kylian", apellidos: "Mbappé", dorsal: 7, salario: 40000000, club: "PSG", entrenador: "Luis Enrique" },
      { id: 4, nombre: "Erling", apellidos: "Haaland", dorsal: 9, salario: 35000000, club: "Manchester City", entrenador: "Pep Guardiola" },
      { id: 5, nombre: "Kevin", apellidos: "De Bruyne", dorsal: 17, salario: 30000000, club: "Manchester City", entrenador: "Pep Guardiola" },
      { id: 6, nombre: "Mohamed", apellidos: "Salah", dorsal: 11, salario: 25000000, club: "Liverpool", entrenador: "Jürgen Klopp" },
      { id: 7, nombre: "Virgil", apellidos: "van Dijk", dorsal: 4, salario: 20000000, club: "Liverpool", entrenador: "Jürgen Klopp" },
      { id: 8, nombre: "Luka", apellidos: "Modrić", dorsal: 10, salario: 18000000, club: "Real Madrid", entrenador: "Carlo Ancelotti" },
      { id: 9, nombre: "Robert", apellidos: "Lewandowski", dorsal: 9, salario: 22000000, club: "Barcelona", entrenador: "Xavi" },
      { id: 10, nombre: "Neymar", apellidos: "Jr", dorsal: 10, salario: 28000000, club: "PSG", entrenador: "Luis Enrique" }
    ];

    // Filtrar por nombre si se proporciona
    let filteredPlayers = mockPlayers;
    if (nombre && typeof nombre === 'string') {
      filteredPlayers = mockPlayers.filter(player =>
        player.nombre.toLowerCase().includes(nombre.toLowerCase()) ||
        player.apellidos.toLowerCase().includes(nombre.toLowerCase())
      );
    }

    // Paginación mock
    const currentPage = Number(page);
    const perPage = Number(pageSize);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedPlayers = filteredPlayers.slice(startIndex, endIndex);
    const totalItems = filteredPlayers.length;
    const totalPages = Math.ceil(totalItems / perPage);

    const mockResponse = {
      players: paginatedPlayers,
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
    console.log('=== FIN players.get.ts ===');
    return mockResponse;
  }
});
