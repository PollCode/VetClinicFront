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
import { IArea } from "../../../types/area.types";
import AreaDetailsModal from "./DetailArea";
import AreaCreationForm from "./AddArea";
import axios from "axios";
import toast from "react-hot-toast";
import AreaEditForm from "./UpdateArea";
import AreaDeleteModal from "./DeleteArea";

const AreaManagement = () => {
  const [areas, setAreas] = useState<IArea[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createAreaModalOpen, setCreateAreaModalOpen] = useState(false);
  const [editAreaModalOpen, setEditAreaModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<IArea | null>(null);
  const [deleteAreaModalOpen, setDeleteAreaModalOpen] = useState(false);
  const [detailAreaModalOpen, setDetailAreaModalOpen] = useState(false);

  const fetchAreas = async () => {
    try {
      setLoading(true);
      const response = await api.get("/areas/");
      setAreas(response.data);
    } catch (err) {
      const validFields = ["detail"];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(message);
          } else {
            setError(message);
          }
        });
      }
      toast.error(error);
      console.error("Error fetching area data:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAreas = () => {
    fetchAreas();
  };

  useEffect(() => {
    fetchAreas();
  }, []);

  //Handlers
  const handleEditArea = async (areaId: number) => {
    try {
      const response = await api.get(`/areas/${areaId}/`);
      setSelectedArea(response.data);
      setEditAreaModalOpen(true);
    } catch (err) {
      const validFields = ["detail"];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(message);
          } else {
            setError(message);
          }
        });
      }
      toast.error(error);
      console.error("Error fetching user data:", error);
    }
  };

  const handleViewArea = async (areaId: number) => {
    try {
      const response = await api.get(`/areas/${areaId}/`);
      setSelectedArea(response.data);
      setDetailAreaModalOpen(true);
    } catch (err) {
      const validFields = ["detail"];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(message);
          } else {
            setError(message);
          }
        });
      }
      toast.error(error);
      console.error("Error fetching area data:", error);
    }
  };

  const handleAreaDeleted = async (areaId: number) => {
    try {
      const response = await api.get(`/areas/${areaId}/`);
      setSelectedArea(response.data);
      setDeleteAreaModalOpen(true);
    } catch (err) {
      const validFields = ["detail"];

      if (axios.isAxiosError(err) && err.response?.data) {
        Object.entries(err.response.data).forEach(([key, value]) => {
          const message = Array.isArray(value)
            ? value.join(", ")
            : String(value);

          if (validFields.includes(key)) {
            setError(message);
          } else {
            setError(message);
          }
        });
      }
      toast.error(error);
      console.error("Error fetching user data:", error);
    }
  };

  const columnHelper = createColumnHelper<IArea>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Nombre",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Descripción",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (cell) => (
        <div className="flex space-x-2">
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            onClick={() => handleViewArea(cell.row.original.id)}
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            onClick={() => handleEditArea(cell.row.original.id)}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            onClick={() => handleAreaDeleted(cell.row.original.id)}
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: areas,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
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
            Gestión de Áreas
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Gestione las áreas de la clínica
          </p>
        </div>

        <Button
          leftIcon={<Plus className="h-4 w-4" />}
          onClick={() => setCreateAreaModalOpen(true)}
        >
          Agregar área
        </Button>
        <AreaCreationForm
          isOpen={createAreaModalOpen}
          onClose={() => setCreateAreaModalOpen(false)}
          onUserCreated={refreshAreas}
        />
        {selectedArea && (
          <AreaEditForm
            isOpen={editAreaModalOpen}
            onClose={() => setEditAreaModalOpen(false)}
            onAreaUpdated={fetchAreas}
            areaData={selectedArea}
          />
        )}

        <AreaDetailsModal
          isOpen={detailAreaModalOpen}
          onClose={() => setDetailAreaModalOpen(false)}
          areaData={selectedArea}
        />

        <AreaDeleteModal
          isOpen={deleteAreaModalOpen}
          onClose={() => setDeleteAreaModalOpen(false)}
          onAreaDeleted={() => {
            setDeleteAreaModalOpen(false);
            refreshAreas();
          }}
          areaData={selectedArea}
        />
      </div>

      {/* Filters and Search */}
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
          {/* <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
            Filtros
          </Button> */}
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Exportar
          </Button>
        </div>
      </div>

      {/* Users Table */}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Showing{" "}
                <span className="font-medium">
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {table.getFilteredRowModel().rows.length}
                </span>{" "}
                results
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
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
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AreaManagement;
