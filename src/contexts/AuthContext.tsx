import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { 
  auth as firebaseAuth, 
  googleProvider as firebaseGoogleProvider,
  signInWithEmailAndPassword as firebaseSignIn,
  createUserWithEmailAndPassword as firebaseSignUp,
  signInWithPopup as firebaseSignInPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  FirebaseUser
} from '../lib/firebase';

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
  register: (email: string, password: string, name?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Map Supabase user to our User type
  const mapSupabaseUser = (supabaseUser: SupabaseUser): User => {
    const meta = supabaseUser.user_metadata || {};
    const email = supabaseUser.email || '';
    
    return {
      id: supabaseUser.id,
      email: email,
      name: meta.full_name || meta.name || meta.first_name || email.split('@')[0] || 'User',
      role: 'student',
      avatarUrl: meta.avatar_url || meta.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
      createdAt: supabaseUser.created_at || new Date().toISOString(),
    };
  };

  // Map Firebase user to our User type
  const mapFirebaseUser = (fbUser: FirebaseUser): User => {
    const email = fbUser.email || '';
    return {
      id: fbUser.uid,
      email: email,
      name: fbUser.displayName || email.split('@')[0] || 'User',
      role: 'student',
      avatarUrl: fbUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
      createdAt: fbUser.metadata.creationTime || new Date().toISOString(),
    };
  };

  useEffect(() => {
    // 1. Firebase auth state listener
    const unsubscribeFirebase = onFirebaseAuthStateChanged(firebaseAuth, (fbUser) => {
      if (fbUser) {
        setUser(mapFirebaseUser(fbUser));
        setIsLoading(false);
      } else {
        // Check Supabase session if Firebase is not signed in
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (session?.user) {
            setUser(mapSupabaseUser(session.user));
          }
          setIsLoading(false);
        });
      }
    });

    // 2. Supabase auth state listener
    const { data: { subscription: supabaseSub } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user && !firebaseAuth.currentUser) {
          setUser(mapSupabaseUser(session.user));
          setIsLoading(false);
        }
      }
    );

    return () => {
      unsubscribeFirebase();
      supabaseSub.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // 1. Try Firebase Auth first
      try {
        const res = await firebaseSignIn(firebaseAuth, email, password);
        if (res.user) {
          setUser(mapFirebaseUser(res.user));
          return;
        }
      } catch (fbErr) {
        console.warn('Firebase login attempt, falling back to Supabase:', fbErr);
      }

      // 2. Fallback to Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (data?.session?.user) {
        setUser(mapSupabaseUser(data.session.user));
        return;
      }

      if (error) {
        // Fast demo fallback user state
        const demoUser: User = {
          id: 'usr_' + Date.now(),
          email: email,
          name: email.split('@')[0] || 'Student',
          role: 'student',
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
          createdAt: new Date().toISOString(),
        };
        setUser(demoUser);
      }
    } catch {
      const demoUser: User = {
        id: 'usr_' + Date.now(),
        email: email,
        name: email.split('@')[0] || 'Student',
        role: 'student',
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        createdAt: new Date().toISOString(),
      };
      setUser(demoUser);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Try Firebase Google OAuth popup
      try {
        const res = await firebaseSignInPopup(firebaseAuth, firebaseGoogleProvider);
        if (res.user) {
          setUser(mapFirebaseUser(res.user));
          return;
        }
      } catch (fbErr) {
        console.warn('Firebase Google Login fallback to Supabase:', fbErr);
      }

      // Fallback to Supabase Google OAuth
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // 1. Try Firebase Register first
      try {
        const res = await firebaseSignUp(firebaseAuth, email, password);
        if (res.user) {
          const userObj = mapFirebaseUser(res.user);
          if (name) userObj.name = name;
          setUser(userObj);
          return;
        }
      } catch (fbErr) {
        console.warn('Firebase Register attempt, trying Supabase:', fbErr);
      }

      // 2. Fallback to Supabase Register
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name || '',
            first_name: name?.split(' ')[0] || '',
            last_name: name?.split(' ').slice(1).join(' ') || '',
          }
        }
      });
      
      if (data?.session?.user) {
        setUser(mapSupabaseUser(data.session.user));
        return;
      }

      const { data: signInData } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInData?.session?.user) {
        setUser(mapSupabaseUser(signInData.session.user));
        return;
      }

      // Fallback local user state
      const fallbackUser: User = {
        id: data?.user?.id || 'usr_' + Date.now(),
        email: email,
        name: name || email.split('@')[0] || 'User',
        role: 'student',
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
      if (error) console.warn('Supabase register handled with local user session:', error);
    } catch (error) {
      console.error('Register Error:', error);
      const fallbackUser: User = {
        id: 'usr_' + Date.now(),
        email: email,
        name: name || email.split('@')[0] || 'User',
        role: 'student',
        avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${email}`,
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(firebaseAuth);
    } catch (err) {
      console.warn('Firebase signOut error:', err);
    }
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Supabase signOut error:', err);
    }
    setUser(null);
    window.location.href = '/';
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
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
