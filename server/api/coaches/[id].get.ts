export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  // Mock data - replace with actual database call
  const mockCoaches = [
    {
      id: 1,
      nombre: "Carlo",
      apellidos: "Ancelotti",
      nacionalidad: "Italiana",
      salario: 12000000,
      id_club: 1,
    },
    {
      id: 2,
      nombre: "Xavi",
      apellidos: "Hernández",
      nacionalidad: "Española",
      salario: 8000000,
      id_club: 2,
    },
    {
      id: 3,
      nombre: "Diego",
      apellidos: "Simeone",
      nacionalidad: "Argentina",
      salario: 10000000,
      id_club: 3,
    },
  ];

  const coach = mockCoaches.find((c) => c.id === Number(id));

  if (!coach) {
    throw createError({
      statusCode: 404,
      statusMessage: "Coach not found",
    });
  }

  return coach;
});
