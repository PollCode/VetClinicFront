import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Calendar,
  DollarSign,
  Users,
  Clock,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Card from "../atoms/Card";
import Button from "../atoms/Button";

// Mock data
const appointmentsByDay = [
  { day: "Lun", count: 8 },
  { day: "Mar", count: 12 },
  { day: "Mie", count: 10 },
  { day: "Jue", count: 15 },
  { day: "Vie", count: 20 },
  { day: "Sab", count: 18 },
  { day: "Dom", count: 5 },
];

const patientDistribution = [
  { name: "Perros", value: 55 },
  { name: "Gatos", value: 30 },
  { name: "Aves", value: 10 },
  { name: "Otros", value: 5 },
];

const revenueData = [
  { month: "Ene", revenue: 15000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 17000 },
  { month: "Abr", revenue: 20000 },
  { month: "May", revenue: 25000 },
  { month: "Jun", revenue: 30000 },
];

const COLORS = ["#DC2626", "#3B82F6", "#10B981", "#F59E0B"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    pendingAppointments: 0,
  });

  // Simulate data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setStats({
        totalPatients: 243,
        totalAppointments: 45,
        totalRevenue: 28750,
        pendingAppointments: 12,
      });
    }, 1000);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tablero
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bienvenido, eche un vistazo al desarrollo de su clínica
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Calendar className="h-4 w-4" />}>
            Hoy
          </Button>
          <Button leftIcon={<ArrowUpRight className="h-4 w-4" />}>
            Ver Reportes
          </Button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10 mr-4">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total de Pacientes
            </p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                {stats.totalPatients}
              </h3>
              <span className="flex items-center text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                12%
              </span>
            </div>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Citas
            </p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                {stats.totalAppointments}
              </h3>
              <span className="flex items-center text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                8%
              </span>
            </div>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 mr-4">
            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ganancias
            </p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                ${stats.totalRevenue.toLocaleString()}
              </h3>
              <span className="flex items-center text-xs text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                15%
              </span>
            </div>
          </div>
        </Card>

        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-orange-100 dark:bg-orange-900/30 mr-4">
            <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Pendiente
            </p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                {stats.pendingAppointments}
              </h3>
              <span className="flex items-center text-xs text-error">
                <TrendingDown className="h-3 w-3 mr-1" />
                3%
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Citas esta semana">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={appointmentsByDay}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Distribución de Pacientes">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={patientDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {patientDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Tendencia de Ganancias" className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#DC2626"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
