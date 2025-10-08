import { API_CONFIG } from "~/config/api";

export const useAuth = () => {
  const token = useState("authToken", () => null);
  const { fetchUser } = useUseUsers();

  // Login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await useFetch<{ token: string }>(() => `${API_CONFIG.BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        //credentials: "include",
      });

      // OJO AQUI SE MUESTRA EL TOKEN EN CONSOLA
      if (data.value?.token) {
        console.log(data.value?.token); // check de lo que me manda la API
      } else {
        console.log("No se ha recibido token");
      }

      // Almacenamos el token en cookie y state
      //localStorage.setItem("auth_token", data.value?.token || "");
      useState("authToken").value = data.value?.token;

      // obtenemos el usuario al hacer login
      fetchUser();

      return data.value?.token;
    } catch {
      throw createError({ statusCode: 401, message: "Error al recibir el token de login" });
    }
  };

  // Logout
  const logout = () => {
    // seteamos todo a null
    useState("authToken").value = null;
    useState("user").value = null;

    // redirigimos al login
    navigateTo("/login");
  };

  return { token, login, logout };
};
