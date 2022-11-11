import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  doc,
  writeBatch,
  runTransaction,
  arrayRemove,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import { useAuth } from '../../context/AuthContext';
import { getAuth, deleteUser } from 'firebase/auth';

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
  cursor: pointer;
  border: none;
  margin-left: -5px;
  color: #F78D75;
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

export default function DeleteAccountModal(props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [searchResult, setSearchResult] = useState([]);
  const { user } = useAuth();
  console.log(user.uid);

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
      });
      router.push('/');

      // await runTransaction(firestore, async (transaction) => {
      //   console.log('in runTransaction..ll');
      //   console.log(userId);
      //   let testarray = [];
      //   console.log('testarray', testarray);
      //   let testres;
      //   console.log('testres', testres);

      //   const ref = collection(firestore, 'projects');
      //   const colabQuery = query(
      //     ref,
      //     where('colab_uid', 'array-contains-any', [userId])
      //   );
      //   console.log('q', q);

      //   const querySnapshot = await getDocs(colabQuery);
      //   console.log('snapshot', querySnapshot);
      //   querySnapshot.forEach((doc) => {
      //     testres = {
      //       ...doc.data(),
      //       id: doc.id,
      //       timestamp: doc.data().timestamp.toDate().toLocaleDateString(),
      //     };
      //     testarray.push(testres);
      //   });
      //   console.log('array', testarray);
      //   setSearchResult(testarray);
      //   if (testarray.length == 0) {
      //     console.log('No colab to remove');
      //   } else {
      //     testarray.forEach((project) => {
      //       console.log(project.id);
      //       transaction.update(doc(firestore, 'projects', project.id), {
      //         colab_uid: arrayRemove(userId),
      //       });
      //     });
      //   }
      // });
      // const auth = getAuth();
      // const user = auth.currentUser;

      // deleteUser(user)
      //   .then(() => {
      //     // User deleted.
      //     console.log('deleted');
      //     router.push('/');
      //   })
      //   .catch((error) => {
      //     // An error ocurred
      //     // ...
      //     console.log('error', error);
      //   });
    } catch (error) {
      console.error(error);
    }
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

        <StyledForm onSubmit={(e) => handleSubmit(user.uid)}>
          <button type='submit'>Delete Account</button>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
}
