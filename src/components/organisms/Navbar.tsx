import { Bell, Menu, User, LogOut, KeyRound } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import ThemeToggle from "../molecules/ThemeToggle";
import { Menu as HeadlessMenu } from "@headlessui/react";
import { Link } from "react-router-dom";
//import PasswordChangeForm from "../pages/Users/PasswordChange";

interface NavbarProps {
  height: string;
  onMenuClick: () => void;
}

const Navbar = ({ height, onMenuClick }: NavbarProps) => {
  const { user, logout } = useAuth();
  //const [passwordChangeModalOpen, setPasswordChangeModalOpen] = useState(false);
  //const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New appointment",
      message: "You have a new appointment at 2:00 PM",
    },
    { id: 2, title: "Reminder", message: "Follow up with patient #12345" },
  ]);

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Implement search functionality
  //   console.log("Searching for:", searchQuery);
  // };

  return (
    <header
      className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
      style={{ height }}
    >
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenu.Button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-300" />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white" />
              )}
            </HeadlessMenu.Button>

            <HeadlessMenu.Items className="absolute right-0 mt-2 w-80 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="px-4 py-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Notificaciones
                </p>
              </div>
              <div className="py-1">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <HeadlessMenu.Item key={notification.id}>
                      {({ active }) => (
                        <a
                          href="#"
                          className={`${
                            active ? "bg-gray-100 dark:bg-gray-700" : ""
                          } block px-4 py-2 text-sm`}
                        >
                          <p className="font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs">
                            {notification.message}
                          </p>
                        </a>
                      )}
                    </HeadlessMenu.Item>
                  ))
                ) : (
                  <p className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                    No hay notificaciones
                  </p>
                )}
              </div>
            </HeadlessMenu.Items>
          </HeadlessMenu>

          {/* User menu */}
          <HeadlessMenu as="div" className="relative">
            <HeadlessMenu.Button className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-full">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <User className="h-4 w-4" />
              </div>
              <span className="hidden md:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.full_name || "User"}
              </span>
            </HeadlessMenu.Button>

            <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="px-4 py-3">
                <p className="text-sm text-gray-900 dark:text-white">
                  {user?.full_name}
                </p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                  {user?.username}
                </p>
              </div>
              <div className="py-1">
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={`${
                        active ? "bg-gray-100 dark:bg-gray-700" : ""
                      } flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Perfil
                    </Link>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      //onClick={() => setPasswordChangeModalOpen(true)}
                      className={`${
                        active ? "bg-gray-100 dark:bg-gray-700" : ""
                      } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      <KeyRound className="mr-2 h-4 w-4" />
                      Cambiar contraseña
                    </button>
                  )}
                </HeadlessMenu.Item>
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active ? "bg-gray-100 dark:bg-gray-700" : ""
                      } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </button>
                  )}
                </HeadlessMenu.Item>
              </div>
            </HeadlessMenu.Items>
          </HeadlessMenu>
          {/* <PasswordChangeForm
            isOpen={passwordChangeModalOpen}
            onClose={() => setPasswordChangeModalOpen(false)}
          /> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
