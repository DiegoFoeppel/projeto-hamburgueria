import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const PublicOnlyRoute = () => {
  const { user, isLoading } = useAuth();

  // 1. Evita flash enquanto verifica se há sessão ativa
  if (isLoading) {
    return <div>Carregando...</div>; // Ou seu Spinner de loading
  }

  // 2. Se já existe usuário, redireciona antes de renderizar a página
  if (user) {
    const route = user.role === "ADMIN" ? "/admin" : "/home";
    return <Navigate to={route} replace />;
  }

  // 3. Se não está logado, libera o acesso à rota pública (ex: /login)
  return <Outlet />;
};
