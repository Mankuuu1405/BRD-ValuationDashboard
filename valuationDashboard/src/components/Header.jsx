import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="BRD Logo" 
            className="h-10 w-auto"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/40x40?text=BRD';
            }}
          />
          <span className="ml-3 text-xl font-semibold text-gray-800">BRD Portal</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right mr-4">
            <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}</p>
          </div>
          
          <button
            onClick={() => navigate('/profile')}
            className="px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg
                     shadow-lg transform transition-all duration-150 ease-in-out
                     hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Profile
          </button>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-linear-to-r from-red-500 to-red-600 text-white rounded-lg
                     shadow-lg transform transition-all duration-150 ease-in-out
                     hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;