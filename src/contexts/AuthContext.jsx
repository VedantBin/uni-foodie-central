
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context with a default value
const AuthContext = createContext({
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
    role: 'admin',
  },
  {
    id: '2',
    name: 'Cafe Owner',
    email: 'cafe@university.edu',
    password: 'cafe123',
    role: 'cafe',
  },
  {
    id: '3',
    name: 'Student User',
    email: 'user@university.edu',
    password: 'user123',
    role: 'user',
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in via localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
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

  const register = async (name, email, password, role) => {
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
