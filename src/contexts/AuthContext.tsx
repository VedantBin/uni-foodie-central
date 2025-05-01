
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our auth context
type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cafe' | 'user';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'cafe' | 'user') => Promise<void>;
  logout: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Mock users for frontend development (will be replaced with API calls)
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@university.edu',
    password: 'admin123',
    role: 'admin' as const,
  },
  {
    id: '2',
    name: 'Cafe Owner',
    email: 'cafe@university.edu',
    password: 'cafe123',
    role: 'cafe' as const,
  },
  {
    id: '3',
    name: 'Student User',
    email: 'user@university.edu',
    password: 'user123',
    role: 'user' as const,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const register = async (name: string, email: string, password: string, role: 'cafe' | 'user') => {
    // In a real app, this would be an API call
    const userExists = mockUsers.some((u) => u.email === email);
    if (userExists) {
      throw new Error('User already exists');
    }

    // Generate a mock ID (would be done by the server in a real app)
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      role,
    };

    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
