import { api } from "../api/axios";
import type { Product, User } from "../types/types";

export const getCategories = async () => {
  const response = await api.get("/api/categories");

  return response.data.categories;
};
