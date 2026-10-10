import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth();

  console.log("user", user);

  if (isLoading) return null; // don't redirect while the check is still running

  if (user && user.role !== "ADMIN") return <Navigate to='/login' replace />;

  return children;
};

export default ProtectedRoute;
