import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getMe } from "../services/authService";
import { replace, useNavigate } from "react-router";

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

const UserContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("jwt");
      setIsLoading(true);

      try {
        if (!token) return;

        const response = await getMe(token);

        console.log("response", response);
        setUser(response);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.setItem("jwt", "");
    setUser(null);
    navigate("/home", { replace: true });
  };

  const login = (info: LoginUser) => {
    const token = info.token;
    console.log("token", token);
    localStorage.setItem("jwt", token);
    setUser(info.user);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default UserContext;
