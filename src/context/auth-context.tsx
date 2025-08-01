import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { me, logout, login } from "../services/auth-service";
import Loading from "../components/loading/loading";

type Role = "ADMIN" | "ALUNO";
type AuthContextType = {
  role: Role | null;
  setRole: (role: Role | null) => void;
  login: (matricula: string, senha: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const resp = await me();
        setRole(resp.data.roles.includes("ADMIN") ? "ADMIN" : "ALUNO");
      } catch {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const loginFn = async (matricula: string, senha: string) => {
    setLoading(true);
    await login(matricula, senha);
    const resp = await me();
    setRole(resp.data.roles.includes("ADMIN") ? "ADMIN" : "ALUNO");
    setLoading(false);
  };

  const logoutFn = async () => {
    setLoading(true);
    await logout();
    setRole(null);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{ role, setRole, login: loginFn, logout: logoutFn, loading }}
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