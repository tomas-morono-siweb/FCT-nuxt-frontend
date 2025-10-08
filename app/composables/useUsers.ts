import { API_CONFIG } from "~/config/api";

export const useUseUsers = () => {
  const url = `${API_CONFIG.BASE_URL}/user/me`;

  // Llamada API para obtener usuario
  const fetchUser = async () => {
    const authToken = useCookie("auth_token").value;
    if (!authToken) return null;

    try {
      const response = await $fetch(url, {
        headers: {
          'Method': 'GET',
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': 'http://api.clubmanager.com',
        },
      });
      // metemos el usuario en el state global
      useState("user").value = response;
      return response;
    } catch (error) {
      console.log("Error al recibir usuario desde la API");
      return error;
    }
  };

  return { fetchUser };
};