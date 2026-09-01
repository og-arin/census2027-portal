import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

const AuthContext = createContext();

const DEMO_USER = {
  uid: "demo_citizen_2027",
  displayName: "Aarav Sharma (Demo Citizen)",
  email: "citizen.demo@census2027.gov.in",
  photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  isGuest: true
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('census_auth_user');
    return saved ? JSON.parse(saved) : DEMO_USER;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userProfile = {
            uid: user.uid,
            displayName: user.displayName || user.email?.split('@')[0] || "Citizen",
            email: user.email,
            photoURL: user.photoURL,
            isGuest: false
          };
          setCurrentUser(userProfile);
          localStorage.setItem('census_auth_user', JSON.stringify(userProfile));
        }
      });
      return unsubscribe;
    }
  }, []);

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    try {
      if (auth) {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userProfile = {
          uid: res.user.uid,
          displayName: res.user.displayName || email.split('@')[0],
          email: res.user.email,
          isGuest: false
        };
        setCurrentUser(userProfile);
        localStorage.setItem('census_auth_user', JSON.stringify(userProfile));
        return { success: true };
      } else {
        const mockUser = {
          uid: `user_${Date.now()}`,
          displayName: email.split('@')[0],
          email: email,
          isGuest: false
        };
        setCurrentUser(mockUser);
        localStorage.setItem('census_auth_user', JSON.stringify(mockUser));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email, password) => {
    setLoading(true);
    try {
      if (auth) {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const userProfile = {
          uid: res.user.uid,
          displayName: email.split('@')[0],
          email: res.user.email,
          isGuest: false
        };
        setCurrentUser(userProfile);
        localStorage.setItem('census_auth_user', JSON.stringify(userProfile));
        return { success: true };
      } else {
        const mockUser = {
          uid: `user_${Date.now()}`,
          displayName: email.split('@')[0],
          email: email,
          isGuest: false
        };
        setCurrentUser(mockUser);
        localStorage.setItem('census_auth_user', JSON.stringify(mockUser));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      if (auth && googleProvider) {
        const res = await signInWithPopup(auth, googleProvider);
        const userProfile = {
          uid: res.user.uid,
          displayName: res.user.displayName,
          email: res.user.email,
          photoURL: res.user.photoURL,
          isGuest: false
        };
        setCurrentUser(userProfile);
        localStorage.setItem('census_auth_user', JSON.stringify(userProfile));
        return { success: true };
      } else {
        const mockGoogleUser = {
          uid: "google_citizen_987",
          displayName: "Rajesh Kumar Sharma",
          email: "rajesh.sharma@example.com",
          photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
          isGuest: false
        };
        setCurrentUser(mockGoogleUser);
        localStorage.setItem('census_auth_user', JSON.stringify(mockGoogleUser));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemoCitizen = () => {
    setCurrentUser(DEMO_USER);
    localStorage.setItem('census_auth_user', JSON.stringify(DEMO_USER));
  };

  const logout = async () => {
    try {
      if (auth) {
        await signOut(auth);
      }
    } catch (err) {
      console.warn("Sign out error:", err);
    }
    setCurrentUser(DEMO_USER);
    localStorage.setItem('census_auth_user', JSON.stringify(DEMO_USER));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      loginWithEmail,
      registerWithEmail,
      loginWithGoogle,
      loginAsDemoCitizen,
      logout,
      isGuest: currentUser?.isGuest
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
