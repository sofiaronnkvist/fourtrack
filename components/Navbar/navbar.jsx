import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Modal from '../Modal/Modal';
import logo from '../../public/logo.svg';
import styled from 'styled-components';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <NavWrapper>
      {!user ? (
        <NotLogedInWrapper>
          <Image src={logo} alt='Logo' />
          <div>
            <Link href='/'>How it works</Link>
            <Modal buttonTitle='Sign in' />
            <Modal buttonTitle='Get started' />
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
`;
