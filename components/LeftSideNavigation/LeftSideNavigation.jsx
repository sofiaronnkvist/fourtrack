import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import { AiOutlineStar } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { MdLogout } from 'react-icons/md';
import Image from 'next/image';
import { ChevronRightIcon, MixIcon } from '@radix-ui/react-icons';
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
const LeftSideNavigation = ({ collections }) => {
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
    const query_ = query(
      coll,
      where('colab_uid', 'array-contains-any', [user.uid])
    );
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
            <LeftContent>
              <MixIcon size={'25px'} />
              <Link href='/projects'>
                <NavLink>All recordings</NavLink>
              </Link>
            </LeftContent>
            <RightContent>
              <StyledNumber>{allProjectsNo}</StyledNumber>
              <ChevronRightIcon size='20px' />
            </RightContent>
          </LinkWrapper>
          <LinkWrapper>
            <LeftContent>
              <AiOutlineStar size='20px' />
              <Link href='/projects/favorites'>
                <NavLink>Favorites</NavLink>
              </Link>
            </LeftContent>
            <RightContent>
              <StyledNumber>{favoritesNo}</StyledNumber>
              <ChevronRightIcon size='20px' />
            </RightContent>
          </LinkWrapper>
          <LinkWrapper>
            <LeftContent>
              <BsPerson size='20px' />
              <Link href='/projects/shared'>
                <NavLink>Shared with me</NavLink>
              </Link>
            </LeftContent>
            <RightContent>
              <StyledNumber>{sharedProjectsNo}</StyledNumber>
              <ChevronRightIcon size='20px' />
            </RightContent>
          </LinkWrapper>
          <StyledSeparator />
          <CollectionsAccordion
            collections={collections}
            collectionTitle={collections}
          />
        </TopItems>
        <BottomItems>
          <LinkWrapper>
            <Link href='/projects'>
              <NavLink style={{ cursor: 'not-allowed' }}>Fourtrack</NavLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link href='/projects'>
              <NavLink style={{ cursor: 'not-allowed' }}>Help</NavLink>
            </Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link href='/'>
              <NavLink
                onClick={() => {
                  logout();
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
`;
const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 16px;
  justify-content: space-between;
`;
const BottomItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: fixed;
  bottom: 0;
`;
const TopItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const NavLink = styled.a`
  padding: 4px 8px;
  cursor: pointer;
  font-weight: 500;
  color: ${(props) => props.theme.black900};
`;
const StyledSeparator = styled(SeparatorLine)`
  margin: 35px;
  height: 1px;
  width: 100%;
`;
const RightContent = styled.div`
  display: flex;
  align-items: center;
`;
const LeftContent = styled.div`
  display: flex;
  align-items: center;
`;
const StyledNumber = styled.p`
  padding: 0;
  margin: 0;
  color: ${(props) => props.theme.black50};
`;
