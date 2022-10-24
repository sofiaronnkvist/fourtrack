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
      await signInWithRedirect(auth, googleAuthProvider);
      await getRedirectResult(auth).then((res) => {
        console.log(`res ; ${res}`);
        const usersCollectionRef = collection(firestore, 'users');
        const newUser = res.user;
        console.log(newUser);
        addDoc(usersCollectionRef, {
          uid: newUser.uid,
          authProvider: 'google',
          email: newUser.email,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createUserGoogle = async (user) => {
    const usersCollectionRef = collection(firestore, 'users');
    const newUser = user;
    await addDoc(usersCollectionRef, {
      uid: newUser.uid,
      authProvider: 'google',
      email: newUser.email,
    });
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
      value={{
        user,
        login,
        signup,
        logout,
        signUpWithGoogle,
        createUserGoogle,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
