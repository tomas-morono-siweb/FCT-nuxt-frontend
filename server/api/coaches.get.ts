export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { page = 1, pageSize = 10 } = query;

  console.log('=== INICIO coaches.get.ts ===');
  console.log('Query params:', { page, pageSize });

  try {
    // Llamada real a la API de tu compañero - el backend maneja toda la paginación
    const apiUrl = `http://127.0.0.1:8000/coaches?${new URLSearchParams({
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

    console.log('✅ Respuesta de la API externa para entrenadores:', response);
    // El backend devuelve la respuesta ya paginada, la devolvemos directamente
    return response;
  } catch (error: any) {
    console.error('❌ Error fetching coaches from API:', error);
    console.log('🔄 Usando datos mock para entrenadores');

    // Datos mock para testing local
    const mockCoaches = [
      { id: 1, dni: "12345678A", nombre: "Xavi", apellidos: "Hernández", salario: 8000000, id_club: "FCB" },
      { id: 2, dni: "87654321B", nombre: "Carlo", apellidos: "Ancelotti", salario: 12000000, id_club: "RMA" },
      { id: 3, dni: "11223344C", nombre: "Luis", apellidos: "Enrique", salario: 9000000, id_club: "PSG" },
      { id: 4, dni: "44332211D", nombre: "Pep", apellidos: "Guardiola", salario: 15000000, id_club: "MCI" },
      { id: 5, dni: "55667788E", nombre: "Jürgen", apellidos: "Klopp", salario: 10000000, id_club: "LIV" },
      { id: 6, dni: "99887766F", nombre: "Antonio", apellidos: "Conte", salario: 7000000, id_club: "TOT" },
      { id: 7, dni: "13579246G", nombre: "Diego", apellidos: "Simeone", salario: 8500000, id_club: "ATM" },
      { id: 8, dni: "24681357H", nombre: "Erik", apellidos: "ten Hag", salario: 6000000, id_club: "MUN" },
      { id: 9, dni: "36925814I", nombre: "Mauricio", apellidos: "Pochettino", salario: 7500000, id_club: "CHE" },
      { id: 10, dni: "74185296J", nombre: "Zinedine", apellidos: "Zidane", salario: 11000000, id_club: "RMA" }
    ];

    // Paginación mock
    const currentPage = Number(page);
    const perPage = Number(pageSize);
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedCoaches = mockCoaches.slice(startIndex, endIndex);
    const totalItems = mockCoaches.length;
    const totalPages = Math.ceil(totalItems / perPage);

    const mockResponse = {
      coaches: paginatedCoaches,
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
    console.log('=== FIN coaches.get.ts ===');
    return mockResponse;
  }
});
