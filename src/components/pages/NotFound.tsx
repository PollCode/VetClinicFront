import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../atoms/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-primary">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
          Page Not Found
        </h2>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-md">
          La página que buscas no existe o ha sido eliminada.
        </p>
        <div className="mt-10">
          <Link to="/">
            <Button leftIcon={<ArrowLeft className="h-5 w-5" />}>
              Regresar a la página principal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
