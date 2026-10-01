  // src/contexts/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as authApi from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AUTH_CHECK_INTERVAL_MS = 15 * 60 * 1000; // 15 minutes
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authApi.checkAuth();
        if (response?.data?.user?.role === 'dashboardUser') {
          setAuth(response.data);
        }
      } catch (error) {
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const interval = setInterval(checkAuth, AUTH_CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      if (response.status === 200) {
        setAuth(response.data);
        toast("Welcome Pawan!");
      }
      return response;
    } catch (error) {
      return error.response;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setAuth(null);
      toast.success("Logged out successfully");
      navigate('/login');
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
