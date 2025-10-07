import type { User } from "~/interfaces/user";

export const useAuth = () => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();
  const user = useState<User | null>("user", () => null);
  const token = useState<string | null>("authToken", () => null);

  // Llamada API login
  const login = async (email: string, password: string) => {
    try {
      const { data } = await useFetch<{ token: string }>(() => `${apiBase}/login`, {
        method: "POST",
        body: { email, password },
      });

      console.log(data.value?.token); // check de lo que me manda el chimp
      useCookie("auth_token").value = data.value?.token;

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

    // redirigimos al login
    return navigateTo("/login");
  };

  // Llamada API usuario logueado
  const fetchUser = async () => {
    const authToken = useCookie("auth_token").value;
    if (!authToken) return null;

    try {
      const response = await $fetch<User>(`${apiBase}/me`, {
        headers: {
          Method: "GET",
          Authorization: `Bearer ${authToken}`,
        },
      });
      user.value = response;
      return response;
    } catch {
      logout();
      user.value = null;
      return null;
    }
  };

  return { token, login, logout, fetchUser };
};
