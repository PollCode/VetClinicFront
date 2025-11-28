import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../services/api";
import toast from "react-hot-toast";
import axios from "axios";
import { X } from "lucide-react";
import Button from "../../atoms/Button";

interface AreaCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const createAreaSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos  caracteres"),
  description: z.string().optional(),
});
// Definición de tipos
type AreaFormData = z.infer<typeof createAreaSchema>;

const AreaCreationForm: React.FC<AreaCreationFormProps> = ({
  isOpen,
  onClose,
  onUserCreated,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<AreaFormData>({
    resolver: zodResolver(createAreaSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: AreaFormData) => {
    try {
      setLoading(true);
      await api.post("areas/", data);
      toast.success("Área creada correctamente");
      onClose(); // Cierra el modal tras éxito
      reset(); // Solo se ejecuta si la llamada a la API es exitosa
      onUserCreated();
    } catch (err) {
      const validFields = ["name", "description"];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(key as keyof AreaFormData, { message });
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
                Agregar Área
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
                className="grid grid-cols-1 gap-6" // Cambiado de "space-y-6" a grid de dos columnas
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Campos en dos columnas */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.name
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("name", { required: true })}
                    placeholder="Sala #1"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Descripción
                  </label>
                  <input
                    id="description"
                    type="text"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.description
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("description", { required: true })}
                    placeholder=""
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-error">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="col-span-2">
                  <div className="mt-6 flex justify-end space-x-3">
                    <Button variant="outline" type="button" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" isLoading={isLoading}>
                      Agregar
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

export default AreaCreationForm;
