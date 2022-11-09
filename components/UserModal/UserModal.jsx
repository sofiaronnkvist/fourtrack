import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';
import ShareProject from '../Shareproject/ShareProject';
import Image from 'next/image';
import { logo } from '../../public/logo.svg';

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
  width: 480px;
  height: 500px;
  padding: 25px;
  border: 1px solid black;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    cursor: pointer;
  }
  image {
    width: 48px;
    height: 50px;
    margin-right: 20px;
  }
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const StyledTitle = styled.h1`
  color: black;
  font-size: 20;
`;

const NavButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
`;

const CloseButton = styled.button`
  color: grey;
  font-size: 20px;
  margin-left: 350px;
  margin-top: 0px;
  background-color: transparent;
  cursor: pointer;
  border: none;
`;
const InfoWrapper = styled.div`
  display: flex;
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

export default function UserModal(props) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [googleUser, setGoogleUser] = useState(false)

  console.log('user in modal', user);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavButton>Settings</NavButton>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton>X</CloseButton>
        </DialogClose>
        <DialogTitle>Account settings {props.projectTitle}</DialogTitle>
        <InfoWrapper>
          <svg
            width='44'
            height='45'
            viewBox='0 0 44 45'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              cx='22'
              cy='22.5'
              r='17.1754'
              stroke='black'
              stroke-width='9.64912'
            />
            <path
              d='M15.4385 22.5H28.5613'
              stroke='black'
              stroke-width='5.40351'
              stroke-linecap='round'
            />
            <path
              d='M22 29.0614L22 15.9386'
              stroke='black'
              stroke-width='5.40351'
              stroke-linecap='round'
            />
          </svg>
          <div>
            <h5>Email</h5>
            <p>{user.email}</p>
            <a>Change email</a>
            <h5>Password</h5>
            <a>Change password</a>
          </div>
        </InfoWrapper>
        {/* <ShareProject projectId={props.projectId} /> */}
      </DialogContent>
    </Dialog>
  );
}
