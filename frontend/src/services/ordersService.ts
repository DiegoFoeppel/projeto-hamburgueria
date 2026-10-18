import { api } from "../api/axios";

export const createOrder = async (data, token: string) => {
  const response = await api.post(`/api/orders/`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
