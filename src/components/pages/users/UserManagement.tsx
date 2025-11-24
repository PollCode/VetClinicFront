import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  //Filter,
  Download,
  ChevronDown,
  Edit,
  Trash,
  Eye,
} from "lucide-react";
import Button from "../../atoms/Button";
import Card from "../../atoms/Card";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { api } from "../../../services/api/index";
import { IUser } from "../../../interfaces/users";
//import UserCreationForm from "./AddUser";
//import UserEditForm from "./UpdateUser";
//import UserDetailsModal from "./DetailUser";
//import UserDeleteModal from "./DeleteUser";
//import { Link } from "react-router-dom";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //   const [userModalOpen, setUserModalOpen] = useState(false);
  //   const [editModalOpen, setEditModalOpen] = useState(false);
  //   const [detailModalOpen, setDetailModalOpen] = useState(false);
  //   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  //   const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users/");
      setUsers(response.data);
    } catch (err) {
      setError("Error cargando usuarios: " + err);
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  //   const refetchUsers = async () => {
  //     await fetchUsers();
  //   };

  useEffect(() => {
    fetchUsers();
  }, []);

  //   const handleEditUser = async (userId: number) => {
  //     try {
  //       const response = await api.get(`/users/${userId}/`);
  //       const userData = response.data;
  //       setSelectedUser({
  //         ...userData,
  //         area: {
  //           id: userData.area.id,
  //           nombre: userData.area.nombre,
  //         },
  //       });
  //       setEditModalOpen(true);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   const handleViewUser = async (userId: number) => {
  //     try {
  //       const response = await api.get(`/users/${userId}/`);
  //       setSelectedUser(response.data);
  //       setDetailModalOpen(true);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   const handleUserDeleted = async (userId: number) => {
  //     try {
  //       const response = await api.get(`/users/${userId}/`);
  //       setSelectedUser(response.data);
  //       setDeleteModalOpen(true);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  const columnHelper = createColumnHelper<IUser>();

  const columns = [
    columnHelper.accessor("first_name", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("last_name", {
      header: "Apellidos",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("username", {
      header: "Usuario",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("rol", {
      header: "Rol",
      cell: (info) => {
        const role = info.getValue() || "No definido";
        const roleClasses = {
          admin:
            "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500",
          doctor:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
          laboratorista:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
          secretaria:
            "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-500",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              roleClasses[role as keyof typeof roleClasses] || "bg-gray-100"
            }`}
          >
            {role}
          </span>
        );
      },
    }),
    columnHelper.accessor("is_superuser", {
      header: "Admin",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            info.getValue()
              ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-500"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
          }`}
        >
          {info.getValue() ? "Yes" : "No"}
        </span>
      ),
    }),
    columnHelper.accessor("area", {
      header: "Área",
      cell: (info) => {
        const area = info.getValue();
        return area ? area.nombre : "Sin área";
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex space-x-2">
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            //onClick={() => handleViewUser(cell.row.original.id)}
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            //onClick={() => handleEditUser(cell.row.original.id)}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            //onClick={() => handleUserDeleted(cell.row.original.id)}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      globalFilter: searchQuery,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchQuery,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Gestión de Usuarios
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gestione los usuarios y sus roles
          </p>
        </div>

        <Button
          leftIcon={<Plus className="h-4 w-4" />}
          //onClick={() => setUserModalOpen(true)}
        >
          Agregar usuario
        </Button>
        {/* <UserCreationForm
          isOpen={userModalOpen}
          onClose={() => setUserModalOpen(false)}
          onUserCreated={refetchUsers}
        /> */}
        {/* Modal de edición */}
        {/* {selectedUser && (
          <UserEditForm
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onUserUpdated={refetchUsers}
            userData={selectedUser}
          />
        )}

        <UserDetailsModal
          isOpen={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          userData={selectedUser}
        />

        <UserDeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onUserDeleted={() => {
            setDeleteModalOpen(false);
            refetchUsers();
          }}
          userData={selectedUser}
        /> */}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-primary focus:border-primary"
            placeholder="Buscar usuarios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Exportar
          </Button>
        </div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanSort() && (
                          <ChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              header.column.getIsSorted() === "asc"
                                ? "rotate-180"
                                : header.column.getIsSorted() === "desc"
                                ? "rotate-0"
                                : ""
                            }`}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                  >
                    No hay usuarios
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Mostrando{" "}
                <span className="font-medium">
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}
                </span>{" "}
                al{" "}
                <span className="font-medium">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>{" "}
                de{" "}
                <span className="font-medium">
                  {table.getFilteredRowModel().rows.length}
                </span>{" "}
                resultados
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
                  (page) => (
                    <button
                      key={page}
                      className={`px-3 py-1 rounded-md text-sm ${
                        page === table.getState().pagination.pageIndex
                          ? "bg-primary text-white"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      onClick={() => table.setPageIndex(page)}
                    >
                      {page + 1}
                    </button>
                  )
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserManagement;
