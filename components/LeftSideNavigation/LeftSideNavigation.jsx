import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';

const LeftSideNavigation = () => {
  const { logout } = useAuth();

  return (
    <>
      <Navigation>
        <Link href='/projects'>
          <NavLink>All recordings</NavLink>
        </Link>
        <Link href='/projects'>
          <NavLink>Favorites</NavLink>
        </Link>
        <Link href='/projects'>
          <NavLink>Shared with me</NavLink>
        </Link>
        <Link href='/projects'>
          <NavLink>Collections</NavLink>
        </Link>
        <BottomItems>
          <Link href='/projects'>
            <NavLink>Fourtrack</NavLink>
          </Link>
          <Link href='/projects'>
            <NavLink>Help</NavLink>
          </Link>
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
const BottomItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 400px;
`;
const NavLink = styled.a`
  padding-bottom: 16px;
`;
