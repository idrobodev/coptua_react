import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { dbService, ROLES } from "../../services/databaseService";
const AuthContext = createContext();

// Make useAuth
export const useAuth = () => useContext(AuthContext);

// Provider

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const user = session?.user;
        if (user) {
          // Fetch user role from DB
          const { data: dbUser } = await dbService.getCurrentUser();
          setCurrentUser({ ...user, rol: dbUser?.rol || ROLES.CONSULTA });
        } else {
          setCurrentUser(null);
        }
      } else if (event === 'SIGNED_OUT') {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);


  // User login using email password
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch user role
    const { data: dbUser } = await dbService.getCurrentUser();
    const userWithRole = { ...data.user, rol: dbUser?.rol || ROLES.CONSULTA };
    setCurrentUser(userWithRole);
    return { user: userWithRole };
  };

  // User logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setCurrentUser(null);
    return { success: true };
  };


  // forget Password
  const forgetPassword = async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    });
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
