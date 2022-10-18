import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const { user, signup } = useAuth();
  console.log(user);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

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
    </div>
  );
};

export default Signup;
