import { api } from "../api/axios";
import type { LoginCredentials } from "../types/types";

export const getMe = async () => {
  const response = await api.get(`/api/users/me`);

  return response.data.user;
};

export const loginUser = async (data: LoginCredentials) => {
  const response = await api.post("/api/auth/login", data, {
    headers: { "Content-Type": "application/json" },
  });

  return response;
};

export const logout = async () => {
  const response = await api.get(`/api/auth/logout`);

  return response.data.user;
};
