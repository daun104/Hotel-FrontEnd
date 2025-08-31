import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refreshToken') || '');
  const [loading, setLoading] = useState(false);

  // ✅ Keep axios headers in sync with token
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // ✅ Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });

      // store user + tokens
      setUser(data.user);
      setToken(data.tokens.access);
      setRefreshToken(data.tokens.refresh);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.tokens.access);
      localStorage.setItem('refreshToken', data.tokens.refresh);

      toast.success('Login successful');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Register function
  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      toast.success('Registration successful. Please login.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    setToken('');
    setRefreshToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    toast.info('Logged out');
  };

  return (
    <AuthContext.Provider
      value={{ user, token, refreshToken, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
