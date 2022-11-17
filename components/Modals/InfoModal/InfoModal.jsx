import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const dialogContent = DialogPrimitive.Content;
const dialogOverlay = DialogPrimitive.Overlay;
const DialogDescription = DialogPrimitive.Description;

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
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 8;
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
  z-index: 7;
`;

const CloseButton = styled.button`
  color: black;
  font-size: 15px;
  margin-left: 350px;
  margin-top: 30px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const StyledTitle = styled.h1`
  color: black;
  font-size: 20;
`;

const DialogDescriptionContainer = styled.div`
  padding: 20px;
`;

const StyledDialogDescription = styled(DialogDescription)`
  font-size: 16px;
  color: ${(props) => props.theme.black900};
  line-height: 25px;
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

export default function ProjectModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <AiOutlineInfoCircle size={'20px'} style={{ cursor: 'pointer' }} />
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton>&#9587;</CloseButton>
        </DialogClose>
        <DialogTitle>
          How to use <br /> the studio &#127930;
        </DialogTitle>
        <DialogDescriptionContainer>
          <StyledDialogDescription>
            To use the studio you should use headphones. Then choose the output
            sound to go in those, and the input from your speakers or whatever
            you&#39;re using. <br />
            <br /> To record on a track, press it&#39;s number. Then press
            record, do your thing, and hit stop when you&#39;re done. Do this
            for as many tracks as you want, and then share it with your friends
            if you want to. <br />
            <br /> When you&#39;ve recorded one track, that one will be played
            in your headphones while you record the next and so on. <br />
            <br />
            To play only one track, press the number and then hit play. To play
            all tracks you need to first deselect every track&#39;s number.
            <br />
            <br /> You can drag the marker to where you want a specific track to
            start from, which will be saved. The volumes for each track although
            is just for you to play around with, and will not be saved.
          </StyledDialogDescription>
        </DialogDescriptionContainer>
      </DialogContent>
    </Dialog>
  );
}
