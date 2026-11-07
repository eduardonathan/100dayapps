import type { ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}
