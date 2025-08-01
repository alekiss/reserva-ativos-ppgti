import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { role } = useAuth();
  const isAuthenticated = role !== null;
  const isAuthorized = allowedRoles ? allowedRoles.includes(role as string) : true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;