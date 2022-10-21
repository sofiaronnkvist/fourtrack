import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../utils/firebase';

const Signup = () => {
  const router = useRouter();
  const { user, signup, signUpWithGoogle } = useAuth();
  console.log(user);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await signup(data.email, data.password);
      if (res) {
        const usersCollectionRef = collection(firestore, 'users');
        const newUser = res.user;
        console.log('Does this happend', newUser);
        await addDoc(collection(firestore, usersCollectionRef), {
          uid: newUser.uid,
          authProvider: 'local',
          email: newUser.email,
        });
        console.log('And this');
      }
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signUpWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: '40%',
        margin: 'auto',
      }}
    >
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <label>Email</label>

        <input
          type='email'
          placeholder='Enter email'
          required
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          value={data.email}
        ></input>
        <label>Password </label>
        <input
          type='password'
          placeholder='Enter password'
          required
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
          value={data.password}
        ></input>
        <button type='submit'>Create user</button>
      </form>
      <button onClick={handleGoogleSignIn}>Sign up with Google</button>
    </div>
  );
};

export default Signup;
