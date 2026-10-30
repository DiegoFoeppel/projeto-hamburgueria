import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoriesService";
import { type Category } from "../types/types";

export const useCategoriesQuery = () => {
  const query = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return query;
};
