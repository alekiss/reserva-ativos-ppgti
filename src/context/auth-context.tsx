import { createContext, useContext, useState, ReactNode } from "react";
import { me, logout, login } from "../services/auth-service";

type Role = "ADMIN" | "ALUNO";
type AuthContextType = {
  role: Role | null;
  setRole: (role: Role | null) => void;
  login: (matricula: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);

  const loginFn = async (matricula: string, senha: string) => {
    await login(matricula, senha);
    const resp = await me();
    setRole(resp.data.roles.includes("ADMIN") ? "ADMIN" : "ALUNO");
  };

  const logoutFn = async () => {
    await logout();
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ role, setRole, login: loginFn, logout: logoutFn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be within AuthProvider");
  return ctx;
};
