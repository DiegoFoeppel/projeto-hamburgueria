import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../services/productsService";

export const productKeys = { all: ["products"] as const };

export const useProducts = () =>
  useQuery({ queryKey: productKeys.all, queryFn: getProducts });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: editProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => qc.invalidateQueries({ queryKey: productKeys.all }),
  });
};
