export default defineEventHandler(async (event) => {
  // make sure the user is logged in
  // This will throw a 401 error if the request doesn't come from a valid user session
  // const { user } = await requireUserSession(event);

  const query = getQuery(event);
  const { nombre, page = 1, pageSize = 20 } = query;

  try {
    const apiUrl = `http://api.clubmanager.com/players?${new URLSearchParams({
      nombre: nombre && typeof nombre === "string" ? nombre : "",
      page: page?.toString() || "1",
      pageSize: pageSize?.toString() || "20",
    }).toString()}`;

    console.log("Intentando conectar con API externa:", apiUrl);

    const response = await $fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Origin: "http://api.clubmanager.com",
      },
    });

    console.log("✅ Recibiendo jugadores de la API");
    return response;
  } catch (error: any) {
    console.error("Error al recibir jugadores de la API");
    return error;
  }
});
