export interface Appointment {
  id: string;
  type: string;
  branch: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  customerName: string;
  notes?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
}

export interface AppointmentType {
  id: string;
  name: string;
  duration: number;
  description: string;
}

export const branches: Branch[] = [
  {
    id: '1',
    name: 'Downtown Branch',
    address: '123 Main St, City Center',
    phone: '(555) 123-4567'
  },
  {
    id: '2',
    name: 'Westside Branch',
    address: '456 West Ave, Westside',
    phone: '(555) 234-5678'
  },
  {
    id: '3',
    name: 'Northgate Branch',
    address: '789 North Blvd, Northgate',
    phone: '(555) 345-6789'
  }
];

export const appointmentTypes: AppointmentType[] = [
  {
    id: '1',
    name: 'Account Opening',
    duration: 30,
    description: 'Open a new checking or savings account'
  },
  {
    id: '2',
    name: 'Loan Consultation',
    duration: 45,
    description: 'Discuss personal or business loan options'
  },
  {
    id: '3',
    name: 'Financial Advice',
    duration: 60,
    description: 'Get expert advice on investments and planning'
  },
  {
    id: '4',
    name: 'Mortgage Consultation',
    duration: 60,
    description: 'Discuss home loan and mortgage options'
  },
  {
    id: '5',
    name: 'Credit Card Application',
    duration: 20,
    description: 'Apply for a new credit card'
  }
];

export const timeSlots = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM'
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    type: 'Account Opening',
    branch: 'Downtown Branch',
    date: '2024-03-15',
    time: '10:00 AM',
    status: 'confirmed',
    customerName: 'John Doe',
    notes: 'Interested in premium checking account'
  },
  {
    id: '2',
    type: 'Loan Consultation',
    branch: 'Westside Branch',
    date: '2024-03-18',
    time: '02:00 PM',
    status: 'pending',
    customerName: 'Jane Smith',
    notes: 'Small business loan inquiry'
  },
  {
    id: '3',
    type: 'Financial Advice',
    branch: 'Northgate Branch',
    date: '2024-03-20',
    time: '11:00 AM',
    status: 'confirmed',
    customerName: 'Bob Johnson'
  }
];
