import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, updateUser } from "../services/usersService";
import toast from "react-hot-toast";
import { getMe } from "../services/authService";

export const userKeys = { all: ["user"] as const };

// export const useUsers = () =>
//   useQuery({ queryKey: userKeys.all, queryFn: getUser });

export const useUser = (hasToken: boolean) =>
  useQuery({
    queryKey: userKeys.all,
    queryFn: getMe,
    enabled: hasToken,
    retry: false,
  });

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      toast.success("User foi atualizado");
    },
    onError: (err) => {
      qc.invalidateQueries({ queryKey: userKeys.all });
      toast.error("Erro ao atualizar o usuário");
      console.error("Erro: ", err);
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: userKeys.all }),
  });
};
