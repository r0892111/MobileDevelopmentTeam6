import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';

// Define types for user data
interface User {
  id: string;
  name: string;
  email: string;
}

interface AppContextProps {
  isAuthenticated: boolean;
  username: string;
  users: User[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUsername: (username: string) => void;
  setUsers: (users: User[]) => void;
}

// Create the context
const AppContext = createContext<AppContextProps | undefined>(undefined);

// API base URL
const API_URL = "https://dao4gdmtoorfh8se.thomasott.fr";

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsername(data.user.name);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUsername(data.user.name);
        setIsAuthenticated(true);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUsername('');
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      username,
      users,
      login,
      register,
      logout,
      setUsername,
      setUsers,
    }),
    [isAuthenticated, username, users, login, register, logout]
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

// Custom hook to use the AppContext
export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
