"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  studentId?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  address?: string;
  program?: string;
  department?: string;
  batch?: string;
  enrollmentDate?: string;
  currentSemester?: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:5000/api/v1";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from session on mount
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("lms_token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.success) {
          setUser(data.data);
        } else {
          localStorage.removeItem("lms_token");
          localStorage.removeItem("lms_user");
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem("lms_user", JSON.stringify(userData));
    localStorage.setItem("lms_token", token);
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`);
    } catch (err) {
      console.error("Logout error", err);
    }
    setUser(null);
    localStorage.removeItem("lms_user");
    localStorage.removeItem("lms_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}