export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    console.log(`Obteniendo entrenador con ID: ${id}`);
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/coaches/${id}`;
    console.log(`URL de la API: ${apiUrl}`);
    const coach = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    console.log('Entrenador obtenido:', coach);
    return coach;
  } catch (error) {
    console.error('Error fetching coach from API:', error);
    console.log('Usando datos mock para entrenador individual');

    // Datos mock para entrenador individual
    const mockCoaches = [
      { id: 1, dni: "12345678A", nombre: "Xavi", apellidos: "Hernández", salario: 8000000, id_club: "FCB" },
      { id: 2, dni: "87654321B", nombre: "Carlo", apellidos: "Ancelotti", salario: 12000000, id_club: "RMA" },
      { id: 3, dni: "11223344C", nombre: "Luis", apellidos: "Enrique", salario: 9000000, id_club: "PSG" },
      { id: 4, dni: "44332211D", nombre: "Pep", apellidos: "Guardiola", salario: 15000000, id_club: "MCI" },
      { id: 5, dni: "55667788E", nombre: "Jürgen", apellidos: "Klopp", salario: 10000000, id_club: "LIV" }
    ];

    const coach = mockCoaches.find(c => c.id === Number(id));
    if (coach) {
      return coach;
    }

    throw createError({
      statusCode: 404,
      statusMessage: "No hay datos del entrenador",
    });
  }
});
