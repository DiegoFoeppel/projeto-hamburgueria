import { api } from "../api/axios";
import type { User } from "../types/types";

export const getProducts = async () => {
  const response = await api.get("/api/products");

  return response.data.products;
};
