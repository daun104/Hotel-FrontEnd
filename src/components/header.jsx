import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import DarkModeToggle from './darkModeToggle';

const header = ({ isDark, setIsDark }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        HotelBooking
      </div>

      <div className="flex items-center space-x-4">
        <nav className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/rooms">Rooms</Link>
          {user && user.role === 'user' && <Link to="/dashboard/user">Dashboard</Link>}
          {user && user.role === 'admin' && <Link to="/dashboard/admin">Admin</Link>}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}
          {user && (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="ml-2 bg-red-500 px-2 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="ml-4">
          <DarkModeToggle isDark={isDark} setIsDark={setIsDark} />
        </div>
      </div>
    </header>
  );
};

export default header;
