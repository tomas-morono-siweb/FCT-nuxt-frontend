export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  // Mock data - replace with actual database call
  const mockClubs = [
    {
      id: 1,
      nombre: "Real Madrid",
      fundacion: new Date("1902-03-06"),
      ciudad: "Madrid",
      estadio: "Santiago Bernabéu",
      presupuesto: 800000000,
    },
    {
      id: 2,
      nombre: "FC Barcelona",
      fundacion: new Date("1899-11-29"),
      ciudad: "Barcelona",
      estadio: "Camp Nou",
      presupuesto: 750000000,
    },
    {
      id: 3,
      nombre: "Atlético de Madrid",
      fundacion: new Date("1903-04-26"),
      ciudad: "Madrid",
      estadio: "Wanda Metropolitano",
      presupuesto: 400000000,
    },
  ];

  const club = mockClubs.find((c) => c.id === Number(id));

  if (!club) {
    throw createError({
      statusCode: 404,
      statusMessage: "Club not found",
    });
  }

  return club;
});
