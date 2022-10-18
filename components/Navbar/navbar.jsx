import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div>
      {!user ? (
        <div>
          {' '}
          <Link href='/'>Home </Link>
          <Link href='/login'>Login </Link>
          <Link href='/signup'>Signup </Link>
        </div>
      ) : (
        <div>
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
