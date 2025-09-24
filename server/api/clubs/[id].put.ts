export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  // Mock implementation - replace with actual database update
  const updatedClub = {
    id: Number(id),
    ...body,
  };

  return updatedClub;
});
