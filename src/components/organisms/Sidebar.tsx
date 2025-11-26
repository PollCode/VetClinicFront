import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Stethoscope,
  // Calendar,
  // DollarSign,
  // BookOpen,
  ChevronLeft,
  ChevronRight,
  Settings,
  //Users,
  LandPlot,
  //ClipboardList,
  User,
  UsersRound,
  Shell,
  Dna,
  FileStack,
  MousePointerClick,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface SidebarProps {
  width: string;
  collapsedWidth: string;
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: JSX.Element;
  roles?: Array<string>;
}

const Sidebar = ({
  width,
  collapsedWidth,
  collapsed,
  onToggle,
}: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location]);

  const navItems: NavItem[] = [
    {
      name: "Tablero",
      path: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Usuarios",
      path: "/users",
      icon: <User className="h-5 w-5" />,
      roles: ["admin"],
    },
    {
      name: "Servicios",
      path: "/servicios",
      icon: <MousePointerClick className="h-5 w-5" />,
    },
    {
      name: "Clientes",
      path: "/clientes",
      icon: <UsersRound className="h-5 w-5" />,
    },
    {
      name: "Especies",
      path: "/especies",
      icon: <Shell className="h-5 w-5" />,
    },
    {
      name: "Razas",
      path: "/razas",
      icon: <Dna className="h-5 w-5" />,
    },
    {
      name: "Pacientes",
      path: "/pacientes",
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      name: "Historias Clínicas",
      path: "/historias-clinicas",
      icon: <FileStack className="h-5 w-5" />,
    },
    // {
    //   name: "Citas",
    //   path: "/appointments",
    //   icon: <Calendar className="h-5 w-5" />,
    // },
    // {
    //   name: "Finanzas",
    //   path: "/finances",
    //   icon: <DollarSign className="h-5 w-5" />,
    //   //roles: ["admin", "doctor"],
    // },
    // {
    //   name: "Libreria",
    //   path: "/library",
    //   icon: <BookOpen className="h-5 w-5" />,
    // },
    // // {
    // //   name: "Staff",
    // //   path: "/staff",
    // //   icon: <Users className="h-5 w-5" />,
    // //   //roles: ["admin"],
    // // },
    // {
    //   name: "Reportes",
    //   path: "/reports",
    //   icon: <ClipboardList className="h-5 w-5" />,
    //   //roles: ["admin", "doctor"],
    // },
  ];

  const nomNavItems: NavItem[] = [
    {
      name: "Áreas",
      path: "/areas",
      icon: <LandPlot className="h-5 w-5" />,
      roles: ["admin"],
    },
  ];

  // Filter items based on user role
  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return user?.rol && item.roles.includes(user.rol);
  });

  const filteredNomNavItems = nomNavItems.filter((item) => {
    if (!item.roles) return true;
    return user?.rol && item.roles.includes(user.rol);
  });

  return (
    <aside
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : ""
      }`}
      style={{ width: collapsed ? collapsedWidth : width }}
    >
      <div className="h-full flex flex-col">
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed && (
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
              <h1 className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
                Clínica CIMAGT
              </h1>
            </div>
          )}
          {collapsed && (
            <div className="mx-auto">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-white" />
              </div>
            </div>
          )}
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {filteredNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${collapsed ? "justify-center" : "justify-start"}`
              }
            >
              <div className={collapsed ? "" : "mr-3"}>{item.icon}</div>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}

          {/* Nomenclatures divisor */}
          {user?.rol == "admin" && (
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="text-md font-bold bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2">
                  Nomencladores
                </span>
              </div>
            </div>
          )}

          {filteredNomNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } ${collapsed ? "justify-center" : "justify-start"}`
              }
            >
              <div className={collapsed ? "" : "mr-3"}>{item.icon}</div>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              } ${collapsed ? "justify-center" : "justify-start"}`
            }
          >
            <div className={collapsed ? "" : "mr-3"}>
              <Settings className="h-5 w-5" />
            </div>
            {!collapsed && <span>Configuración</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
