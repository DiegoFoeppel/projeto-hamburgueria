import { api } from "../api/axios";
import type { Product, User } from "../types/types";

export const getProducts = async () => {
  const response = await api.get("/api/products");

  return response.data.menu;
};

export const createProduct = async (product: Product, token: string) => {
  const response = await api.post(`/api/products/`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const editProduct = async (
  productId: number,
  product: Product,
  token: string,
) => {
  const response = await api.patch(`/api/products/${productId}`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteProduct = async (id: number, token: string) => {
  const response = await api.delete(`/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.removedProduct;
};
