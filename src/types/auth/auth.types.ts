export interface IAuthUser {
  id: string;
  username: string;
  full_name: string;
  rol: "admin" | "doctor" | "laboratorista" | "secretaria" | "default";
}

export interface AuthContextType {
  user: IAuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

export interface LoginData {
  username: string;
  password: string;
}
