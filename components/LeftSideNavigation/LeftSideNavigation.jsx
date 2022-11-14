import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import AllRecIcon from '../../public/AllRecIcon.svg';
import { AiOutlineStar } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import Image from 'next/image';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import * as Separator from '@radix-ui/react-separator';
import CollectionsAccordion from '../CollectionsAccordion/CollectionsAccordion';
import { firestore } from '../../utils/firebase';
import {
  collection,
  query,
  where,
  getCountFromServer,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
const LeftSideNavigation = ({ collections, projectsRef }) => {
  const { user, logout } = useAuth();
  const [allProjectsNo, setAllProjectsNo] = useState(null);
  const [sharedProjectsNo, setSharedProjectsNo] = useState(null);
  const [favoritesNo, setFavoritesNo] = useState(null);

  useEffect(() => {
    getNoOfProjects();
    numberOfShared();
    numberOfFavorites();
  }, []);

  const getNoOfProjects = async () => {
    const coll = collection(firestore, 'projects');
    const query_ = query(coll, where('uid', '==', user.uid));
    const snapshot = await getCountFromServer(query_);
    setAllProjectsNo(snapshot.data().count);
  };

  const numberOfShared = async () => {
    const coll = collection(firestore, 'projects');
    const query_ = query(coll, where('colab_uid', '==', user.uid));
    const snapshot = await getCountFromServer(query_);
    setSharedProjectsNo(snapshot.data().count);
  };
  const numberOfFavorites = async () => {
    const coll = collection(firestore, 'projects');
    const query_ = query(
      coll,
      where('favorite', '==', true),
      where('uid', '==', user.uid)
    );
    const snapshot = await getCountFromServer(query_);
    setFavoritesNo(snapshot.data().count);
  };
  return (
    <>
      <Navigation>
        <TopItems>
          <LinkWrapper>
            <Image src={AllRecIcon} alt='play, pause, rec and stop buttons' />
            <Link href='/projects'>
              <NavLink>All recordings</NavLink>
            </Link>
            <p>{allProjectsNo}</p>
            <ChevronRightIcon size='20px' />
          </LinkWrapper>
          <LinkWrapper>
            <AiOutlineStar size='20px' />
            <Link href='/projects/favorites'>
              <NavLink>Favorites</NavLink>
            </Link>
            <p>{favoritesNo}</p>

            <ChevronRightIcon size='20px' />
          </LinkWrapper>
          <LinkWrapper>
            <BsPerson size='20px' />
            <Link href='/projects/shared'>
              <NavLink>Shared with me</NavLink>
            </Link>
            <p>{sharedProjectsNo}</p>

            <ChevronRightIcon size='20px' />
          </LinkWrapper>
          <StyledSeparator />
          {/* <LinkWrapper>
            <CiFileOn size='20px' />
            <Link href='/projects/collections'>
              <NavLink>Collections</NavLink>
            </Link>
            <ChevronRightIcon size='20px' />
          </LinkWrapper> */}
          <CollectionsAccordion
            collections={collections}
            projectsRef={projectsRef}
          />
        </TopItems>
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

const SeparatorLine = Separator.Root;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  margin-top: 100px;
  justify-content: space-between;
  height: 80vh;

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
  padding-bottom: 10vh;
`;
const TopItems = styled.div`
  display: flex;
  flex-direction: column;
`;
const NavLink = styled.a`
  padding: 0px 8px;
  cursor: pointer;
`;

const StyledSeparator = styled(SeparatorLine)`
  margin: 15px;
  height: 1px;
  width: 100%;
`;
