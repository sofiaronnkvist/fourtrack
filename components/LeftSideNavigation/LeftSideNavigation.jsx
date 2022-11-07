import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import AllRecIcon from '../../public/AllRecIcon.svg';
import { AiOutlineStar } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import { CiFileOn } from 'react-icons/ci';
import Image from 'next/image';

const LeftSideNavigation = () => {
  const { logout } = useAuth();

  return (
    <>
      <Navigation>
        <LinkWrapper>
          <Image src={AllRecIcon} alt='play, oause, rec and stop buttons' />
          <Link href='/projects'>
            <NavLink>All recordings</NavLink>
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <AiOutlineStar size='20px' />
          <Link href='/projects'>
            <NavLink>Favorites</NavLink>
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <BsPerson size='20px' />
          <Link href='/projects'>
            <NavLink>Shared with me</NavLink>
          </Link>
        </LinkWrapper>
        <LinkWrapper>
          <CiFileOn size='20px' />
          <Link href='/projects'>
            <NavLink>Collections</NavLink>
          </Link>
        </LinkWrapper>
        <BottomItems>
          <LinkWrapper>
            <Link href='/projects'>
              <NavLink>Fourtrack</NavLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link href='/projects'>
              <NavLink>Help</NavLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link href='/'>
              <NavLink
                onClick={() => {
                  logout();
                  // router.push('/');
                }}
              >
                Logout
              </NavLink>
            </Link>
            <MdLogout size='20px' />
          </LinkWrapper>
        </BottomItems>
      </Navigation>
    </>
  );
};
export default LeftSideNavigation;
const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  margin-top: 100px;
`;
const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
`;
const BottomItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 35vh;
`;
const NavLink = styled.a`
  padding: 0px 8px;
`;
