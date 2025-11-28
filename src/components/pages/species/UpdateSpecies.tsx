import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../services/api";
import toast from "react-hot-toast";
import axios from "axios";
import { X } from "lucide-react";
import Button from "../../atoms/Button";
import { ISpecies } from "../../../types/species.types";

// Schema para actualización (sin campos de contraseña)
const updateSpeciesSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  description: z.string().optional(),
});

// Tipos
type SpeciesFormData = z.infer<typeof updateSpeciesSchema>;

interface SpeciesEditFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAreaUpdated: () => void;
  speciesData: ISpecies; // Datos del usuario a editar
}

const SpeciesEditForm: React.FC<SpeciesEditFormProps> = ({
  isOpen,
  onClose,
  onAreaUpdated,
  speciesData,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setError,
    reset,
  } = useForm<SpeciesFormData>({
    resolver: zodResolver(updateSpeciesSchema),
    defaultValues: {
      name: speciesData.name,
      description: speciesData.description,
    },
  });

  // Resetear formulario cuando se abre/cierra
  useEffect(() => {
    if (isOpen) {
      reset({
        name: speciesData.name,
        description: speciesData.description,
      });
    }
  }, [isOpen, speciesData, reset]);

  const onSubmit = async (data: SpeciesFormData) => {
    try {
      setLoading(true);

      // Filtrar solo los campos modificados
      const updatedFields = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key as keyof SpeciesFormData] = data[key as keyof SpeciesFormData];
        return acc;
      }, {} as Partial<SpeciesFormData>);

      // Enviar solo los campos modificados con PATCH
      await api.patch(`species/${speciesData?.id}/`, updatedFields);

      toast.success("Especie actualizada correctamente");
      onClose();
      onAreaUpdated();
    } catch (err) {
      const validFields = ["name", "description"];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(key as keyof SpeciesFormData, { message });
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
                Editar Especie
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
                    htmlFor="nombre"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Nombre
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.name
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("name")}
                    placeholder="Canino..."
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
                    Descripión
                  </label>
                  <input
                    id="description"
                    type="text"
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errors.description
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("description")}
                    placeholder=""
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-error">
                      {errors.description.message}
                    </p>
                  )}
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

export default SpeciesEditForm;
