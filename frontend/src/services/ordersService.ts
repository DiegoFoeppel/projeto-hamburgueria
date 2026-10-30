import { api } from "../api/axios";
import type { User } from "../types/types";

export const getOrders = async (token: string) => {
  const response = await api.get(`api/orders/`);
  return response.data.orders;
};

export const getOrdersByUserId = async (userId: number) => {
  const response = await api.get(`api/orders/user/${userId}`);
  return response.data.orders;
};

export const createOrder = async (data) => {
  const response = await api.post(`/api/orders/`, data);
  return response.data;
};
