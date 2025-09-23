export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const { q, page = 1, pageSize = 10 } = query

    // Mock data for now - replace with actual database calls
    const mockClubs = [
        {
            id: 1,
            nombre: "Real Madrid",
            fundacion: new Date("1902-03-06"),
            ciudad: "Madrid",
            estadio: "Santiago Bernabéu",
            presupuesto: 800000000
        },
        {
            id: 2,
            nombre: "FC Barcelona",
            fundacion: new Date("1899-11-29"),
            ciudad: "Barcelona",
            estadio: "Camp Nou",
            presupuesto: 750000000
        },
        {
            id: 3,
            nombre: "Atlético de Madrid",
            fundacion: new Date("1903-04-26"),
            ciudad: "Madrid",
            estadio: "Wanda Metropolitano",
            presupuesto: 400000000
        }
    ]

    // Simple filtering by query
    let filteredClubs = mockClubs
    if (q && typeof q === 'string') {
        filteredClubs = mockClubs.filter(club =>
            club.nombre.toLowerCase().includes(q.toLowerCase()) ||
            club.ciudad.toLowerCase().includes(q.toLowerCase())
        )
    }

    // Simple pagination
    const startIndex = (Number(page) - 1) * Number(pageSize)
    const endIndex = startIndex + Number(pageSize)
    const paginatedClubs = filteredClubs.slice(startIndex, endIndex)

    return paginatedClubs
})
