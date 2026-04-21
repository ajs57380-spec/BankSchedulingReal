import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { timeSlots } from '../data/mockData';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { page, pageTitle, card, button, buttonSecondary, input, label } from '../styles/shared';

const form = "space-y-6";
const formGroup = "space-y-2";
const select = input;
const textarea = input + " min-h-24 resize-none";
const buttonGroup = "flex gap-4 pt-4";

interface Branch { id: string; name: string; address: string; }
interface AppointmentType { id: string; name: string; duration: number; description: string; }

export default function AppointmentCreate() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [branches, setBranches] = useState<Branch[]>([]);
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    customerName: '',
    typeId: '',
    branchId: '',
    date: '',
    time: '',
    notes: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const [branchRes, typeRes] = await Promise.all([
        supabase.from('branches').select('id, name, address').order('name'),
        supabase.from('appointment_types').select('id, name, duration, description').order('name'),
      ]);
      if (branchRes.data) setBranches(branchRes.data);
      if (typeRes.data) setAppointmentTypes(typeRes.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError('');

    const { error } = await supabase.from('appointments').insert({
      user_id: user.id,
      type_id: formData.typeId,
      branch_id: formData.branchId,
      date: formData.date,
      time: formData.time,
      status: 'pending',
      customer_name: formData.customerName,
      notes: formData.notes || null,
    });

    if (error) {
      setError('Failed to book appointment. Please try again.');
      setSubmitting(false);
    } else {
      navigate('/appointments');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const today = new Date().toISOString().split('T')[0];
  const selectedType = appointmentTypes.find(t => t.id === formData.typeId);
  const selectedBranch = branches.find(b => b.id === formData.branchId);

  return (
    <div className={page}>
      <h1 className={pageTitle}>Book New Appointment</h1>

      <div className={card}>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={form}>
          <div className={formGroup}>
            <label htmlFor="customerName" className={label}>Full Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={input}
              required
            />
          </div>

          <div className={formGroup}>
            <label htmlFor="typeId" className={label}>Appointment Type *</label>
            <select
              id="typeId"
              name="typeId"
              value={formData.typeId}
              onChange={handleChange}
              className={select}
              required
            >
              <option value="">Select a service</option>
              {appointmentTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} ({type.duration} min)
                </option>
              ))}
            </select>
            {selectedType && (
              <p className="text-sm text-gray-500">{selectedType.description}</p>
            )}
          </div>

          <div className={formGroup}>
            <label htmlFor="branchId" className={label}>Branch Location *</label>
            <select
              id="branchId"
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
              className={select}
              required
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.name}
                </option>
              ))}
            </select>
            {selectedBranch && (
              <p className="text-sm text-gray-500">{selectedBranch.address}</p>
            )}
          </div>

          <div className={formGroup}>
            <label htmlFor="date" className={label}>Appointment Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              className={input}
              required
            />
          </div>

          <div className={formGroup}>
            <label htmlFor="time" className={label}>Preferred Time *</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={select}
              required
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className={formGroup}>
            <label htmlFor="notes" className={label}>Additional Notes (Optional)</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={textarea}
              placeholder="Any specific requirements or questions..."
            />
          </div>

          <div className={buttonGroup}>
            <button type="submit" disabled={submitting} className={button}>
              {submitting ? 'Booking...' : 'Book Appointment'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className={buttonSecondary}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
