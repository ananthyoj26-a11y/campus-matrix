import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (...args: any[]) => void | Promise<void>;
  logout: () => void | Promise<void>;
  register: (...args: any[]) => void | Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'usr_123',
  email: 'student@campusmatrix.edu',
  name: 'Alex Johnson',
  role: 'student',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Auto-login for demo purposes
  useEffect(() => {
    setUser(MOCK_USER);
  }, []);

  const login = async (...args: any[]) => { setUser(MOCK_USER); };
  const logout = async () => {
    setUser(null);
    // Redirect to homepage after logout
    window.location.href = '/';
  };
  const register = async (...args: any[]) => { setUser(MOCK_USER); };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
        register,
      }}
    >
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
