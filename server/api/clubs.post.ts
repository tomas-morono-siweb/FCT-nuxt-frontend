export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Mock implementation - replace with actual database insert
  const newClub = {
    id: Date.now(), // Simple ID generation
    ...body
  }

  return newClub
})
