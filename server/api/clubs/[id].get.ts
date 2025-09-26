export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    console.log(`Obteniendo club con ID: ${id}`);
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/clubs/${id}`;
    console.log(`URL de la API: ${apiUrl}`);
    const club = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    console.log('Club obtenido:', club);
    return club;
  } catch (error) {
    console.error('Error fetching club from API:', error);
    console.log('Usando datos mock para club individual');

    // Datos mock para club individual
    const mockClubs = [
      { id: 1, id_club: "FCB001", nombre: "Barcelona", presupuesto: 500000000, entrenador: "Xavi", jugadores: ["Lionel Messi", "Robert Lewandowski", "Pedri"] },
      { id: 2, id_club: "RMA002", nombre: "Real Madrid", presupuesto: 600000000, entrenador: "Carlo Ancelotti", jugadores: ["Cristiano Ronaldo", "Luka Modrić", "Vinicius Jr"] },
      { id: 3, id_club: "PSG003", nombre: "PSG", presupuesto: 700000000, entrenador: "Luis Enrique", jugadores: ["Kylian Mbappé", "Neymar Jr", "Marquinhos"] },
      { id: 4, id_club: "MCI004", nombre: "Manchester City", presupuesto: 550000000, entrenador: "Pep Guardiola", jugadores: ["Erling Haaland", "Kevin De Bruyne", "Phil Foden"] },
      { id: 5, id_club: "LIV005", nombre: "Liverpool", presupuesto: 400000000, entrenador: "Jürgen Klopp", jugadores: ["Mohamed Salah", "Virgil van Dijk", "Sadio Mané"] }
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
