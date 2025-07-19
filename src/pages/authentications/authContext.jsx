//src/pages/authentications/authContext.jsx

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { fetchUser, logoutUser } from './authServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      const res = await fetchUser();
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('smartedge_token'); // ✅ Clear token from Safari
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider value={{ user, loading, loadUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
