import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { page, button } from '../styles/shared';

const container = "min-h-[60vh] flex items-center justify-center";

const content = "text-center";

const errorCode = "text-8xl font-bold text-blue-600 mb-4";

const errorTitle = "text-3xl font-semibold text-gray-900 mb-2";

const errorText = "text-gray-600 mb-8";

function NotFound() {
  return (
    <div className={page}>
      <div className={container}>
        <div className={content}>
          <div className={errorCode}>404</div>
          <h1 className={errorTitle}>Page Not Found</h1>
          <p className={errorText}>
            The page you are looking for does not exist or has been moved.
          </p>
          <Link to="/">
            <button className={button}>
              <Home size={20} className="inline mr-2" />
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
