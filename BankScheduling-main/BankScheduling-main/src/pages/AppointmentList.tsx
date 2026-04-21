import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import AppointmentCard from '../components/ui/AppointmentCard';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { page, pageTitle, button, grid2 } from '../styles/shared';
import type { Appointment } from '../data/mockData';

const header = "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6";
const emptyState = "text-center py-12 bg-white rounded-lg shadow-md";
const emptyTitle = "text-2xl font-semibold text-gray-900 mb-2";
const emptyText = "text-gray-600 mb-6";

export default function AppointmentList() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchAppointments = async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          date,
          time,
          status,
          customer_name,
          notes,
          appointment_types ( name ),
          branches ( name )
        `)
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (!error && data) {
        setAppointments(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((row: any) => ({
            id: row.id,
            type: row.appointment_types?.name ?? '',
            branch: row.branches?.name ?? '',
            date: row.date,
            time: row.time,
            status: row.status as Appointment['status'],
            customerName: row.customer_name,
            notes: row.notes ?? undefined,
          }))
        );
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [user]);

  return (
    <div className={page}>
      <div className={header}>
        <h1 className={pageTitle}>My Appointments</h1>
        <Link to="/appointments/create">
          <button className={button}>
            <Plus size={20} className="inline mr-2" />
            Book New Appointment
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className={emptyState}>
          <h2 className={emptyTitle}>No appointments yet</h2>
          <p className={emptyText}>Start by booking your first appointment</p>
          <Link to="/appointments/create">
            <button className={button}>Book Appointment</button>
          </Link>
        </div>
      ) : (
        <div className={grid2}>
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}
