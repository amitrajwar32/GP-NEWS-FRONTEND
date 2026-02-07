import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../api';
import axiosInstance from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('authToken');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      // set axios default header immediately
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    const { data: loginData } = response.data;
    
    // Backend wraps in data field
    const token = loginData.token;
    const user = loginData.admin;
    
    if (!token) {
      throw new Error('No token received from server');
    }
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    // ensure axios has Authorization header for subsequent requests
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete axiosInstance.defaults.headers.common['Authorization'];
  };

  const changePassword = async (oldPassword, newPassword) => {
    await authAPI.changePassword(oldPassword, newPassword);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, changePassword, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
