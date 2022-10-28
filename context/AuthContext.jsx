import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  getRedirectResult,
} from 'firebase/auth';
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { auth, googleAuthProvider, firestore } from '../utils/firebase';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          toast('Ups, email allredy in use');
        }
        if (error.code === 'auth/weak-password') {
          toast('Your password must be 6 characters or more.');
        }
      });
  };

  const signUpWithGoogle = async () => {
    await signInWithRedirect(auth, googleAuthProvider);
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          toast('Sorry wrong password or email');
        }
      });
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        signUpWithGoogle,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
