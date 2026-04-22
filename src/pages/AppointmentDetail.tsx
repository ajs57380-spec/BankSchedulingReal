import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, FileText, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { page, pageTitle, card, button, buttonSecondary, badgeSuccess, badgePending, badgeCancelled } from '../styles/shared';
import type { Appointment } from '../data/mockData';

const backLink = "inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium";
const detailRow = "flex items-start gap-3 py-3 border-b border-gray-100 last:border-0";
const detailIcon = "text-gray-400 mt-1";
const detailContent = "flex-1";
const detailLabel = "text-sm text-gray-500 mb-1";
const detailValue = "text-gray-900 font-medium";
const buttonGroup = "flex gap-4 mt-6";

export default function AppointmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchAppointment = async () => {
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
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const row = data as any;
        setAppointment({
          id: row.id,
          type: row.appointment_types?.name ?? '',
          branch: row.branches?.name ?? '',
          date: row.date,
          time: row.time,
          status: row.status as Appointment['status'],
          customerName: row.customer_name,
          notes: row.notes ?? undefined,
        });
      }
      setLoading(false);
    };

    fetchAppointment();
  }, [id]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return <span className={badgeSuccess}>Confirmed</span>;
      case 'pending': return <span className={badgePending}>Pending</span>;
      case 'cancelled': return <span className={badgeCancelled}>Cancelled</span>;
      default: return null;
    }
  };

  const handleCancel = async () => {
    if (!id || !window.confirm('Are you sure you want to cancel this appointment?')) return;
    setCancelling(true);

    const { error } = await supabase
      .from('appointments')
      .update({ status: 'cancelled' })
      .eq('id', id);

    if (!error) {
      navigate('/appointments');
    } else {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className={page}>
        <div className="text-center py-12 text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className={page}>
        <div className={card}>
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Appointment not found</h2>
            <Link to="/appointments">
              <button className={button}>Back to Appointments</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={page}>
      <Link to="/appointments" className={backLink}>
        <ArrowLeft size={20} />
        Back to Appointments
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className={pageTitle}>Appointment Details</h1>
        {getStatusBadge(appointment.status)}
      </div>

      <div className={card}>
        <div className={detailRow}>
          <User size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Customer Name</div>
            <div className={detailValue}>{appointment.customerName}</div>
          </div>
        </div>

        <div className={detailRow}>
          <FileText size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Appointment Type</div>
            <div className={detailValue}>{appointment.type}</div>
          </div>
        </div>

        <div className={detailRow}>
          <MapPin size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Branch Location</div>
            <div className={detailValue}>{appointment.branch}</div>
          </div>
        </div>

        <div className={detailRow}>
          <Calendar size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Date</div>
            <div className={detailValue}>{appointment.date}</div>
          </div>
        </div>

        <div className={detailRow}>
          <Clock size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Time</div>
            <div className={detailValue}>{appointment.time}</div>
          </div>
        </div>

        {appointment.notes && (
          <div className={detailRow}>
            <FileText size={20} className={detailIcon} />
            <div className={detailContent}>
              <div className={detailLabel}>Notes</div>
              <div className={detailValue}>{appointment.notes}</div>
            </div>
          </div>
        )}

        {appointment.status !== 'cancelled' && (
          <div className={buttonGroup}>
            <button onClick={handleCancel} disabled={cancelling} className={buttonSecondary}>
              {cancelling ? 'Cancelling...' : 'Cancel Appointment'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
