import { api } from "../api/axios";
import type { Product, User } from "../types/types";

export const getCategories = async () => {
  const response = await api.get("/api/categories");

  return response.data.categories;
};

export const getCategoryById = async (id: string) => {
  const response = await api.get(`/api/categories/${id}`);

  return response.data.categories;
};

export const createCategory = async () => {
  const response = await api.post("/api/categories");

  return response.data.categories;
};

export const editCategory = async () => {
  const response = await api.patch("/api/categories");

  return response.data.categories;
};

export const deleteCategory = async () => {
  const response = await api.delete("/api/categories");

  return response.data.categories;
};
