export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { q, page = 1, pageSize = 10 } = query;

  // Mock data for now - replace with actual database calls
  const mockPlayers = [
    {
      id: 1,
      nombre: "Lionel",
      apellido: "Messi",
      posicion: "Delantero",
      dorsal: 10,
      clubId: 2,
    },
    {
      id: 2,
      nombre: "Cristiano",
      apellido: "Ronaldo",
      posicion: "Delantero",
      dorsal: 7,
      clubId: 1,
    },
    {
      id: 3,
      nombre: "Neymar",
      apellido: "Jr",
      posicion: "Extremo",
      dorsal: 11,
      clubId: 3,
    },
    {
      id: 4,
      nombre: "Kylian",
      apellido: "Mbappé",
      posicion: "Delantero",
      dorsal: 7,
      clubId: 1,
    },
    {
      id: 5,
      nombre: "Antoine",
      apellido: "Griezmann",
      posicion: "Delantero",
      dorsal: 9,
      clubId: 2,
    },
  ];

  // Simple filtering by query
  let filteredPlayers = mockPlayers;
  if (q && typeof q === "string") {
    filteredPlayers = mockPlayers.filter(
      (player) =>
        player.nombre.toLowerCase().includes(q.toLowerCase()) || player.apellido.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Simple pagination
  const startIndex = (Number(page) - 1) * Number(pageSize);
  const endIndex = startIndex + Number(pageSize);
  const paginatedPlayers = filteredPlayers.slice(startIndex, endIndex);

  return paginatedPlayers;
});
