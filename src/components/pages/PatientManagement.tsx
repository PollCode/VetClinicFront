import { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  Download,
  ChevronDown,
  Edit,
  Trash,
  Eye,
} from "lucide-react";
import Button from "../atoms/Button";
import Card from "../atoms/Card";
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

// Types
interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  owner: string;
  lastVisit: string;
  status: "healthy" | "treatment" | "critical";
}

// Mock data
const mockPets: Pet[] = [
  {
    id: "1",
    name: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    age: 5,
    owner: "John Smith",
    lastVisit: "2023-03-15",
    status: "healthy",
  },
  {
    id: "2",
    name: "Bella",
    species: "Cat",
    breed: "Siamese",
    age: 3,
    owner: "Sarah Johnson",
    lastVisit: "2023-04-02",
    status: "treatment",
  },
  {
    id: "3",
    name: "Charlie",
    species: "Dog",
    breed: "Beagle",
    age: 7,
    owner: "Michael Brown",
    lastVisit: "2023-02-28",
    status: "healthy",
  },
  {
    id: "4",
    name: "Luna",
    species: "Cat",
    breed: "Maine Coon",
    age: 2,
    owner: "Jessica Williams",
    lastVisit: "2023-03-25",
    status: "healthy",
  },
  {
    id: "5",
    name: "Rocky",
    species: "Dog",
    breed: "German Shepherd",
    age: 4,
    owner: "David Miller",
    lastVisit: "2023-04-10",
    status: "critical",
  },
  {
    id: "6",
    name: "Oliver",
    species: "Cat",
    breed: "Bengal",
    age: 1,
    owner: "Amanda Davis",
    lastVisit: "2023-04-05",
    status: "treatment",
  },
  {
    id: "7",
    name: "Cooper",
    species: "Dog",
    breed: "Labrador",
    age: 6,
    owner: "Robert Wilson",
    lastVisit: "2023-03-18",
    status: "healthy",
  },
  {
    id: "8",
    name: "Milo",
    species: "Cat",
    breed: "Persian",
    age: 4,
    owner: "Jennifer Taylor",
    lastVisit: "2023-02-20",
    status: "treatment",
  },
  {
    id: "9",
    name: "Bailey",
    species: "Dog",
    breed: "Poodle",
    age: 3,
    owner: "Christopher Anderson",
    lastVisit: "2023-04-01",
    status: "healthy",
  },
  {
    id: "10",
    name: "Leo",
    species: "Bird",
    breed: "Parrot",
    age: 2,
    owner: "Elizabeth Thomas",
    lastVisit: "2023-03-30",
    status: "healthy",
  },
];

const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const columnHelper = createColumnHelper<Pet>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("species", {
      header: "Species",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("breed", {
      header: "Breed",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("age", {
      header: "Age",
      cell: (info) => `${info.getValue()} years`,
    }),
    columnHelper.accessor("owner", {
      header: "Owner",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastVisit", {
      header: "Last Visit",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => {
        const status = info.getValue();
        const statusClasses = {
          healthy:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500",
          treatment:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500",
          critical:
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status]}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <Edit className="h-4 w-4" />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
            <Trash className="h-4 w-4" />
          </button>
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: mockPets,
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Patient Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your pet patients and their medical records
          </p>
        </div>
        <Button leftIcon={<Plus className="h-4 w-4" />}>Add New Patient</Button>
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
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
            Filters
          </Button>
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Patients Table */}
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
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
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

export default PatientManagement;
