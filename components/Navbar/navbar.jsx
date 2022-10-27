import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import Modal from '../Modal/Modal';
import logo from '../../public/logo.svg';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div>
      {!user ? (
        <div>
          <Image src={logo} alt='Logo' />
          <Link href='/'>How it works</Link>
          <Modal buttonTitle='Sign in' />
          <Modal buttonTitle='Get started' />
        </div>
      ) : (
        <div>
          <Image src={logo} alt='Logo' />
          <Link href='/dashboard'>Dashboard </Link>
          <button
            onClick={() => {
              logout();
              router.push('/');
            }}
          >
            Logout
          </button>{' '}
        </div>
      )}
    </div>
  );
}
