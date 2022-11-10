import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal/Modal';
import logo from '../../public/logo.svg';
import styled from 'styled-components';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <NavWrapper>
      {!user ? (
        <NotLogedInWrapper>
          <Image src={logo} alt='Logo' />
          <div>
            <Link border href='/'>How does it work?</Link>
            <Modal buttonTitle='Sign in' />
            <Modal background whiteText buttonTitle='Get started' />
          </div>
        </NotLogedInWrapper>
      ) : (
        <div>
          <Link href='/projects'>
            <Image src={logo} alt='Logo' />
          </Link>
        </div>
      )}
    </NavWrapper>
  );
}
const NavWrapper = styled.nav`
  margin: 32px;
`;
const NotLogedInWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 18px;
    color: ${(props) => props.theme.purple500};
  }
`;
