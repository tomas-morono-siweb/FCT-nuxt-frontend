export const useAuth = () => {
  const baseUrl = "http://api.clubmanager.com";
  const token = useState("authToken", () => null);
  const { fetchUser } = useUseUsers();

  // Login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await useFetch<{ token: string }>(() => `${baseUrl}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (data.value?.token) {
        console.log(data.value?.token); // check de lo que me manda la API
      } else {
        console.log("No se ha recibido token");
      }

      useCookie("auth_token").value = data.value?.token;
      useState("authToken").value = data.value?.token;
      useState("user").value = fetchUser();

      return data.value?.token;
    } catch {
      throw createError({ statusCode: 401, message: "Error al recibir el token de login" });
    }
  };

  // Logout
  const logout = () => {
    // seteamos todo a null
    token.value = null;
    useCookie("auth_token").value = null;
    useState("user").value = null;
    
    // redirigimos al login
    navigateTo("/login");
  };

  console.log("Composable useAuth.ts funcionando");
  console.log(`URL base: ${baseUrl}`);
  console.log(`Definición del token (vacío): ${token}`);
  console.log("*********************************************");
  
  return { token, login, logout};
};
