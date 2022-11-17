import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../../../utils/firebase';
import { useAuth } from '../../../context/AuthContext';

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
  border-radius: 4px;
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
  background-color: ${(props) => props.theme.purple500};
  border-radius: 4px;
  border: none;
  width: 144px;
  height: 40px;
  margin-right: 16px;
  color: white;
  cursor: pointer;
  font-size: 14px;
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
    border-radius: 4px;
    border: 1px solid #d0d5dd;
  }
  input[type='text']:focus {
    outline: none !important;
    border: 2px solid ${(props) => props.theme.purple500};
  }

  button {
    width: 330px;
    height: 48px;
    font-size: 16px;
    padding: 5px;
    margin: 30px;
    border: none;
    background-color: ${(props) => props.theme.purple500};
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

export default function ProjectModal(props) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState({ title: '' });
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectsCollectionRef = collection(firestore, 'projects');
      await addDoc(projectsCollectionRef, {
        uid: user.uid,
        title: project.title,
        timestamp: serverTimestamp(),
        favorite: false,
        collections: '',
      });
      setProject({ title: '' });
      setOpen(false);
      router.push('/projects');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <CreateButton>Create recording</CreateButton>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton>&#9587;</CloseButton>
        </DialogClose>
        <DialogTitle>Create project</DialogTitle>

        <StyledForm onSubmit={(e) => handleSubmit(e, props.projectId)}>
          {/* <label>email</label> */}
          <input
            value={project.title}
            minLength='1'
            maxLength='30'
            onChange={(e) =>
              setProject({
                ...project,
                title: e.target.value,
              })
            }
            type='text'
            placeholder='My new song'
            required
          ></input>
          <button type='submit'>Create</button>
        </StyledForm>
      </DialogContent>
    </Dialog>
  );
}
