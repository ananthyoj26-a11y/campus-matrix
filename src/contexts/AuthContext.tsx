import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { auth, googleProvider, analytics } from '../lib/firebase';
import { logEvent } from 'firebase/analytics';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  User as FirebaseUser
} from 'firebase/auth';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, metadata?: Record<string, any>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Map Firebase user to our User type
  const mapUser = (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
    role: 'student', // Default role; backend will handle actual roles
    avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${firebaseUser.email}`,
    createdAt: firebaseUser.metadata.creationTime || new Date().toISOString(),
  });

  useEffect(() => {
    // Listen for auth state changes from Firebase
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(mapUser(firebaseUser));
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Upsert profile in Supabase via backend API
      try {
        const token = await result.user.getIdToken();
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            first_name: result.user.displayName?.split(' ')[0] || '',
            last_name: result.user.displayName?.split(' ').slice(1).join(' ') || '',
            avatar_url: result.user.photoURL || '',
          })
        });
      } catch (err) {
        console.error('Failed to sync Google profile with backend:', err);
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, metadata?: Record<string, any>) => {
    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Target tracking: log signup event
      if (analytics) {
        logEvent(analytics, 'sign_up', {
          method: 'email',
          college: metadata?.college || 'Unknown',
          year: metadata?.year || 'Unknown',
          careerTrack: metadata?.careerTrack || 'Unknown'
        });
      }

      // Call backend API to create the user profile in Supabase
      try {
        const token = await result.user.getIdToken();
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            first_name: metadata?.name?.split(' ')[0] || '',
            last_name: metadata?.name?.split(' ').slice(1).join(' ') || '',
            college: metadata?.college || '',
            year: metadata?.year || '',
            career_track: metadata?.careerTrack || ''
          })
        });
      } catch (err) {
        // We log the error but don't throw it, since Firebase auth succeeded
        console.error('Failed to sync new profile with backend:', err);
      }

      // Update Firebase profile with name
      try {
        await updateProfile(result.user, {
          displayName: metadata?.name || ''
        });
        // Manually update local user state to reflect the new name immediately
        setUser(prev => prev ? { ...prev, name: metadata?.name || prev.name } : null);
      } catch (err) {
        console.error('Failed to update Firebase profile:', err);
      }

    } catch (error) {
      console.error('Firebase Register Error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    window.location.href = '/';
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isLoading,
        login,
        loginWithGoogle,
        logout,
        register,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
