import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

const StyledWrapper = styled.div`
  width: 410px;
  height: max-content;
  background-color: white;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 50px;
  box-shadow: ${(props) => props.theme.lgShadow};
  z-index: 2;
`;

const GoogleButton = styled.button`
  width: 100%;
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
  padding: 15px;
  cursor: pointer;
`;

const StyledTitle = styled.h1`
  color: black;
  font-size: 30px;
  margin: 0;
  font-weight: 400;
`;

const Divider = styled.p`
  color: black;
  font-size: 16px;
  align-self: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
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
    width: 100%;
    height: 48px;
    font-size: 16px;
    padding: 5px;
    margin: 30px;
    background-color: ${(props) => props.theme.purple500};
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
  }
`;

const PrivacyText = styled.p`
  color: grey;
  font-size: 10px;
  text-align: center;
  margin-bottom: 32px;
`;

const StyledErrorMessage = styled.p`
  color: ${(props) => props.theme.red800};
  font-size: 14px;
`;

export default function SignUp(props) {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const { signUpWithGoogle, signup } = useAuth();
  const [formMessage, setFormMessage] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await signUpWithGoogle();
      window.location.href = '/projects';
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(data.email, data.password);
      router.push('/projects');
    } catch (error) {
      setFormMessage('This email is already used for another account.');
      console.log(error);
    }
  };
  return (
    <StyledWrapper>
      <StyledTitle>Sign up</StyledTitle>
      <GoogleButton
        onClick={async () => {
          handleGoogleSignIn();
        }}
      >
        <FcGoogle size='22px' style={{ paddingRight: '5px' }} />
        Continue with Google
      </GoogleButton>
      <Divider>or</Divider>
      <StyledErrorMessage>{formMessage}</StyledErrorMessage>
      <StyledErrorMessage>{props.errorMessage}</StyledErrorMessage>
      <StyledForm onSubmit={(e) => handleSignup(e)}>
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
        <button type='submit'>Create account</button>
      </StyledForm>
      <PrivacyText>
        By clicking create account I agree to <br />
        Fortracks awesome privacy policy
      </PrivacyText>
    </StyledWrapper>
  );
}
