export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  try {
    console.log(`Obteniendo jugador con ID: ${id}`);
    // Llamada real a la API de tu compañero
    const apiUrl = `http://127.0.0.1:8000/players/${id}`;
    console.log(`URL de la API: ${apiUrl}`);
    const player = await $fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:8000'
      }
    });

    console.log('Jugador obtenido:', player);
    return player;
  } catch (error) {
    console.error('Error fetching player from API:', error);
    console.log('Usando datos mock para jugador individual');

    // Datos mock para jugador individual
    const mockPlayers = [
      { id: 1, nombre: "Lionel", apellidos: "Messi", dorsal: 10, salario: 50000000, id_club: "FCB", club: "Barcelona" },
      { id: 2, nombre: "Cristiano", apellidos: "Ronaldo", dorsal: 7, salario: 45000000, id_club: "RMA", club: "Real Madrid" },
      { id: 3, nombre: "Kylian", apellidos: "Mbappé", dorsal: 7, salario: 40000000, id_club: "PSG", club: "PSG" },
      { id: 4, nombre: "Erling", apellidos: "Haaland", dorsal: 9, salario: 35000000, id_club: "MCI", club: "Manchester City" },
      { id: 5, nombre: "Kevin", apellidos: "De Bruyne", dorsal: 17, salario: 30000000, id_club: "MCI", club: "Manchester City" }
    ];

    const player = mockPlayers.find(p => p.id === Number(id));
    if (player) {
      return player;
    }

    throw createError({
      statusCode: 404,
      statusMessage: "No hay datos del jugador",
    });
  }
});
