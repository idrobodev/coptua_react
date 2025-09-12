import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../supabase/supabase.config";
const AuthContext = createContext();

// Make useAuth
export const useAuth = () => useContext(AuthContext);

// Provider

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // sign up using email password
  const signUp = (email, password) => {
    return auth.signUp(email, password);
  };

  // User Logout
  const logout = () => {
    return auth.signOut();
  };

  // User login using email password
  const login = (email, password) => {
    return auth.signInWithPassword(email, password);
  };

  // google SignUp
  const googleSignUp = () => {
    return auth.signInWithGoogle();
  };

  // forget Password
  const forgetPassword = (email) => {
    return auth.resetPasswordForEmail(email);
  };

  // Get Current Login user
  useEffect(() => {
    try {
      const { data } = auth.onAuthStateChange((_event, session) => {
        setCurrentUser(session?.user || null);
        setLoading(false);
      });
      return () => data.subscription.unsubscribe();
    } catch (e) {
      setLoading(false);
    }
  }, []);

  // Context values
  const value = {
    signUp,
    currentUser,
    logout,
    login,
    googleSignUp,
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
