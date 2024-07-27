// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/Autharization/checkAuth');
        setAuth(response.data);
      } catch (error) {
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/Autharization/login', { email, password });
      if (response.status === 200) {
        setAuth(response.data);
      }
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const logout = async () => {
    
    try {
      await axios.post('/api/Autharization/logout');
      setAuth(null);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
