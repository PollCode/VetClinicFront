import React from "react";
import Button from "../../atoms/Button";
import { X } from "lucide-react";
import { IUser } from "../../../types/user.types";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: IUser | null;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  userData,
}) => {
  if (!isOpen || !userData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-xl w-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Detalles del Usuario
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
                {userData.first_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Apellido
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {userData.last_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Usuario
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {userData.username}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Rol</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {userData.rol}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Área</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {userData.area?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Superusuario
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {userData.is_superuser ? "Sí" : "No"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Estado</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {userData.is_active ? "Activo" : "Inactivo"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Creado</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(userData.created_date).toLocaleDateString()}
              </p>
            </div>
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

export default UserDetailsModal;
