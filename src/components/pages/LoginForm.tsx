import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "../../services/api/auth.service";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff, Stethoscope } from "lucide-react";
import Button from "../atoms/Button";
import { Navigate, Link } from "react-router-dom";

const LoginForm = () => {
  const [globalErrors, setGlobalErrors] = useState<string | null>(null);
  const { login, isAuthenticated, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (err) {
      const validFields = ["username", "password"];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(key as keyof LoginFormData, { message });
          } else {
            setGlobalErrors(message);
          }
        });
      }

      if (globalErrors) {
        toast.error(globalErrors);
      }
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Iniciar sesión con tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
          O{" "}
          <Link
            to="/"
            className="font-medium text-primary hover:text-primary/90"
          >
            regresar a la página principal
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nombre de Usuario
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.username
                      ? "border-error"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                  {...register("username")}
                  placeholder="usuario.usuario"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-error">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password
                      ? "border-error"
                      : "border-gray-300 dark:border-gray-600"
                  } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                  {...register("password")}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-error">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-1 relative">
              <Button type="submit" fullWidth isLoading={loading}>
                Iniciar sesión
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  CIMAGT
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Si olvidó su contraseña contacte al administrador para un
                  cambio forzado
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
