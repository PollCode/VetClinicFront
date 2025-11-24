import { Link } from "react-router-dom";
import {
  Stethoscope,
  ChevronRight,
  Users,
  Calendar,
  DollarSign,
  BookOpen,
} from "lucide-react";
import Button from "../atoms/Button";
import logo from "../../assets/logo/CIMAGT-02.svg";

const LandingPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              CIMAGT
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Funcionalidades
            </a>
            <a
              href="#testimonials"
              className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-base font-medium text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Pricing
            </a>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 text-center">
        <img
          src={logo}
          alt="logo-cimagt"
          className="h-50 w-auto max-h-60 object-contain mx-auto"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Sistema de Gestión para Clínica Veterinaria CIMAGT
        </h1>
        <p className="mt-4 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400">
          Una solución de administración todo en uno diseñado para clínicas
          veterinarias modernas. Simplifica citas, registro de pacientes,
          facturación y más.
        </p>
        <div className="mt-10 flex justify-center">
          <Link to="/login">
            <Button size="lg" rightIcon={<ChevronRight className="h-5 w-5" />}>
              Empezar
            </Button>
          </Link>
          <a href="#features" className="ml-4">
            <Button variant="outline" size="lg">
              Aprender más
            </Button>
          </a>
        </div>
      </div>
      {/* Features Section */}
      <div id="features" className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
              Funcionalidades
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
              Todo lo que necesitas para llevar tu clínica
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Nuestro comprensivo kit de herramientas ayuda a brindar un mejor
              cuidado para tus pacientes.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-3 rounded-full bg-primary/10 inline-block">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Manejo de Pacientes
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Una forma fácil de manejar los registros de las mascotas,
                historial médico y la información de sus dueños en un solo
                lugar.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 inline-block">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Agendar Citas
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Agilice las reservas con un sistema de calendario intuitivo y
                recordatorios automáticos.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 inline-block">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Gestión Financiera
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Gestione la facturación y los pagos con nuestras completas
                herramientas financieras.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-600">
              <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 inline-block">
                <BookOpen className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Biblioteca Digital
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                Acceda a recursos médicos, materiales educativos y protocolos de
                tratamiento.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div id="testimonials" className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-base font-semibold text-primary uppercase tracking-wide">
              Testimonios
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
              De confianza por veterinarias a nivel nacional
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    DS
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Dr. Sarah Johnson
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Small Animal Clinic
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                "This system has transformed our practice. We've reduced
                administrative work by 40% and can focus more on patient care."
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    MB
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Dr. Michael Brown
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    City Veterinary Hospital
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                "The appointment scheduling and reminders have practically
                eliminated no-shows. Our clients love the convenience too."
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                    LP
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Laura Peterson
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Practice Manager
                  </p>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                "The financial analytics have given us insights we never had
                before. We've optimized our services and increased revenue by
                25%."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="container mx-auto px-6 py-12">
          <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">CIMAGT</span>
            </div>
            <p className="mt-4 md:mt-0 text-base text-gray-400">
              &copy; 2025 Sistema de Gestión para clínica veterinaria CIMAGT.
              Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
