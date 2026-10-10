import { api } from "../api/axios";
import type { LoginCredentials } from "../types/types";

export const getMe = async (token: string) => {
  const response = await api.get(`/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("response", response);

  return response.data.user;
};

export const loginUser = async (data: LoginCredentials) => {
  const response = await api.post("/api/auth/login", data, {
    headers: { "Content-Type": "application/json" },
  });

  console.log("teste", response.data);

  return response;
};

export const logout = async (token: string) => {
  const response = await api.get(`/api/auth/logout`);

  return response.data.user;
};
