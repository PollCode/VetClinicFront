import { createContext, useState, useEffect, useCallback } from "react";
import {
  AuthContextType,
  IAuthUser,
  LoginData,
} from "../types/auth/auth.types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api/auth.service";
import { decodeAccessToken } from "../utilis/jwt";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Logout estable con useCallback para evitar referencias obsoletas [[5]]
  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("full_name");
    localStorage.removeItem("tokenTimestamp"); // Nuevo campo para timestamp
    setUser(null);
    toast.success("Cierre de sesión correcto");
    navigate("/login");
  }, [navigate]);

  // Verificación de autenticación y expiración al montar [[6]]
  useEffect(() => {
    const checkAuth = () => {
      try {
        const access = localStorage.getItem("access");
        const userData = localStorage.getItem("user");
        const timestamp = localStorage.getItem("tokenTimestamp");

        if (access && userData && timestamp) {
          const parsedUser = JSON.parse(userData) as IAuthUser;
          const currentTime = Date.now();
          const eightHours = 8 * 60 * 60 * 1000;

          if (currentTime - parseInt(timestamp) > eightHours) {
            logout(); // Forzar cierre si han pasado 8 horas
            return;
          }
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Error parsing user data:", err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [logout]);

  const login = async (data: LoginData) => {
    setLoading(true);

    try {
      const response = await authService.login(data);
      const decoded = decodeAccessToken(response.access);
      // Almacenar tokens y timestamp [[1]]
      localStorage.setItem("access", response.access);
      localStorage.setItem("refresh", response.refresh);
      localStorage.setItem("full_name", decoded.full_name);
      localStorage.setItem("local", decoded.rol);
      localStorage.setItem("tokenTimestamp", Date.now().toString());

      // Configurar expiración programada [[3]]
      setTimeout(() => {
        logout();
      }, 8 * 60 * 60 * 1000);

      setUser(response.user);
      toast.success("Inicio de sesión correcto");

      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
