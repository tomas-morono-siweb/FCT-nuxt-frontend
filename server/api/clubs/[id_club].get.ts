export default defineEventHandler(async (event) => {
    const id_club = getRouterParam(event, 'id_club');

    if (!id_club) {
        throw createError({
            statusCode: 400,
            statusMessage: 'ID del club es requerido'
        });
    }

    try {
        // Llamada específica a la API externa para obtener un club por id_club
        const apiUrl = `http://127.0.0.1:8000/clubs/${id_club}`;

        console.log('Intentando obtener club específico:', apiUrl);

        const response = await $fetch(apiUrl, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'http://localhost:8000'
            }
        });

        console.log('✅ Recibiendo club específico de la API externa');
        return response;
    } catch (error: any) {
        console.error('❌ Error fetching club from API:', error);
        console.log('🔄 Usando datos mock para club específico');

        // Datos mock para testing local
        const mockClubs = [
            { id: 1, id_club: "FCB", nombre: "Barcelona", fundacion: 1899, ciudad: "Barcelona", estadio: "Camp Nou", presupuesto: 500000000, presupuesto_disponible: 300000000 },
            { id: 2, id_club: "RMA", nombre: "Real Madrid", fundacion: 1902, ciudad: "Madrid", estadio: "Santiago Bernabéu", presupuesto: 600000000, presupuesto_disponible: 400000000 },
            { id: 3, id_club: "PSG", nombre: "PSG", fundacion: 1970, ciudad: "París", estadio: "Parc des Princes", presupuesto: 700000000, presupuesto_disponible: 500000000 },
            { id: 4, id_club: "MCI", nombre: "Manchester City", fundacion: 1880, ciudad: "Manchester", estadio: "Etihad Stadium", presupuesto: 550000000, presupuesto_disponible: 350000000 },
            { id: 5, id_club: "LIV", nombre: "Liverpool", fundacion: 1892, ciudad: "Liverpool", estadio: "Anfield", presupuesto: 400000000, presupuesto_disponible: 250000000 },
            { id: 6, id_club: "ATM", nombre: "Atlético Madrid", fundacion: 1903, ciudad: "Madrid", estadio: "Wanda Metropolitano", presupuesto: 300000000, presupuesto_disponible: 200000000 },
            { id: 7, id_club: "CHE", nombre: "Chelsea", fundacion: 1905, ciudad: "Londres", estadio: "Stamford Bridge", presupuesto: 450000000, presupuesto_disponible: 300000000 },
            { id: 8, id_club: "MUN", nombre: "Manchester United", fundacion: 1878, ciudad: "Manchester", estadio: "Old Trafford", presupuesto: 500000000, presupuesto_disponible: 350000000 },
            { id: 9, id_club: "TOT", nombre: "Tottenham", fundacion: 1882, ciudad: "Londres", estadio: "Tottenham Hotspur Stadium", presupuesto: 350000000, presupuesto_disponible: 250000000 },
            { id: 10, id_club: "ARS", nombre: "Arsenal", fundacion: 1886, ciudad: "Londres", estadio: "Emirates Stadium", presupuesto: 380000000, presupuesto_disponible: 280000000 }
        ];

        const club = mockClubs.find(c => c.id_club === id_club);

        if (!club) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Club no encontrado'
            });
        }

        console.log('✅ Devolviendo club específico mock');
        return club;
    }
});
