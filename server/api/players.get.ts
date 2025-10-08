/* eslint-disable @typescript-eslint/no-explicit-any */

export default defineEventHandler(async (event) => {
  // TEST: probando que haya token en este scope
  const authToken = useState("authToken");
  console.log("Token de autenticación:", authToken);

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
        'Accept': "application/json",
        "Content-Type": "application/json",
        'Origin': "http://api.clubmanager.com",
        'Authorization': `Bearer ${authToken}`,
      },
    });

    console.log("✅ Recibiendo jugadores de la API");
    return response;
  } catch (error: any) {
    console.error("Error al recibir jugadores de la API");
    return error;
  }
});
