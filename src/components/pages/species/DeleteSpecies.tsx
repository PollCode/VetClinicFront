import React, { useState } from "react";
import Button from "../../atoms/Button";
import { X } from "lucide-react";
import api from "../../../services/api";
import toast from "react-hot-toast";
import axios from "axios";
import { ISpeciesBase } from "../../../types/species.types";

interface SpeciesDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSpeciesDeleted: () => void;
  speciesData: ISpeciesBase | null;
}

const SpeciesDeleteModal: React.FC<SpeciesDeleteModalProps> = ({
  isOpen,
  onClose,
  onSpeciesDeleted,
  speciesData,
}) => {
  const [isLoading, setLoading] = useState(false);
  console.log(speciesData);
  const handleDelete = async () => {
    try {
      setLoading(true);

      // Llamada al endpoint de eliminación
      await api.delete(`species/${speciesData?.id}/`);

      // Mostrar notificación de éxito
      toast.success("Especie eliminada correctamente");

      // Notificar al componente padre
      onSpeciesDeleted();

      // Cerrar modal
      onClose();
    } catch (error) {
      let errorMessage = "Error al eliminar la especie";

      // Manejo de errores específicos
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      // Mostrar error al usuario
      toast.error(errorMessage);
      console.error("Error detallado:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Eliminar Especie
          </h3>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            onClick={onClose}
            disabled={isLoading}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300">
              ¿Estás seguro de que deseas eliminar la especie
              <span className="font-medium"> {speciesData?.name}</span>?
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Esta acción no se puede deshacer y eliminará permanentemente el
              área del sistema.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={isLoading}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDeleteModal;
