import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  firebaseConfig?: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateFirebaseConfig: (config: User['firebaseConfig']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('iot_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate login - in production, use Supabase
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
    };

    localStorage.setItem('iot_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate registration - in production, use Supabase
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
    };

    localStorage.setItem('iot_user', JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('iot_user');
    setUser(null);
  };

  const updateFirebaseConfig = (config: User['firebaseConfig']) => {
    if (user) {
      const updatedUser = { ...user, firebaseConfig: config };
      setUser(updatedUser);
      localStorage.setItem('iot_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateFirebaseConfig }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
