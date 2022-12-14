import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../../utils/firebase';
import { Pencil1Icon } from '@radix-ui/react-icons';

const dialogContent = DialogPrimitive.Content;
const dialogOverlay = DialogPrimitive.Overlay;

const StyledContent = styled(dialogContent)`
  background-color: white;
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

const NavLinkItem = styled.li`
  cursor: pointer;
  list-style-type: none;
  font-size: 12px;
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

const TitleContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: ${(props) => props.theme.mdShadow};
  padding: 0px 0px 0px 8px;
`;

const StyledTriggerTitle = styled.p`
  :hover {
    text-decoration: underline;
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

export default function RenameModal({ projectId }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [data, setData] = useState('');

  const handleSubmit = async (e, projectId) => {
    e.preventDefault();
    try {
      const ref = doc(firestore, 'projects', projectId);
      await updateDoc(ref, {
        title: data,
      });
      router.push('/projects');
    } catch (error) {
      console.log(error);
    }
  };

  //Make this better
  const returnButtonValue = () => {
    window.location.reload(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavLinkItem>
          {' '}
          <TitleContent>
            <Pencil1Icon style={{ marginRight: '5px', width: '13px' }} />
            <StyledTriggerTitle>Rename</StyledTriggerTitle>
          </TitleContent>
        </NavLinkItem>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton onClick={returnButtonValue}>&#9587;</CloseButton>
        </DialogClose>
        <DialogTitle>Change title</DialogTitle>

        <StyledForm onSubmit={(e) => handleSubmit(e, projectId)}>
          {/* <label>email</label> */}
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
