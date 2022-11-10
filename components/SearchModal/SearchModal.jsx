import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState } from 'react';
import ShareProject from '../Shareproject/ShareProject';

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

const StyledTitle = styled.h1`
  color: black;
  font-size: 20;
`;

const NavButton = styled.button`
  width: ${(props) => (props.btnWithBackground ? '64px' : null)};
  height: ${(props) => (props.btnWithBackground ? '40px' : null)};
  border-radius: ${(props) => (props.btnWithBackground ? '4px' : null)};
  font-size: ${(props) => (props.btnWithBackground ? '15px' : '12px')};
  border: ${(props) => (props.border ? 'black' : 'none')};
  background-color: ${(props) =>
    props.btnWithBackground ? `${props.theme.purple500}` : 'transparent'};
  cursor: pointer;
  color: ${(props) =>
    props.btnWithBackground ? 'white' : `${props.theme.black900}`}; ;
`;

const CloseButton = styled.button`
  color: black;
  font-size: 15px;
  margin-left: 350px;
  margin-top: 30px;
  background-color: transparent;
  cursor: pointer;
  border: none;
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

export default function Modal(props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavButton
          btnWithBackground={props.btnWithBackground}
          whiteText={props.whiteText}
        >
          Share
        </NavButton>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton>&#9587;</CloseButton>
        </DialogClose>
        <DialogTitle>Share {props.projectTitle}</DialogTitle>
        <ShareProject projectId={props.projectId} />
      </DialogContent>
    </Dialog>
  );
}
