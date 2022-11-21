import { createContext, useContext, useEffect, useState } from 'react';
import {
  onIdTokenChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  getRedirectResult,
} from 'firebase/auth';
import { query, getDocs, collection, where, addDoc } from 'firebase/firestore';
import { auth, googleAuthProvider, firestore } from '../utils/firebase';
import nookies from 'nookies';
import { app } from '../utils/firebase';
import { useRouter } from 'next/router';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await user.getIdToken();
        setUser({
          uid: user.uid,
          email: user.email,
          profileImage: user.photoURL,
        });
        nookies.set(undefined, 'token', token, { path: '/' });
      }
      setLoading(false);
    });
    registerGoogleUser();

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  const handle = setInterval(async () => {
    const user = app.auth().currentUser;
    if (user) await user.getIdToken(true);
  }, 60 * 60 * 1000);

  // clean up setInterval
  // return () => clearInterval(handle);
  // }, []);

  const registerGoogleUser = async () => {
    try {
      await getRedirectResult(auth).then(async (res) => {
        const usersCollectionRef = collection(firestore, 'users');
        const newUser = res.user;
        const q = query(usersCollectionRef, where('uid', '==', newUser.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
          addDoc(usersCollectionRef, {
            uid: newUser.uid,
            authProvider: 'google',
            email: newUser.email,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registerWithEmailAndPassword = async (auth, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user;

      await addDoc(collection(firestore, 'users'), {
        uid: user.uid,
        authProvider: 'local',
        email: user.email,
      });
    } catch (error) {
      throw error;
    }
  };

  const signup = async (email, password) => {
    return registerWithEmailAndPassword(auth, email, password);
  };

  const signUpWithGoogle = async () => {
    await signInWithRedirect(auth, googleAuthProvider);
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
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
