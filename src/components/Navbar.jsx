import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun, LogOut, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { categoryAPI } from '../api';
import { API_URL } from '../config/env.js';
import { useEffect } from 'react';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll();
        const payload = response?.data?.data || response?.data || [];
        console.debug('Navbar categories payload:', payload);
        setCategories(Array.isArray(payload) ? payload : []);
      } catch (error) {
        console.error('Failed to load categories:', error?.status || error?.message || error);
        // extra debug: try native fetch to the API URL to see CORS/network errors
        try {
          const res = await fetch(`${API_URL}/categories`, { method: 'GET', mode: 'cors' });
          const txt = await res.text();
          console.debug('Native fetch categories response status:', res.status, txt);
        } catch (err) {
          console.debug('Native fetch categories error:', err);
        }
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-primary-600">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white">GP</div>
            <span>News</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition">Home</Link>
            <Link to="/about" className="hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition">About</Link>
            
            <div className="relative group">
              <button className="hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition flex items-center gap-1">
                Categories ▼
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                {categories && categories.length > 0 ? categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {cat.name}
                  </Link>
                )) : <div className="px-4 py-2 text-gray-500">No categories</div>}
              </div>
            </div>

            <Link to="/contact" className="hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition">Contact</Link>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition"
              >
                <LogIn size={18} /> Login
              </Link>
            )}

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t dark:border-gray-700">
            <Link to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Home</Link>
            <Link to="/about" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">About</Link>
            <button
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Categories {showCategoryMenu ? '▲' : '▼'}
            </button>
            {showCategoryMenu && (
              <div className="bg-gray-50 dark:bg-gray-800">
                {categories && categories.length > 0 ? categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="block px-8 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {cat.name}
                  </Link>
                )) : <div className="px-8 py-2 text-gray-500">No categories</div>}
              </div>
            )}
            <Link to="/contact" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">Contact</Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/admin/login"
                className="block px-4 py-2 mt-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
