import { Link } from 'react-router-dom';
import { Calendar, Clock, Shield, Users } from 'lucide-react';
import { page, pageTitle, card, button, grid2 } from '../styles/shared';

const hero = "text-center py-12 mb-12";

const heroTitle = "text-4xl md:text-5xl font-bold text-gray-900 mb-4";

const heroSubtitle = "text-xl text-gray-600 mb-8";

const featureIcon = "w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4";

const featureTitle = "text-xl font-semibold text-gray-900 mb-2";

const featureDescription = "text-gray-600";

function Home() {
  const features = [
    {
      icon: <Calendar size={24} />,
      title: 'Easy Scheduling',
      description: 'Book appointments at your convenience with our simple interface'
    },
    {
      icon: <Clock size={24} />,
      title: 'Flexible Hours',
      description: 'Choose from multiple time slots across all our branches'
    },
    {
      icon: <Users size={24} />,
      title: 'Expert Staff',
      description: 'Meet with experienced professionals for personalized service'
    },
    {
      icon: <Shield size={24} />,
      title: 'Secure & Safe',
      description: 'Your information is protected with bank-grade security'
    }
  ];

  return (
    <div className={page}>
      <div className={hero}>
        <h1 className={heroTitle}>Welcome to BankScheduler</h1>
        <p className={heroSubtitle}>
          Schedule your banking appointments online, anytime
        </p>
        <Link to="/appointments/create">
          <button className={button}>
            Book an Appointment
          </button>
        </Link>
      </div>

      <h2 className={pageTitle}>Why Choose Us?</h2>

      <div className={grid2}>
        {features.map((feature, index) => (
          <div key={index} className={card}>
            <div className={featureIcon}>
              {feature.icon}
            </div>
            <h3 className={featureTitle}>{feature.title}</h3>
            <p className={featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
