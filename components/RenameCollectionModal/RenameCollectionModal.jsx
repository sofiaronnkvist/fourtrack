import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, updateDoc, writeBatch } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';

const dialogContent = DialogPrimitive.Content;
const dialogOverlay = DialogPrimitive.Overlay;
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogContent = Content;
const DialogClose = DialogPrimitive.Close;

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

const StyledDialogTrigger = styled(DialogTrigger)`
  background-color: white;
  font-size: 14px;
  padding-left: 10px;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const NavLinkItem = styled.p`
  cursor: pointer;
`;

const CloseButton = styled.button`
  color: black;
  font-size: 15px;
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
    border: 2px solid ${(props) => props.theme.purple500};
  }
  input[type='password']:focus {
    outline: none !important;
    border: 2px solid ${(props) => props.theme.purple500};
  }
  button {
    width: 330px;
    height: 48px;
    font-size: 16px;
    padding: 5px;
    margin: 30px;

    background-color: ${(props) => props.theme.purple500};
    color: white;
    border-radius: 8px;
  }
`;

const DialogTitle = StyledTitle;

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

export default function RenameCollectionModal({ collectionId, projectsRef }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState('');

  const handleSubmit = async (e, collectionId, projectsRef) => {
    e.preventDefault();
    try {
      const batch = writeBatch(firestore);
      const projectsArray = projectsRef[0];
      projectsArray.forEach((project) => {
        batch.update(doc(firestore, 'projects', project.id), {
          collections: data,
        });
      });
      await batch.commit();

      const collectionRef = doc(firestore, 'collections', collectionId);
      await updateDoc(collectionRef, {
        title: data,
      });
      router.push('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <StyledDialogTrigger asChild>
        <NavLinkItem>Rename</NavLinkItem>
      </StyledDialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton>&#9587;</CloseButton>
        </DialogClose>
        <DialogTitle>Change title</DialogTitle>

        <StyledForm
          onSubmit={(e) => handleSubmit(e, collectionId, projectsRef)}
        >
          <input
            onChange={(e) => setData(e.target.value)}
            value={data}
            required
            type='text'
            placeholder='New name'
          ></input>
          <button type='submit'>Change title</button>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
}
