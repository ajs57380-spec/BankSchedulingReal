import { Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Appointment } from '../../data/mockData';
import { card, badgeSuccess, badgePending, badgeCancelled } from '../../styles/shared';

interface AppointmentCardProps {
  appointment: Appointment;
}

const cardHeader = "flex justify-between items-start mb-4";

const cardTitle = "text-xl font-semibold text-gray-900";

const cardDetail = "flex items-center gap-2 text-gray-600 text-sm mb-2";

const cardFooter = "mt-4 pt-4 border-t border-gray-200";

const viewLink = "text-blue-600 hover:text-blue-700 font-medium text-sm";

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className={badgeSuccess}>Confirmed</span>;
      case 'pending':
        return <span className={badgePending}>Pending</span>;
      case 'cancelled':
        return <span className={badgeCancelled}>Cancelled</span>;
      default:
        return null;
    }
  };

  return (
    <div className={card}>
      <div className={cardHeader}>
        <h3 className={cardTitle}>{appointment.type}</h3>
        {getStatusBadge(appointment.status)}
      </div>

      <div className={cardDetail}>
        <MapPin size={16} />
        <span>{appointment.branch}</span>
      </div>

      <div className={cardDetail}>
        <Calendar size={16} />
        <span>{appointment.date}</span>
      </div>

      <div className={cardDetail}>
        <Clock size={16} />
        <span>{appointment.time}</span>
      </div>

      {appointment.notes && (
        <p className="text-sm text-gray-500 mt-3">{appointment.notes}</p>
      )}

      <div className={cardFooter}>
        <Link to={`/appointments/${appointment.id}`} className={viewLink}>
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default AppointmentCard;
