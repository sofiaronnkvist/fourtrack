import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modals/Modal/Modal';
import Logo from '../../public/logo.svg';

import styled from 'styled-components';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <NavWrapper>
      {!user ? (
        <NotLogedInWrapper>
          <Logo alt='Logo' />
          <div>
            <Link border href='/'>
              How does it work?
            </Link>
            <Modal buttonTitle='Sign in' />
            <Modal background whiteText buttonTitle='Get started' />
          </div>
        </NotLogedInWrapper>
      ) : (
        <div>
          <Link href='/projects'>
            <Logo alt='Logo' />

            {/* <Image src={logo} alt='Logo' /> */}
          </Link>
        </div>
      )}
    </NavWrapper>
  );
}
const NavWrapper = styled.nav`
  padding: 32px;
  background-color: ${(props) => props.theme.grey100};
`;
const NotLogedInWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 18px;
    color: ${(props) => props.theme.purple500};

    @media screen and (max-width: 600px) {
      font-size: 16px;
      display: none;
    }
  }
  button {
    @media screen and (max-width: 600px) {
      margin: 0px 0px;
    }
  }
  svg {
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  @media screen and (max-width: 600px) {
    justify-content: space-around;
  }
`;

