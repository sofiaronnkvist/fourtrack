import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth, updateEmail, updateUser, updateProfile } from 'firebase/auth';
import { firestore } from '../../utils/firebase';
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
  max-width: 440px;
  max-height: 85vh;
  padding: 25;
  border: 1px solid black;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const CreateButton = styled.button`
  background-color: transparent;
  border-radius: 8px;
  width: 117px;
  height: 34px;
  margin-right: 16px;
  cursor: pointer;
`;

const CloseButton = styled.button`
  color: grey;
  font-size: 20px;
  margin-left: 350px;
  margin-top: 30px;
  background-color: transparent;
  border: none;
`;

const StyledTitle = styled.h1`
  color: black;
  font-size: 20;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 330px;
    height: 48px;
    font-size: 16px;
    padding: 5px;
    margin-top: 30px;
    border-radius: 8px;
    border: 1px solid #d0d5dd;
  }
  input[type='email']:focus {
    outline: none !important;
    border: 2px solid ${(props) => props.theme.purple};
  }
  input[type='password']:focus {
    outline: none !important;
    border: 2px solid ${(props) => props.theme.purple};
  }
  button {
    width: 330px;
    height: 48px;
    font-size: 16px;
    padding: 5px;
    margin: 30px;

    background-color: ${(props) => props.theme.purple};
    color: white;
    border-radius: 8px;
  }
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
export const DialogClose = DialogPrimitive.Close;

export default function ChangeEmailModal(props) {
  const [open, setOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ email: '', password: '' });
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    // console.log(updatedUser.email);
    // console.log(auth.currentUser);

    await updateEmail(auth.currentUser, {
      email: updatedUser.email,
    })
      .then(() => {
        console.log('email change');
      })
      .catch((error) => {});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateButton>Change email</CreateButton>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton>X</CloseButton>
        </DialogClose>
        <DialogTitle>Change email</DialogTitle>

        <StyledForm onSubmit={(e) => handleSubmit(e, user.uid)}>
          <input
            // value={user.email}
            minLength='1'
            maxLength='30'
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                email: e.target.value,
              })
            }
            type='email'
            placeholder='New email'
            required
          ></input>
          <input
            // value={user.email}
            minLength='1'
            maxLength='30'
            onChange={(e) =>
              setUpdatedUser({
                ...updatedUser,
                password: e.target.value,
              })
            }
            type='password'
            placeholder='Password'
            required
          ></input>
          <button type='submit'>Change</button>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
}