import React, { createContext, useEffect } from 'react';
import { useTokenStore, useUserStore } from './helpers/store';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const { user, setUser } = useUserStore();

  const { token, setToken } = useTokenStore();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);

    // Save token and user data to localStorage
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));

    // Redirect to dashboard after login
    window.location.href = '/';
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    // Remove token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
