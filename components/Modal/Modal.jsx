import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';

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
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const Button = styled.button`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>Det här är en modal</DialogDescription>
        <DialogClose asChild>
          <Button>X</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
