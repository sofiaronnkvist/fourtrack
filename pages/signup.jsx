import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const router = useRouter();
  const { user, signup, signUpWithGoogle, createUserGoogle } = useAuth();
  console.log(user);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  //TODO: This pushes two users to collection, needs fixing.
  useEffect(() => {
    if (user) {
      console.log('User!!');
      createUserGoogle(user);
      router.push('/dashboard');
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };

  const handleGoogleSignIn = async () => {
    console.log('tryin');

    try {
      console.log('tryin');
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
