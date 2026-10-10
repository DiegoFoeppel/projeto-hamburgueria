import { api } from "../api/axios";
import type { User } from "../types/types";

export const createUser = async (user: User) => {
  if (!user) return;

  const response = await api.post(`/api/users`, user);

  console.log("response", response);

  return response.data;
};
