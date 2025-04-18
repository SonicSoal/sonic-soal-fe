'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FirebaseError } from 'firebase/app';
import { toast } from 'sonner';
import { SonicLoader } from '@/components/sonic-loader';
import { useRouter } from 'next/navigation';

type UserData = {
  name: string | null;
  email: string | null;
  avatar: string | null;
};

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (data: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
  signOutUser: () => Promise<void>;
}

// 1. Error‑to‑message map
const ERROR_MESSAGES: Record<string, string> = {
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled':
    'Your account has been disabled. Contact support if this seems wrong.',
  'auth/user-not-found':
    'No account found with that email. Please register first.',
  'auth/email-already-in-use':
    'This email is already registered. Try logging in or use another email.',
  'auth/operation-not-allowed':
    'This sign‑in method isn’t enabled. Contact support if you need it.',
  'auth/weak-password': 'Password is too weak. Use at least 6 characters.',
  'auth/too-many-requests':
    'Too many attempts. Please wait and try again later.',
  'auth/network-request-failed':
    'Network error. Check your connection and try again.',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Observe auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      if (usr) {
        setUserData({
          name: usr.displayName,
          email: usr.email,
          avatar: usr.photoURL,
        });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Updated handleError
  function handleError(e: unknown) {
    if (e instanceof FirebaseError && ERROR_MESSAGES[e.code]) {
      toast.error('Authentication Error', {
        description: ERROR_MESSAGES[e.code],
        action: {
          label: 'Dismiss',
          onClick: () => toast.dismiss(),
        },
      });
    } else {
      console.error('Firebase error:', e);
    }
  }

  // Google OAuth
  const signInWithGoogle = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (e) {
      handleError(e);
    }
  };

  // Email/Password login
  const loginWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      handleError(e);
    }
  };

  // Register new user
  const registerWithEmail = async (email: string, password: string) => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      handleError(e);
    }
  };

  // Password reset
  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (e) {
      handleError(e);
    }
  };

  // Update displayName or photoURL
  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    setError(null);
    try {
      if (!auth.currentUser) throw new Error('No user');
      await updateProfile(auth.currentUser, data);
      // Refresh user
      setUser({ ...auth.currentUser });
    } catch (e) {
      handleError(e);
    }
  };

  // Sign out
  const signOutUser = async () => {
    try {
      toast.promise(signOut(auth), {
        loading: 'Signing out...',
        success: () => {
          setUser(null);
          setUserData(null);
          router.push('/');
          return 'Signed out successfully!';
        },
        error: 'Error signing out. Please try again.',
        finally: () => {},
      });
    } catch (e) {
      handleError(e);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      if (window.location.pathname === '/sign-in') {
        router.push('/dashboard');
      }
    } else if (!loading) {
      if (window.location.pathname === '/dashboard') {
        router.push('/sign-in');
      }
    }
  }, [loading, router, user]);

  if (loading) return <SonicLoader />;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        userData,
        error,
        signInWithGoogle,
        loginWithEmail,
        registerWithEmail,
        resetPassword,
        updateUserProfile,
        signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
