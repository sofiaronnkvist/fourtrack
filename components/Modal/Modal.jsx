import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

const dialogContent = DialogPrimitive.Content;
const dialogOverlay = DialogPrimitive.Overlay;

const StyledContent = styled(dialogContent)`
  background-color: white;
  border-radius: 6;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25;
  border: 1px solid black;
  border-radius: 7px;
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const NavButton = styled.button`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
`;

const GoogleButton = styled.button`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  border: 1px solid black;
  border-radius: 7px;
`;

const CloseButton = styled.button`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10px;
`;

const Divider = styled.p`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledTitle = styled.h1`
  color: black;
  font-size: 20;
  font-family: Arial, Helvetica, sans-serif;
`;

const StyledDescription = styled.p`
  color: black;
  font-size: 16;
  font-family: Arial, Helvetica, sans-serif;
`;

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

export default function Modal() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { user, login, signUpWithGoogle } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      router.push('/dashboard');
    } catch (err) {
      console.log(err);
    }
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavButton>Login</NavButton>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Login</DialogTitle>
        <GoogleButton onClick={handleGoogleSignIn}>
          Continue with Google
        </GoogleButton>
        <Divider>or</Divider>
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
        <DialogDescription>Det här är en modal</DialogDescription>
        <DialogClose asChild>
          <CloseButton>X</CloseButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}