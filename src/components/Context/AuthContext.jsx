import React, { createContext, useContext, useEffect, useState } from "react";
import { apiService, ROLES } from "../../services/apiService";
const AuthContext = createContext();

// Make useAuth
export const useAuth = () => useContext(AuthContext);

// Provider

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const { data: user } = await apiService.getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);


  // User login using email password
  const login = async (email, password) => {
    const { data, error } = await apiService.login(email, password);

    if (error) throw error;

    setCurrentUser(data.user);
    return { user: data.user };
  };

  // User logout
  const logout = async () => {
    const { error } = await apiService.logout();
    if (error) throw error;
    setCurrentUser(null);
    return { success: true };
  };


  // forget Password
  const forgetPassword = async (email) => {
    const { error } = await apiService.resetPassword(email);
    if (error) throw error;
    return { success: true };
  };


  // Context values
  const value = {
    currentUser,
    logout,
    login,
    forgetPassword,
    loading,
  };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
