import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  Calendar, 
  Download, 
  Filter,
  Plus,
  Search,
  Eye,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';

// Types
interface Invoice {
  id: string;
  patientName: string;
  ownerName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
}

// Mock data
const revenueData = [
  { month: 'Jan', amount: 12500 },
  { month: 'Feb', amount: 14200 },
  { month: 'Mar', amount: 15800 },
  { month: 'Apr', amount: 16500 },
  { month: 'May', amount: 18900 },
  { month: 'Jun', amount: 17500 }
];

const expensesData = [
  { month: 'Jan', amount: 8500 },
  { month: 'Feb', amount: 9100 },
  { month: 'Mar', amount: 9600 },
  { month: 'Apr', amount: 9300 },
  { month: 'May', amount: 10200 },
  { month: 'Jun', amount: 9800 }
];

const serviceBreakdown = [
  { name: 'Examinations', value: 35 },
  { name: 'Vaccinations', value: 25 },
  { name: 'Surgery', value: 20 },
  { name: 'Lab Tests', value: 15 },
  { name: 'Other', value: 5 }
];

const invoices: Invoice[] = [
  {
    id: 'INV-001',
    patientName: 'Max',
    ownerName: 'John Smith',
    amount: 150.00,
    date: '2023-04-15',
    dueDate: '2023-05-15',
    status: 'paid',
    items: [
      { description: 'Annual checkup', quantity: 1, unitPrice: 85.00 },
      { description: 'Vaccinations', quantity: 2, unitPrice: 32.50 }
    ]
  },
  {
    id: 'INV-002',
    patientName: 'Bella',
    ownerName: 'Sarah Johnson',
    amount: 320.00,
    date: '2023-04-18',
    dueDate: '2023-05-18',
    status: 'pending',
    items: [
      { description: 'Dental cleaning', quantity: 1, unitPrice: 220.00 },
      { description: 'X-rays', quantity: 2, unitPrice: 50.00 }
    ]
  },
  {
    id: 'INV-003',
    patientName: 'Charlie',
    ownerName: 'Michael Brown',
    amount: 95.00,
    date: '2023-04-02',
    dueDate: '2023-05-02',
    status: 'overdue',
    items: [
      { description: 'Follow-up visit', quantity: 1, unitPrice: 65.00 },
      { description: 'Medication', quantity: 1, unitPrice: 30.00 }
    ]
  },
  {
    id: 'INV-004',
    patientName: 'Luna',
    ownerName: 'Jessica Williams',
    amount: 450.00,
    date: '2023-04-20',
    dueDate: '2023-05-20',
    status: 'pending',
    items: [
      { description: 'Surgery (minor)', quantity: 1, unitPrice: 350.00 },
      { description: 'Pre-operative blood work', quantity: 1, unitPrice: 75.00 },
      { description: 'Medication', quantity: 1, unitPrice: 25.00 }
    ]
  },
  {
    id: 'INV-005',
    patientName: 'Rocky',
    ownerName: 'David Miller',
    amount: 175.00,
    date: '2023-04-10',
    dueDate: '2023-05-10',
    status: 'paid',
    items: [
      { description: 'Emergency visit', quantity: 1, unitPrice: 120.00 },
      { description: 'Medication', quantity: 2, unitPrice: 27.50 }
    ]
  }
];

const COLORS = ['#DC2626', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];

const FinancialModule = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'expenses'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  
  // Filter invoices based on search query
  const filteredInvoices = invoices.filter(invoice => 
    invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate total revenue, expenses, and profit
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expensesData.reduce((sum, item) => sum + item.amount, 0);
  const totalProfit = totalRevenue - totalExpenses;
  
  // Stats for overview
  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      trend: '+15%',
      trendUp: true,
      icon: <DollarSign className="h-6 w-6 text-primary" />,
      bgColor: 'bg-primary/10',
      textColor: 'text-primary'
    },
    {
      title: 'Total Expenses',
      value: `$${totalExpenses.toLocaleString()}`,
      trend: '+8%',
      trendUp: false,
      icon: <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Net Profit',
      value: `$${totalProfit.toLocaleString()}`,
      trend: '+22%',
      trendUp: true,
      icon: <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />,
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      textColor: 'text-green-600 dark:text-green-400'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track revenue, expenses, and manage invoices</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" leftIcon={<Calendar className="h-4 w-4" />}>
            This Month
          </Button>
          <Button leftIcon={<Download className="h-4 w-4" />}>
            Export Report
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'invoices'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('invoices')}
          >
            Invoices
          </button>
          <button
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'expenses'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('expenses')}
          >
            Expenses
          </button>
        </nav>
      </div>
      
      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {stats.map((stat, index) => (
              <Card key={index} className="flex items-center">
                <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <div className="flex items-center">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mr-2">{stat.value}</h3>
                    <span className={`flex items-center text-xs ${stat.trendUp ? 'text-success' : 'text-error'}`}>
                      {stat.trendUp ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <svg className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Revenue vs Expenses">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData.map((item, index) => ({
                      month: item.month,
                      revenue: item.amount,
                      expenses: expensesData[index].amount
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, '']} />
                    <Bar dataKey="revenue" name="Revenue" fill="#DC2626" />
                    <Bar dataKey="expenses" name="Expenses" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card title="Profit Trend">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData.map((item, index) => ({
                      month: item.month,
                      profit: item.amount - expensesData[index].amount
                    }))}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Profit']} />
                    <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card title="Service Revenue Breakdown">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card title="Invoice Status">
              <div className="h-80 flex flex-col justify-center">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      {invoices.filter(inv => inv.status === 'paid').length}
                    </p>
                    <p className="text-sm text-green-800 dark:text-green-300">Paid</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
                      {invoices.filter(inv => inv.status === 'pending').length}
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-300">Pending</p>
                  </div>
                  <div className="text-center p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">
                      {invoices.filter(inv => inv.status === 'overdue').length}
                    </p>
                    <p className="text-sm text-red-800 dark:text-red-300">Overdue</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Activity</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mt-1.5"></span>
                      <div className="ml-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">Invoice <span className="font-medium">INV-001</span> was paid</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-2 w-2 rounded-full bg-primary mt-1.5"></span>
                      <div className="ml-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">New invoice <span className="font-medium">INV-006</span> created</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">5 hours ago</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-2 w-2 rounded-full bg-red-500 mt-1.5"></span>
                      <div className="ml-2">
                        <p className="text-sm text-gray-700 dark:text-gray-300">Invoice <span className="font-medium">INV-003</span> is now overdue</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-primary focus:border-primary"
                placeholder="Search invoices..."
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
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                New Invoice
              </Button>
            </div>
          </div>
          
          {/* Invoices Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                  <tr>
                    <th className="px-4 py-3">Invoice #</th>
                    <th className="px-4 py-3">Patient</th>
                    <th className="px-4 py-3">Owner</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Due Date</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map(invoice => (
                    <tr 
                      key={invoice.id} 
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {invoice.id}
                      </td>
                      <td className="px-4 py-3">
                        {invoice.patientName}
                      </td>
                      <td className="px-4 py-3">
                        {invoice.ownerName}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(invoice.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        ${invoice.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' :
                          invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' :
                          'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button 
                            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            onClick={() => setSelectedInvoice(invoice)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                            <FileText className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
      
      {/* Expenses Tab */}
      {activeTab === 'expenses' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="search"
                className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-primary focus:border-primary"
                placeholder="Search expenses..."
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
                Filters
              </Button>
              <Button leftIcon={<Plus className="h-4 w-4" />}>
                Add Expense
              </Button>
            </div>
          </div>
          
          <Card title="Monthly Expenses">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={expensesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Expenses']} />
                  <Bar dataKey="amount" name="Expenses" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Expense Categories">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Supplies', value: 40 },
                        { name: 'Salaries', value: 30 },
                        { name: 'Equipment', value: 15 },
                        { name: 'Utilities', value: 10 },
                        { name: 'Other', value: 5 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {serviceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card title="Recent Expenses">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Medical Supplies</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Apr 18, 2023</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">$1,250.00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Rent</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Apr 15, 2023</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">$2,500.00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Staff Salaries</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Apr 10, 2023</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">$4,800.00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Lab Equipment</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Apr 5, 2023</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">$850.00</p>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Utilities</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Apr 2, 2023</p>
                  </div>
                  <p className="font-medium text-gray-900 dark:text-white">$420.00</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
      
      {/* Invoice Details Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Invoice Details</h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Invoice {selectedInvoice.id}</h2>
                  <p className="text-gray-500 dark:text-gray-400">Issued: {new Date(selectedInvoice.date).toLocaleDateString()}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedInvoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' :
                  selectedInvoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500'
                }`}>
                  {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Bill To:</h4>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedInvoice.ownerName}</p>
                  <p className="text-gray-700 dark:text-gray-300">Patient: {selectedInvoice.patientName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Details:</h4>
                  <p className="text-gray-700 dark:text-gray-300">Due Date: {new Date(selectedInvoice.dueDate).toLocaleDateString()}</p>
                  <p className="text-gray-700 dark:text-gray-300">Payment Method: Credit Card</p>
                </div>
              </div>
              
              <div className="mb-8">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Invoice Items</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                      <tr>
                        <th className="px-4 py-2">Description</th>
                        <th className="px-4 py-2">Quantity</th>
                        <th className="px-4 py-2">Unit Price</th>
                        <th className="px-4 py-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedInvoice.items.map((item, index) => (
                        <tr key={index} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                          <td className="px-4 py-3">{item.description}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3">${item.unitPrice.toFixed(2)}</td>
                          <td className="px-4 py-3 text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <td colSpan={3} className="px-4 py-3 text-right font-medium">Subtotal</td>
                        <td className="px-4 py-3 text-right font-medium">${selectedInvoice.amount.toFixed(2)}</td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <td colSpan={3} className="px-4 py-3 text-right font-medium">Tax (0%)</td>
                        <td className="px-4 py-3 text-right font-medium">$0.00</td>
                      </tr>
                      <tr className="bg-primary/10 dark:bg-primary/20">
                        <td colSpan={3} className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">Total</td>
                        <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">${selectedInvoice.amount.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                  Download PDF
                </Button>
                {selectedInvoice.status === 'pending' && (
                  <Button leftIcon={<CheckCircle className="h-4 w-4" />}>
                    Mark as Paid
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialModule;