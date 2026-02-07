import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { newsAPI, categoryAPI } from '../../api';
import { Loading } from '../../components/Loading';
import AdminNavbar from '../../components/AdminNavbar';
import { BarChart3, FileText, FolderOpen, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsRes, catRes] = await Promise.all([
          newsAPI.getStats(),
          categoryAPI.getAll(),
        ]);
        setStats({
          ...newsRes.data.data,
          categories: catRes.data.data.length,
        });
      } catch (error) {
        console.error('Failed to load stats:', error?.response?.status, error?.response?.data || error?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Overview of your news portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total News</p>
                <p className="text-3xl font-bold text-primary-600">{stats?.total || 0}</p>
              </div>
              <FileText className="text-primary-600" size={32} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Published</p>
                <p className="text-3xl font-bold text-green-600">{stats?.published || 0}</p>
              </div>
              <BarChart3 className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Draft</p>
                <p className="text-3xl font-bold text-yellow-600">{stats?.draft || 0}</p>
              </div>
              <FileText className="text-yellow-600" size={32} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Categories</p>
                <p className="text-3xl font-bold text-blue-600">{stats?.categories || 0}</p>
              </div>
              <FolderOpen className="text-blue-600" size={32} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/admin/news/add"
                className="block w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
              >
                + Create News
              </Link>
              <Link
                to="/admin/news"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
              >
                Manage News
              </Link>
              <Link
                to="/admin/categories"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
              >
                Manage Categories
              </Link>
              <Link
                to="/admin/settings"
                className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
              >
                Settings
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-xl font-bold mb-4">System Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Admin Panel</span>
                <span className="font-medium">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Last Backup</span>
                <span className="font-medium">Today</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Status</span>
                <span className="font-medium text-green-600">● Online</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  window.location.href = '/';
                }}
                className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
