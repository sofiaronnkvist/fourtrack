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
  const [userOnMobile, setUserOnMobile] = useState(0);

  const WidthOfWindow = (checkWidth) => {
    const [width, setWidth] = useState(0);
    const handleWindowSizeChange = () => {
      setWidth(window.innerWidth);
      setUserOnMobile(window.innerWidth < 580 ? true : false);
    };
    useEffect(() => {
      window.addEventListener('resize', handleWindowSizeChange);
      return () => {
        window.removeEventListener('resize', handleWindowSizeChange);
      };
    }, []);
  };

  WidthOfWindow();
  console.log(userOnMobile);

  return (
    <NavWrapper>
      <NotLogedInWrapper>
        {userOnMobile ? (
          <>
            <Modal buttonTitle='Sign in' />
            <Modal background whiteText buttonTitle='Get started' />
          </>
        ) : (
          <>
            <Logo alt='Logo' />
            <div>
              <StyledLink border href='/'>
                How does it work?
              </StyledLink>
              <Modal buttonTitle='Sign in' />
              <Modal background whiteText buttonTitle='Get started' />
            </div>
          </>
        )}
      </NotLogedInWrapper>
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

    @media screen and (max-width: 500px) {
      font-size: 16px;
    }
  }
`;
const StyledLink = styled(Link)`
  :hover {
    font-size: 20px;
  }
`;
