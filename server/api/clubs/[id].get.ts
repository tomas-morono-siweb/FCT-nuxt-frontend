export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/clubs/${id}`;
    const club = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    return club;
  } catch (error) {
    console.log('✅ Devolviendo datos mock');

    // Datos mock para club individual
    const mockClubs = [
      { id: 1, id_club: "FCB", nombre: "Barcelona", fundacion: 1899, ciudad: "Barcelona", estadio: "Camp Nou", presupuesto: 500000000, presupuesto_restante: 300000000 },
      { id: 2, id_club: "RMA", nombre: "Real Madrid", fundacion: 1902, ciudad: "Madrid", estadio: "Santiago Bernabéu", presupuesto: 600000000, presupuesto_restante: 400000000 },
      { id: 3, id_club: "PSG", nombre: "PSG", fundacion: 1970, ciudad: "París", estadio: "Parc des Princes", presupuesto: 700000000, presupuesto_restante: 500000000 },
      { id: 4, id_club: "MCI", nombre: "Manchester City", fundacion: 1880, ciudad: "Manchester", estadio: "Etihad Stadium", presupuesto: 550000000, presupuesto_restante: 350000000 },
      { id: 5, id_club: "LIV", nombre: "Liverpool", fundacion: 1892, ciudad: "Liverpool", estadio: "Anfield", presupuesto: 400000000, presupuesto_restante: 250000000 }
    ];

    const club = mockClubs.find(c => c.id === Number(id));
    if (club) {
      return club;
    }

    throw createError({
      statusCode: 404,
      statusMessage: "No hay datos del club",
    });
  }
});
