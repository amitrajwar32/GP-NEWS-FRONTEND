import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const AdminNavbar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname.includes(path);

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary-600">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white text-sm">GP</div>
            <span>Admin</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/admin/dashboard"
              className={`transition ${isActive('/dashboard') ? 'text-primary-600 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'}`}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/news"
              className={`transition ${isActive('/news') ? 'text-primary-600 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'}`}
            >
              News
            </Link>
            <Link
              to="/admin/categories"
              className={`transition ${isActive('/categories') ? 'text-primary-600 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'}`}
            >
              Categories
            </Link>
            <Link
              to="/admin/social-media"
              className={`transition ${isActive('/social-media') ? 'text-primary-600 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'}`}
            >
              Social Media
            </Link>
            <Link
              to="/admin/youtube"
              className={`transition ${isActive('/youtube') ? 'text-primary-600 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'}`}
            >
              YouTube
            </Link>
            <Link
              to="/admin/settings"
              className={`transition ${isActive('/settings') ? 'text-primary-600 font-bold' : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'}`}
            >
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t dark:border-gray-700">
            <Link to="/admin/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Dashboard
            </Link>
            <Link to="/admin/news" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              News
            </Link>
            <Link to="/admin/categories" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Categories
            </Link>
            <Link to="/admin/social-media" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Social Media
            </Link>
            <Link to="/admin/youtube" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              YouTube
            </Link>
            <Link to="/admin/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-left flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
