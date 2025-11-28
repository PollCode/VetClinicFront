import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../../services/api";
import toast from "react-hot-toast";
import axios from "axios";
import { X } from "lucide-react";
import Button from "../../atoms/Button";
import { ISpeciesBase } from "../../../types/species.types";

interface BreedCreationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onBreedCreated: () => void;
}

const createBreedSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos  caracteres"),
  species: z.number().min(1),
  size_category: z.string().min(2, "Seleccione una categoría de tamaño"),
});
// Definición de tipos
type BreedFormData = z.infer<typeof createBreedSchema>;

const BreedCreationForm: React.FC<BreedCreationFormProps> = ({
  isOpen,
  onClose,
  onBreedCreated,
}) => {
  const [species, setSpecies] = useState<ISpeciesBase[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<BreedFormData>({
    resolver: zodResolver(createBreedSchema),
    defaultValues: {
      name: "",
      species: undefined,
      size_category: undefined,
    },
  });

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await api.get<ISpeciesBase[]>("species/");
        setSpecies(response.data);
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

        console.error("Error al obtener las especies: ", generalError);
      }
    };

    fetchSpecies();
  }, []);

  const onSubmit = async (data: BreedFormData) => {
    try {
      setLoading(true);
      await api.post("breeds/", data);
      toast.success("Raza creada correctamente");
      onClose(); // Cierra el modal tras éxito
      reset(); // Solo se ejecuta si la llamada a la API es exitosa
      onBreedCreated();
    } catch (err) {
      const validFields = ["name", "species", "size_category"];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(key as keyof BreedFormData, { message });
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
                Agregar Especie
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
                className="grid grid-cols-1 gap-6"
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
                    placeholder="Labrador..."
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="species"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Especie
                  </label>
                  <select
                    id="species"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.species
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("species", {
                      setValueAs: (value) => parseInt(value, 10), // Convierte el valor a número
                    })}
                  >
                    <option value="" disabled hidden>
                      Seleccione una especie
                    </option>
                    {/* Mapea las áreas desde el estado */}
                    {species.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec?.name}
                      </option>
                    ))}
                  </select>
                  {errors.species && (
                    <p className="mt-1 text-sm text-error">
                      {errors.species.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="size_category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Categoría de tamaño
                  </label>
                  <select
                    id="size_category"
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.size_category
                        ? "border-error"
                        : "border-gray-300 dark:border-gray-600"
                    } rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:text-white`}
                    {...register("size_category")}
                  >
                    <option value="" disabled hidden>
                      Seleccione una categoría de tamaño
                    </option>
                    <option value="toy">Toy/Enano</option>
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                    <option value="gigante">Gigante</option>
                  </select>
                  {errors.size_category && (
                    <p className="mt-1 text-sm text-error">
                      {errors.size_category.message}
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

export default BreedCreationForm;
