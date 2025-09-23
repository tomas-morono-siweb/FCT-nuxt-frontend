export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { q, page = 1, pageSize = 10 } = query

  // Mock data for now - replace with actual database calls
  const mockCoaches = [
    {
      id: 1,
      nombre: "Carlo",
      apellidos: "Ancelotti",
      nacionalidad: "Italiana",
      salario: 12000000,
      id_club: 1
    },
    {
      id: 2,
      nombre: "Xavi",
      apellidos: "Hernández",
      nacionalidad: "Española",
      salario: 8000000,
      id_club: 2
    },
    {
      id: 3,
      nombre: "Diego",
      apellidos: "Simeone",
      nacionalidad: "Argentina",
      salario: 10000000,
      id_club: 3
    }
  ]

  // Simple filtering by query
  let filteredCoaches = mockCoaches
  if (q && typeof q === 'string') {
    filteredCoaches = mockCoaches.filter(coach => 
      coach.nombre.toLowerCase().includes(q.toLowerCase()) ||
      coach.apellidos.toLowerCase().includes(q.toLowerCase())
    )
  }

  // Simple pagination
  const startIndex = (Number(page) - 1) * Number(pageSize)
  const endIndex = startIndex + Number(pageSize)
  const paginatedCoaches = filteredCoaches.slice(startIndex, endIndex)

  return paginatedCoaches
})
