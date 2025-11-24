import { useState } from 'react';
import { format, startOfWeek, addDays, addHours, parse, isSameDay } from 'date-fns';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  User,
  Stethoscope,
  X,
  Edit,
  CheckCircle,
  Eye
} from 'lucide-react';
import Button from '../atoms/Button';
import Card from '../atoms/Card';
import { Menu } from '@headlessui/react';
import toast from 'react-hot-toast';

// Types
interface Appointment {
  id: string;
  patientName: string;
  ownerName: string;
  type: 'check-up' | 'vaccination' | 'surgery' | 'emergency' | 'follow-up';
  date: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'in-progress' | 'completed' | 'canceled';
  notes?: string;
}

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientName: 'Max',
    ownerName: 'John Smith',
    type: 'check-up',
    date: addHours(new Date(), 1),
    duration: 30,
    status: 'scheduled'
  },
  {
    id: '2',
    patientName: 'Bella',
    ownerName: 'Sarah Johnson',
    type: 'vaccination',
    date: addHours(new Date(), 3),
    duration: 15,
    status: 'scheduled'
  },
  {
    id: '3',
    patientName: 'Charlie',
    ownerName: 'Michael Brown',
    type: 'check-up',
    date: addHours(addDays(new Date(), 1), 2),
    duration: 30,
    status: 'scheduled'
  },
  {
    id: '4',
    patientName: 'Luna',
    ownerName: 'Jessica Williams',
    type: 'surgery',
    date: addHours(addDays(new Date(), 2), 4),
    duration: 120,
    status: 'scheduled'
  },
  {
    id: '5',
    patientName: 'Rocky',
    ownerName: 'David Miller',
    type: 'emergency',
    date: addHours(new Date(), -2),
    duration: 60,
    status: 'completed',
    notes: 'Treated for poisoning, follow-up in 3 days'
  }
];

const Appointments = () => {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const [view, setView] = useState<'week' | 'day'>('week');
  const [currentDay, setCurrentDay] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  
  // Create array of days for the week view
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));
  
  // Time slots for day view
  const businessHours = Array.from({ length: 10 }, (_, i) => i + 8); // 8 AM to 6 PM
  
  // Filter appointments for the current view
  const getAppointmentsForDay = (day: Date) => {
    return appointments.filter(appt => isSameDay(appt.date, day));
  };
  
  // Handle previous and next week navigation
  const goToPreviousWeek = () => {
    setCurrentWeek(prevWeek => addDays(prevWeek, -7));
  };
  
  const goToNextWeek = () => {
    setCurrentWeek(prevWeek => addDays(prevWeek, 7));
  };
  
  // Handle appointment status update
  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prevAppointments => 
      prevAppointments.map(appt => 
        appt.id === id ? { ...appt, status } : appt
      )
    );
    
    toast.success(`Appointment status updated to ${status}`);
    setSelectedAppointment(null);
  };
  
  // Get color based on appointment type
  const getAppointmentColor = (type: Appointment['type']) => {
    switch (type) {
      case 'check-up':
        return 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/30 dark:border-blue-800 dark:text-blue-400';
      case 'vaccination':
        return 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900/30 dark:border-green-800 dark:text-green-400';
      case 'surgery':
        return 'bg-purple-100 border-purple-300 text-purple-800 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400';
      case 'emergency':
        return 'bg-red-100 border-red-300 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400';
      case 'follow-up':
        return 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Appointments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage clinic appointments and schedules</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                view === 'week'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              } border border-gray-300 dark:border-gray-600 rounded-l-md`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                view === 'day'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              } border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-md`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>
          <Button leftIcon={<Plus className="h-4 w-4" />}>
            New Appointment
          </Button>
        </div>
      </div>
      
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={view === 'week' ? goToPreviousWeek : () => setCurrentDay(prevDay => addDays(prevDay, -1))}
          >
            <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
          <h2 className="text-lg font-semibold mx-4 text-gray-900 dark:text-white">
            {view === 'week' 
              ? `${format(currentWeek, 'MMM d, yyyy')} - ${format(addDays(currentWeek, 6), 'MMM d, yyyy')}`
              : format(currentDay, 'MMMM d, yyyy')
            }
          </h2>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            onClick={view === 'week' ? goToNextWeek : () => setCurrentDay(prevDay => addDays(prevDay, 1))}
          >
            <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <button
          className="px-3 py-1.5 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-md focus:outline-none"
          onClick={() => {
            setCurrentWeek(startOfWeek(new Date()));
            setCurrentDay(new Date());
          }}
        >
          Today
        </button>
      </div>
      
      {/* Week View */}
      {view === 'week' && (
        <Card className="overflow-hidden">
          <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
            {weekDays.map((day, index) => (
              <div 
                key={index} 
                className={`px-2 py-3 text-center ${
                  isSameDay(day, new Date()) 
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <p className="text-xs uppercase">{format(day, 'EEE')}</p>
                <p className="text-lg">{format(day, 'd')}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 min-h-[500px]">
            {weekDays.map((day, dayIndex) => {
              const dayAppointments = getAppointmentsForDay(day);
              return (
                <div 
                  key={dayIndex} 
                  className={`border-r border-gray-200 dark:border-gray-700 p-2 ${
                    isSameDay(day, new Date()) ? 'bg-primary/5' : ''
                  } ${dayIndex === 6 ? 'border-r-0' : ''}`}
                >
                  {dayAppointments.length > 0 ? (
                    <div className="space-y-2">
                      {dayAppointments.map(appointment => (
                        <button
                          key={appointment.id}
                          className={`block w-full p-2 rounded-md border text-left ${getAppointmentColor(appointment.type)}`}
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <p className="font-medium">{format(appointment.date, 'h:mm a')}</p>
                          <p className="truncate">{appointment.patientName}</p>
                          <p className="text-xs truncate">{appointment.ownerName}</p>
                          <div className="flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-xs">{appointment.duration} min</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                      <p className="text-sm">No appointments</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}
      
      {/* Day View */}
      {view === 'day' && (
        <Card className="overflow-hidden">
          <div className="flex">
            {/* Time slots */}
            <div className="w-20 border-r border-gray-200 dark:border-gray-700">
              {businessHours.map((hour, index) => (
                <div 
                  key={index} 
                  className="h-20 border-b border-gray-200 dark:border-gray-700 text-right pr-2 pt-1"
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {hour === 12 ? '12 PM' : hour < 12 ? `${hour} AM` : `${hour - 12} PM`}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Appointments */}
            <div className="flex-1 relative">
              {businessHours.map((hour, index) => (
                <div 
                  key={index} 
                  className="h-20 border-b border-gray-200 dark:border-gray-700"
                />
              ))}
              
              {getAppointmentsForDay(currentDay).map(appointment => {
                const startHour = appointment.date.getHours();
                const startMinute = appointment.date.getMinutes();
                const top = ((startHour - 8) * 80) + (startMinute / 60 * 80);
                const height = (appointment.duration / 60) * 80;
                
                return (
                  <div
                    key={appointment.id}
                    className={`absolute left-2 right-2 rounded-md border p-2 overflow-hidden cursor-pointer ${getAppointmentColor(appointment.type)}`}
                    style={{ top: `${top}px`, height: `${height}px` }}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <p className="font-medium text-sm">{format(appointment.date, 'h:mm a')}</p>
                    <p className="font-medium truncate">{appointment.patientName}</p>
                    <p className="text-xs truncate">{appointment.ownerName}</p>
                    {appointment.duration >= 30 && (
                      <p className="text-xs mt-1 capitalize">{appointment.type}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
      
      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Upcoming Appointments</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments
            .filter(appt => appt.status === 'scheduled' && appt.date > new Date())
            .sort((a, b) => a.date.getTime() - b.date.getTime())
            .slice(0, 3)
            .map(appointment => (
              <Card key={appointment.id} className="border-l-4 border-l-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{appointment.patientName}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.ownerName}</p>
                  </div>
                  <Menu as="div" className="relative">
                    <Menu.Button className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                              onClick={() => setSelectedAppointment(appointment)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View details
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300`}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-gray-100 dark:bg-gray-700' : ''
                              } flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Cancel
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Menu>
                </div>
                
                <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{format(appointment.date, 'MMMM d, yyyy')}</span>
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{format(appointment.date, 'h:mm a')} ({appointment.duration} min)</span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.type === 'check-up' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    appointment.type === 'vaccination' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    appointment.type === 'surgery' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                    appointment.type === 'emergency' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {appointment.type.replace('-', ' ')}
                  </span>
                </div>
              </Card>
            ))}
        </div>
      </div>
      
      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Appointment Details</h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Patient</p>
                  <div className="flex items-center mt-1">
                    <Stethoscope className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.patientName}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Owner</p>
                  <div className="flex items-center mt-1">
                    <User className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.ownerName}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Date & Time</p>
                <div className="flex items-center mt-1">
                  <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="font-medium text-gray-900 dark:text-white">
                    {format(selectedAppointment.date, 'MMMM d, yyyy')} at {format(selectedAppointment.date, 'h:mm a')}
                  </p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <p className="font-medium text-gray-900 dark:text-white">{selectedAppointment.duration} minutes</p>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedAppointment.type === 'check-up' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    selectedAppointment.type === 'vaccination' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    selectedAppointment.type === 'surgery' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                    selectedAppointment.type === 'emergency' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {selectedAppointment.type.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedAppointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    selectedAppointment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    selectedAppointment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {selectedAppointment.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              {selectedAppointment.notes && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Notes</p>
                  <p className="mt-1 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}
              
              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex flex-wrap gap-2">
                  {selectedAppointment.status === 'scheduled' && (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline"
                        leftIcon={<CheckCircle className="h-4 w-4" />}
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'in-progress')}
                      >
                        Start Appointment
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
                        leftIcon={<X className="h-4 w-4" />}
                        onClick={() => updateAppointmentStatus(selectedAppointment.id, 'canceled')}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {selectedAppointment.status === 'in-progress' && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      leftIcon={<CheckCircle className="h-4 w-4" />}
                      onClick={() => updateAppointmentStatus(selectedAppointment.id, 'completed')}
                    >
                      Complete
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    leftIcon={<Edit className="h-4 w-4" />}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;