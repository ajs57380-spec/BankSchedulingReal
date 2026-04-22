import { Link, Outlet, useLocation } from 'react-router-dom';
import { Calendar, Home, Plus, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navContainer = "bg-white shadow-md";

const navContent = "mx-auto max-w-screen-lg px-4";

const navList = "flex items-center justify-between h-16";

const navBrand = "text-xl font-bold text-blue-600";

const navLinks = "flex items-center gap-6";

const navLink = "flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium";

const navLinkActive = "flex items-center gap-2 text-blue-600 font-medium";

const mainContainer = "min-h-[calc(100vh-4rem)] bg-gray-50";

function AppLayout() {
  const location = useLocation();
  const { signOut, user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div>
      <nav className={navContainer}>
        <div className={navContent}>
          <div className={navList}>
            <Link to="/" className={navBrand}>
              BankScheduler
            </Link>
            <div className={navLinks}>
              <Link
                to="/"
                className={isActive('/') ? navLinkActive : navLink}
              >
                <Home size={20} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link
                to="/appointments"
                className={isActive('/appointments') ? navLinkActive : navLink}
              >
                <Calendar size={20} />
                <span className="hidden sm:inline">Appointments</span>
              </Link>
              <Link
                to="/appointments/create"
                className={isActive('/appointments/create') ? navLinkActive : navLink}
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Book New</span>
              </Link>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <span className="hidden sm:inline text-xs text-gray-500 truncate max-w-[120px]">{user?.email}</span>
                <button
                  onClick={signOut}
                  className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 transition-colors font-medium text-sm"
                  title="Sign out"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className={mainContainer}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
