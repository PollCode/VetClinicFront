import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../services/api";
import toast from "react-hot-toast";
import axios from "axios";
import { X } from "lucide-react";
import Button from "../../atoms/Button";
import { IAreaBase } from "../../../types/area.types";
import { IUser } from "../../../types/user.types";

// Schema para actualización (sin campos de contraseña)
const updateUserSchema = z.object({
  first_name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  last_name: z
    .string()
    .min(2, "Los apellidos deben tener al menos 2 caracteres"),
  username: z
    .string()
    .min(4, "EL nombre de usuario debe tener al menos 4 caracteres"),
  area: z.number({ message: "Seleccione el área" }).min(1),
  rol: z.string().min(4, "El rol debe tener al menos 4 caracteres"),
  is_superuser: z.boolean(),
});

// Tipos
type UserFormData = z.infer<typeof updateUserSchema>;

interface UserEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
  userData: IUser; // Datos del usuario a editar
}

const UserEditForm: React.FC<UserEditFormProps> = ({
  isOpen,
  onClose,
  onUserUpdated,
  userData,
}) => {
  const [areas, setAreas] = useState<IAreaBase[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setError,
    reset,
    watch,
  } = useForm<UserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
      username: userData.username,
      rol: userData.rol,
      area: userData.area?.id,
      is_superuser: userData.is_superuser,
    },
  });

  // Cargar áreas desde API
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await api.get<IAreaBase[]>("areas/");
        setAreas(response.data);
      } catch (err) {
        const validFields = ["detail"];

        if (axios.isAxiosError(err) && err.response?.data) {
          Object.entries(err.response.data).forEach(([key, value]) => {
            const message = Array.isArray(value)
              ? value.join(", ")
              : String(value);

            if (validFields.includes(key)) {
              setGeneralError(message);
            } else {
              setGeneralError(message);
            }
          });
        }
        toast.error(generalError);

        console.error("Error al obtener las areas: ", generalError);
      }
    };

    fetchAreas();
  }, []);

  // Resetear formulario cuando se abre/cierra
  useEffect(() => {
    if (isOpen) {
      reset({
        first_name: userData.first_name,
        last_name: userData.last_name,
        username: userData.username,
        rol: userData.rol,
        area: userData.area?.id,
        is_superuser: userData.is_superuser,
      });
    }
  }, [isOpen, userData, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      setLoading(true);

      // Filtrar solo los campos modificados
      const updatedFields = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key as keyof UserFormData] = data[key as keyof UserFormData];
        return acc;
      }, {} as Partial<UserFormData>);

      // Enviar solo los campos modificados con PATCH
      await api.patch(`users/${userData.id}/`, updatedFields);

      toast.success("Usuario actualizado correctamente");
      onClose();
      onUserUpdated();
    } catch (err) {
      const validFields = [
        "first_name",
        "last_name",
        "username",
        "rol",
        "area",
      ];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(key as keyof UserFormData, { message });
          } else {
            setGeneralError(message);
            toast.error(generalError);
            console.log("Error detallado:", generalError);
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xl w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Editar Usuario
              </h3>
              <button
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                onClick={onClose}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <form
                className="grid grid-cols-2 gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Campos de texto */}
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nombre
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.first_name
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("first_name")}
                    placeholder="Pedro"
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-sm text-error">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Apellidos
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.last_name
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("last_name")}
                    placeholder="González"
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-sm text-error">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Usuario
                  </label>
                  <input
                    id="username"
                    type="text"
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

                {/* Selects */}
                <div>
                  <label
                    htmlFor="rol"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Rol
                  </label>
                  <select
                    id="rol"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.rol
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("rol")}
                  >
                    <option value="" disabled hidden>
                      Seleccione un rol
                    </option>
                    <option value="admin">ADMINISTRADOR</option>
                    <option value="doctor">DOCTOR</option>
                    <option value="laboratorista">LABORATORISTA</option>
                    <option value="secretaria">SECRETARIA</option>
                  </select>
                  {errors.rol && (
                    <p className="mt-1 text-sm text-error">
                      {errors.rol.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="area"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Área
                  </label>
                  <select
                    id="area"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.area
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("area", {
                      setValueAs: (value) => parseInt(value, 10),
                    })}
                  >
                    <option value="" disabled hidden>
                      Seleccione un área
                    </option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                  {errors.area && (
                    <p className="mt-1 text-sm text-error">
                      {errors.area.message}
                    </p>
                  )}
                </div>

                {/* Switch */}
                <div>
                  <div className="flex items-center mt-6">
                    <label
                      htmlFor="is_superuser"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-4 whitespace-nowrap"
                    >
                      Superusuario
                    </label>
                    <div className="flex-1">
                      <input
                        id="is_superuser"
                        type="checkbox"
                        className="sr-only"
                        {...register("is_superuser")}
                      />
                      <div
                        className={`${
                          watch("is_superuser")
                            ? "bg-primary"
                            : "bg-gray-200 dark:bg-gray-600"
                        } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                      >
                        <span
                          className={`${
                            watch("is_superuser")
                              ? "translate-x-6"
                              : "translate-x-1"
                          } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                      </div>
                      {errors.is_superuser && (
                        <p className="mt-1 text-sm text-error">
                          {errors.is_superuser.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botones */}
                <div className="col-span-2">
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button variant="outline" type="button" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                      Guardar cambios
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserEditForm;
