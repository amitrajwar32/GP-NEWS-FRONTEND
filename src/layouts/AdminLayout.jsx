import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loading } from '../components/Loading';

const AdminLayout = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {children}
    </div>
  );
};

export default AdminLayout;
