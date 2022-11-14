import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import WireImage from '../../../public/wireAndMic.svg';
import Image from 'next/image';

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
  width: 96vw;
  max-width: 440px;
  max-height: 100vh;
  padding: 25;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const StyledOverlay = styled(dialogOverlay)`
  backdrop-filter: blur(10px);
  position: fixed;
  inset: 0;
`;

const NavButton = styled.button`
  width: 145px;
  height: 56px;
  color: black;
  border-radius: 4px;
  font-size: 18px;
  border: ${(props) => (props.border ? 'black' : 'none')};
  background-color: ${(props) =>
    props.background ? `${props.theme.purple500}` : 'transparent'};
  cursor: pointer;
  color: ${(props) =>
    props.whiteText ? `${props.theme.white}` : `${props.theme.purple500}`};
`;

const GoogleButton = styled.button`
  width: 330px;
  height: 48px;
  color: ${(props) => props.theme.purple500};
  background-color: transparent;
  font-size: 16px;
  border: 1px solid ${(props) => props.theme.purple500};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

const CloseButton = styled.button`
  color: black;
  font-size: 15px;
  margin-left: 350px;
  margin-top: 30px;
  background-color: transparent;
  border: none;
`;

const Divider = styled.p`
  color: black;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const StyledTitle = styled.h1`
  color: black;
  font-size: 30px;
  margin: 0;
  font-weight: 400;
`;
const StyledMobileTitle = styled.h1`
  color: black;
  font-size: 20px;
  margin: 0;
  padding: 40px;
  text-align: center;
  font-weight: 400;
`;

const PrivacyText = styled.p`
  color: grey;
  font-size: 10px;
  text-align: center;
  margin-bottom: 32px;
`;

const LoginTexts = styled.button`
  color: ${(props) => props.theme.black600};
  font-size: 16;
  background-color: transparent;
  border: none;
`;

const CreateAccountTexts = styled.button`
  color: ${(props) => props.theme.black600};
  font-size: 16px;
  background-color: transparent;
  border: none;
`;

const ForgotPassword = styled.p`
  color: ${(props) => props.theme.purple500};
  font-size: 12px;
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
    border-radius: 4px;
    border: none;
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

export default function Modal(props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { user, login, signUpWithGoogle, signup } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [buttonTitle, setButtonTitle] = useState(props.buttonTitle);
  const [userOnMobile, setUserOnMobile] = useState(0);

  const WidthOfWindow = () => {
    const [width, setWidth] = useState(0);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
      setUserOnMobile(window.innerWidth < 1024 ? true : false);
    };
    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      };
    }, []);
  };

  WidthOfWindow();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      router.push('/projects');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signup(data.email, data.password);
      router.push('/projects');
    } catch (err) {
      console.log(err);
    }
    console.log(data);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signUpWithGoogle();
      window.location.href = '/projects';
    } catch (error) {
      console.log(error);
    }
  };

  const checkForm = () => {
    if (buttonTitle == 'Sign in') {
      return true;
    }
  };

  const changeForm = () => {
    if (buttonTitle == 'Sign in') {
      setButtonTitle('Get started');
      console.log(buttonTitle);
      checkForm();
    } else if (buttonTitle == 'Get started') {
      setButtonTitle('Sign in');
      console.log(buttonTitle);
      checkForm();
    }
  };

  //Make this better
  const returnButtonValue = () => {
    window.location.reload(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <NavButton background={props.background} whiteText={props.whiteText}>
          {buttonTitle}
        </NavButton>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <CloseButton onClick={returnButtonValue}>&#9587;</CloseButton>
        </DialogClose>
        {userOnMobile ? (
          <>
            <StyledMobileTitle>
              Woops you tried to log in on a mobile device, Fourtrack only works
              on desktop.
            </StyledMobileTitle>
            <Image src={WireImage} height={180} width={180}/>
          </>
        ) : (
          <>
            <div>
              <DialogTitle>{buttonTitle}</DialogTitle>
            </div>
            <GoogleButton
              onClick={async () => {
                handleGoogleSignIn();
              }}
            >
              <FcGoogle size='22px' />
              Continue with Google
            </GoogleButton>
            <Divider>or</Divider>
            <StyledForm onSubmit={checkForm() ? handleLogin : handleSignup}>
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    email: e.target.value,
                  })
                }
                value={data.email}
                required
                type='email'
                placeholder='Email'
              ></input>
              <input
                onChange={(e) =>
                  setData({
                    ...data,
                    password: e.target.value,
                  })
                }
                value={data.password}
                required
                type='password'
                placeholder='Password'
              ></input>
              <button type='submit'>{buttonTitle}</button>
            </StyledForm>
            {checkForm() ? (
              <>
                <CreateAccountTexts onClick={changeForm}>
                  Don’t have an account? Create one.
                </CreateAccountTexts>
                <ForgotPassword>I forgot my password</ForgotPassword>
              </>
            ) : (
              <LoginTexts onClick={changeForm}>
                Already have an account? Log in
              </LoginTexts>
            )}
            <PrivacyText>
              By clicking create account I agree to <br />
              Fortracks awesome privacy policy
            </PrivacyText>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
