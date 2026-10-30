import { api } from "../api/axios";
import type { UpdateUser, User } from "../types/types";

export const createUser = async (user: User) => {
  if (!user) return;

  const response = await api.post(`/api/users`, user);

  console.log("response", response);

  return response.data;
};

export const updateUser = async (user: UpdateUser) => {
  const response = await api.patch(`/api/users/${user.id}`, user);

  return response.data.updated;
};

export const deleteUser = async (user: User) => {
  if (!user) return;

  const response = await api.delete("/api/users");

  return response.data;
};
