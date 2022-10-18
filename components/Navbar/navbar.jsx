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
          <Link href='/'>
            <a>Home</a>
          </Link>
          <a href='/login'>Login</a>
          <a href='/signup'>Signup</a>{' '}
        </div>
      ) : (
        <div>
          <a href='/dashboard'>Dashboard</a>
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
