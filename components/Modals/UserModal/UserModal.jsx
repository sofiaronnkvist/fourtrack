import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import ShareProject from '../../Shareproject/ShareProject';
import Image from 'next/image';
import { logo } from '../../../public/logo.svg';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../../utils/firebase';
import ChangeEmailModal from '../ChangeEmailModal/ChangeEmailModal';
import DeleteAccountModal from '../DeleteAccountModal/DeleteAccountModal';

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
  width: 447px;
  height: 497px;
  padding: 25px;
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
  font-size: 14px;
  margin-bottom: 32px;
`;

const NavButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
`;
const InfoContainer = styled.div`
  margin-left: 20px;

  p {
    font-size: 14px;
  }
`;
const StyledH5 = styled.h5`
  margin: 0px;
  font-size: 14px;
`;
const StyledDangerText = styled.h5`
  margin: 0px;
  font-size: 14px;
  margin-top: 250px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  color: black;
  font-size: 15px;
  margin-left: 350px;
  margin-top: 0px;
  background-color: transparent;
  cursor: pointer;
  border: none;
`;
const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
`;
const NoProfileImage = styled.div`
  height: 107px;
  width: 107px;
  border-radius: 100%;
  background-color: gray;
`;
const ImageWrapper = styled.div`
  height: 107px;
  width: 107px;
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
  const [googleUser, setGoogleUser] = useState(false);

  const getUser = async () => {
    let res;
    const ref = collection(firestore, 'users');
    const projectsQuery = query(ref, where('uid', '==', user.uid));
    const querySnapshot = await getDocs(projectsQuery);
    querySnapshot.forEach((doc) => {
      res = {
        ...doc.data(),
      };
    });
    if (res.authProvider == 'google') {
      setGoogleUser(true);
      return;
    }
  };
  getUser();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavButton>Settings</NavButton>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton>&#9587;</CloseButton>
        </DialogClose>
        <DialogTitle>Account settings</DialogTitle>
        <InfoWrapper>
          {user.profileImage ? (
            <ImageWrapper>
              <Image
                src={user.profileImage}
                width={'100px'}
                height={'100px'}
                style={{ borderRadius: '100%' }}
                alt={'User profile image'}
              />
            </ImageWrapper>
          ) : (
            <NoProfileImage></NoProfileImage>
          )}

          <InfoContainer>
            <StyledH5>Email</StyledH5>
            <p>{user.email}</p>
            {googleUser ? null : (
              <>
                <ChangeEmailModal />
                {/* <StyledH5>Password</StyledH5>
                 <a>Change password</a> */}
              </>
            )}
            <StyledDangerText>Danger Zone</StyledDangerText>
            <DeleteAccountModal
              colabsToDelete={props.colabsToDelete}
              projectsToDelete={props.projectsToDelete}
            />
          </InfoContainer>
        </InfoWrapper>
      </DialogContent>
    </Dialog>
  );
}
