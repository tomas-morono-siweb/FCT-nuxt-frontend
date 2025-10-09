export const useAuth = () => {
  const token = useState("authToken", () => null);
  const { fetchUser } = useUseUsers();

  // Login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await useFetch<{ token: string }>(() => "http://api.clubmanager.com/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
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

  // Logout asíncrono (asegura redirect)
  const logout = async () => {
    // limpiamos state y localStorage
    if (import.meta.client) {
      clearNuxtState();
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
    console.log("Logout: state y localStorage limpios");

    // redirigimos al login
    await navigateTo("/login");
  };

  return { token, login, logout };
};
