import { createContext, useContext, type ReactNode } from "react";
import { getMe } from "../services/authService";
import { useNavigate } from "react-router";
import { TOKEN_KEY } from "../api/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "../hooks/users";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: LoginUser) => void;
  logout: () => void;
}

type LoginUser = {
  user: User;
  token: string;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

type User = {
  id: number;
  nome: string;
  cep: string;
  email: string;
  role: "USER" | "ADMIN";
};

const UserProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const hasToken = !!localStorage.getItem(TOKEN_KEY);

  // const { data: user, isLoading } = useQuery({
  //   queryKey: ["me"],
  //   queryFn: getMe,
  //   enabled: hasToken, // sem token, nem tenta
  //   retry: false,
  // });

  const { data: user, isLoading } = useUser(hasToken);

  const login = ({ user, token }: { user: User; token: string }) => {
    localStorage.setItem(TOKEN_KEY, token);
    queryClient.setQueryData(["user"], user); // já preenche o user, sem nova requisição
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    queryClient.clear(); // limpa o cache do usuário anterior
    navigate("/home", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default UserProvider;
