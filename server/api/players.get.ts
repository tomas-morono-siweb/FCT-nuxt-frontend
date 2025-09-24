export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { q, page = 1, pageSize = 10 } = query;

  // Mock data for now - replace with actual database calls
  const mockPlayers = [
    {
      id: 1,
      nombre: "Lionel",
      apellidos: "Messi",
      dorsal: 10,
      salario: 50000000,
      id_club: "2",
    },
    {
      id: 2,
      nombre: "Cristiano",
      apellidos: "Ronaldo",
      dorsal: 7,
      salario: 45000000,
      id_club: "1",
    },
    {
      id: 3,
      nombre: "Neymar",
      apellidos: "Jr",
      dorsal: 11,
      salario: 40000000,
      id_club: "3",
    },
    {
      id: 4,
      nombre: "Kylian",
      apellidos: "Mbappé",
      dorsal: 7,
      salario: 35000000,
      id_club: "1",
    },
    {
      id: 5,
      nombre: "Antoine",
      apellidos: "Griezmann",
      dorsal: 9,
      salario: 30000000,
      id_club: "2",
    },
  ];

  // Simple filtering by query
  let filteredPlayers = mockPlayers;
  if (q && typeof q === "string") {
    filteredPlayers = mockPlayers.filter(
      (player) =>
        player.nombre.toLowerCase().includes(q.toLowerCase()) || player.apellidos.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Simple pagination
  const startIndex = (Number(page) - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);
  const paginatedPlayers = filteredPlayers.slice(startIndex, endIndex);

  // Return paginated data with metadata
  return {
    data: paginatedPlayers,
    pagination: {
      currentPage: Number(page),
      pageSize: Number(pageSize),
      totalItems: filteredPlayers.length,
      totalPages: Math.ceil(filteredPlayers.length / Number(pageSize)),
      hasNextPage: endIndex < filteredPlayers.length,
      hasPreviousPage: startIndex > 0,
    },
  };
});
