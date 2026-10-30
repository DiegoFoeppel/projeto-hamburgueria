import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/UserContext";

export const PublicOnlyRoute = () => {
  const { user, isLoading } = useAuth();

  // 1. Evita flash enquanto verifica se há sessão ativa
  if (isLoading) {
    return <div>Carregando...</div>; // Ou seu Spinner de loading
  }

  if (user) {
    const route = user.role === "ADMIN" ? "/pedidos" : "/home";
    return <Navigate to={route} replace />;
  }

  // 3. Se não está logado, libera o acesso à rota pública (ex: /login)
  return <Outlet />;
};
