import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from 'firebase/auth';
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { auth, googleAuthProvider, firestore } from '../utils/firebase';

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

  const registerWithEmailAndPassword = async (auth, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const usersCollectionRef = collection(firestore, 'users');
      const newUser = res.user;
      await addDoc(usersCollectionRef, {
        uid: newUser.uid,
        authProvider: 'local',
        email: newUser.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const signup = (email, password) => {
    return registerWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGoogle = async () => {
    try {
      const res = await signInWithRedirect(auth, googleAuthProvider);
      const usersCollectionRef = collection(firestore, 'users');
      const user = res.user;
      const q = query(usersCollectionRef, where('uid', '==', user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(usersCollectionRef, {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, signUpWithGoogle }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
