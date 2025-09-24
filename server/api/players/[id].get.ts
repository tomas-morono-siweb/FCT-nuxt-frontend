export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  // Mock data - replace with actual database call
  const mockPlayers = [
    {
      id: 1,
      nombre: "Lionel",
      apellido: "Messi",
      posicion: "Delantero",
      dorsal: 10,
      clubId: 1,
    },
    {
      id: 2,
      nombre: "Cristiano",
      apellido: "Ronaldo",
      posicion: "Delantero",
      dorsal: 7,
      clubId: 2,
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
      nombre: "Erling",
      apellido: "Haaland",
      posicion: "Delantero",
      dorsal: 9,
      clubId: 2,
    },
  ];

  const player = mockPlayers.find((p) => p.id === Number(id));

  if (!player) {
    throw createError({
      statusCode: 404,
      statusMessage: "Player not found",
    });
  }

  return player;
});
