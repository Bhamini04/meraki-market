import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedAdmin = localStorage.getItem('adminUser');
      if (storedAdmin) {
        setAdminUser(JSON.parse(storedAdmin));
        setIsAdminAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to parse admin user from localStorage", error);
      localStorage.removeItem('adminUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const adminLogin = (userData) => {
    setAdminUser(userData);
    setIsAdminAuthenticated(true);
    localStorage.setItem('adminUser', JSON.stringify(userData));
    // Force a page reload to ensure all components get the updated auth state
    window.location.reload();
  };

  const adminLogout = () => {
    setAdminUser(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem('adminUser');
  };

  const value = {
    isAdminAuthenticated,
    adminUser,
    loading,
    adminLogin,
    adminLogout,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};