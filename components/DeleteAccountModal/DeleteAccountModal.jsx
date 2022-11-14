import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  doc,
  runTransaction,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { useAuth } from '../../context/AuthContext';
import {
  getAuth,
  deleteUser,
  reauthenticateWithCredential,
} from 'firebase/auth';

const dialogContent = DialogPrimitive.Content;
const dialogOverlay = DialogPrimitive.Overlay;

const StyledContent = styled(dialogContent)`
  background-color: white;
  border-radius: 6;
  box-shadow: ${(props) => props.theme.mdShadow};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 440px;
  max-height: 85vh;
  padding: 25;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 48px;

  span {
    color: #f24822;
    margin-right: 10px;
  }
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const CreateButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  margin-left: -5px;
  color: #f78d75;
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
  text-align: center;
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
  button {
    width: 330px;
    height: 48px;
    font-size: 16px;
    padding: 5px;
    margin: 30px;
    border: none;

    background-color: #f24822;
    color: white;
    border-radius: 4px;
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

export default function DeleteAccountModal(props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([]);
  const { user } = useAuth();

  const handleSubmit = async (userId) => {
    try {
      await runTransaction(firestore, async (transaction) => {
        console.log('in runTransaction for project');
        let array = [];
        let res;
        const q = query(
          collection(firestore, 'projects'),
          where('uid', '==', userId)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          res = {
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp.toDate().toLocaleDateString(),
          };
          array.push(res);
        });
        if (array.length == 0) {
          console.log('No projects to remove');
        } else {
          array.forEach((project) => {
            transaction.delete(doc(firestore, 'projects', project.id));
          });
        }
        await deleteCurrentUser();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCurrentUser = async () => {
    console.log('In deleteCurrentUser');
    const auth = getAuth();
    const userToDelete = auth.currentUser;
    console.log(userToDelete);
    await deleteUser(userToDelete)
      .then(() => {
        console.log('deleted');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateButton>Delete Account</CreateButton>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton>X</CloseButton>
        </DialogClose>
        <DialogTitle>Deleting account will do the following</DialogTitle>
        <p>
          <span>X</span>Log you out on all devices
        </p>
        <p>
          <span>X</span>Delete all of your account information
        </p>

        <StyledForm onSubmit={(e) => handleSubmit(user.uid)}>
          <button type='submit'>Delete Account</button>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
}
