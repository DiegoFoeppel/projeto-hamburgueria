import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/productsService";

export const useProductsQuery = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return query;
};
