import React from "react";
import Button from "../../atoms/Button";
import { X } from "lucide-react";
import { ISpecies } from "../../../types/species.types";

interface SpeciesDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  speciesData: ISpecies | null;
}

const SpeciesDetailsModal: React.FC<SpeciesDetailsModalProps> = ({
  isOpen,
  onClose,
  speciesData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xl w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Detalles de la Especie
          </h3>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Nombre</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {speciesData?.name}
              </p>
            </div>
            {speciesData && (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Creado
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(speciesData.created_date).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetailsModal;
