import React, { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
  updateProfile,
} from "@/services/authService";
import { toast } from "@/components/ui/use-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load logged-in user from backend cookie
  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();

        // handle both formats: {user: {...}} or {...}
        setUser(profile.user || profile);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);
    setUser(res.user);
    toast({
      title: "Login successful",
      description: `Welcome back, ${res.user.name}`,
    });
    return res; // required for admin login redirection
  };

  const register = async (data) => {
    const res = await registerUser(data);
    setUser(res.user);
    toast({
      title: "Account created",
      description: "Your account has been created successfully",
    });
    return res;
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    toast({ title: "Logged out" });
  };

  const updateUser = async (data) => {
    const res = await updateProfile(data);
    setUser(res.user || res);
    toast({ title: "Profile updated" });
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
