import { useRouter } from 'next/router';
import React, { useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const router = useRouter();
  const { user, login } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    //console.log(user);
    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        width: '40%',
        margin: 'auto',
      }}
    >
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>email</label>
        <input
          onChange={(e) =>
            setData({
              ...data,
              email: e.target.value,
            })
          }
          value={data.email}
          required
          type='email'
          placeholder='Enter email'
        ></input>
       <label>password</label>
        <input
          onChange={(e) =>
            setData({
              ...data,
              password: e.target.value,
            })
          }
          value={data.password}
          required
          type='password'
          placeholder='Enter password'
        ></input>
        <button type='submit'>Log in</button>
      </form>

      {/* <Form onSubmit={handleLogin}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email}
            required
            type='email'
            placeholder='Enter email'
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password}
            required
            type='password'
            placeholder='Password'
          />
        </Form.Group>
        <Button type='submit'>Login</Button>
      </Form> */}
    </div>
  );
};

export default Login;
