export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { q, page = 1, pageSize = 10 } = query;

  // Mock data for now - replace with actual database calls
  const mockClubs = [
    {
      id: "1",
      nombre: "Real Madrid",
      fundacion: 1902,
      ciudad: "Madrid",
      estadio: "Santiago Bernabéu",
      presupuesto: 800000000,
    },
    {
      id: "2",
      nombre: "FC Barcelona",
      fundacion: 1899,
      ciudad: "Barcelona",
      estadio: "Camp Nou",
      presupuesto: 750000000,
    },
    {
      id: "3",
      nombre: "Atlético de Madrid",
      fundacion: 1903,
      ciudad: "Madrid",
      estadio: "Wanda Metropolitano",
      presupuesto: 400000000,
    },
  ];

  // Simple filtering by query
  let filteredClubs = mockClubs;
  if (q && typeof q === "string") {
    filteredClubs = mockClubs.filter(
      (club) =>
        club.nombre.toLowerCase().includes(q.toLowerCase()) || club.ciudad.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Simple pagination
  const startIndex = (Number(page) - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);
  const paginatedClubs = filteredClubs.slice(startIndex, endIndex);

  // Return paginated data with metadata
  return {
    data: paginatedClubs,
    pagination: {
      currentPage: Number(page),
      pageSize: Number(pageSize),
      totalItems: filteredClubs.length,
      totalPages: Math.ceil(filteredClubs.length / Number(pageSize)),
      hasNextPage: endIndex < filteredClubs.length,
      hasPreviousPage: startIndex > 0,
    },
  };
});
