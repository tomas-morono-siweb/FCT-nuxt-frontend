/* eslint-disable no-useless-catch */
import { useState } from "#app";
import type { User } from "~/interfaces/user";

interface LoginResponse {
  user: User;
  token: string;
}

export const useAuth = () => {
  const user = useState<User | null>("authUser", () => null);
  const token = useState<string | null>("authToken", () => null);

  // Llamada API login
  const login = async (email: string, password: string) => {
    try {
      const response = await $fetch<LoginResponse>(`${process.env.API_BASE_URL}/login`, {
        method: "POST",
        body: { email, password },
      });
      user.value = response.user;
      token.value = response.token;

      useCookie("auth_token").value = response.token;

      return response.user;
    } catch (error: any) {
      throw error;
    }
  };

  // Logout
  const logout = () => {
    user.value = null;
    token.value = null;
    useCookie("authToken").value = null;
  };

  // Llamada API usuario logueado
  const fetchUser = async () => {
    const authToken = useCookie("auth_token").value;
    if (authToken) return null;

    try {
      const response = await $fetch<User>(`${process.env.API_BASE_URL}/user`, {
        headers: {
          Method: "POST",
          Authorization: `Bearer ${authToken}`,
        },
      });
      user.value = response;
      return response;
    } catch {
      logout();
      return null;
    }
  };

  return { user, token, login, logout, fetchUser };
};
