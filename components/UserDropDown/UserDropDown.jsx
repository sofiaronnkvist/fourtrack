import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { GearIcon, ExitIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import UserModal from '../UserModal/UserModal';
import { useAuth } from '../../context/AuthContext';
import Image from 'next/image';

const menuPortal = DropdownMenu.Portal;
const menuButton = DropdownMenu.Trigger;
const menuContent = DropdownMenu.Content;

const StyledMenuPortal = styled(menuPortal)`
  /* background-color: red; */

  width: 222px;
  height: 80px;
`;
const StyledMenuButton = styled(menuButton)`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
`;
const StyledMenuContent = styled(menuContent)`
  background-color: ${(props) => props.theme.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 222px;
  height: 80px;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
`;

export default function ProjectDropDownMenu(props) {
  const { user, logout } = useAuth();
  const string = user.email.split('')
  const firstLetter = string[0].toUpperCase();
 

  return (
    <DropdownMenu.Root>
      <StyledMenuButton>
        {user.profileImage ? (
          <Image
            src={user.profileImage}
            width={'32px'}
            height={'32px'}
            style={{ borderRadius: '100%' }}
            alt={'profile image of loged in user'}
          ></Image>
        ) : (
          <ProfileIcon>{firstLetter}</ProfileIcon>
        )}

        <ChevronDownIcon style={{ marginLeft: '10px' }} />
      </StyledMenuButton>
      <StyledMenuPortal>
        <StyledMenuContent>
          <StyledListItem>
            <GearIcon style={{ marginRight: '5px', width: '13px' }} />
            {/* Rename */}
            <UserModal projectsToDelete={props.projectsToDelete} colabsToDelete={props.colabsToDelete}/>
          </StyledListItem>
          <StyledListItem onClick={() => logout()}>
            <ExitIcon style={{ marginRight: '5px', width: '13px' }} />
            Log out
          </StyledListItem>
        </StyledMenuContent>
      </StyledMenuPortal>
    </DropdownMenu.Root>
  );
}

const StyledListItem = styled.li`
  list-style-type: none;
  display: flex;
  padding: 5px;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`;

const ProfileIcon = styled.div`
  background-color: ${(props) => props.theme.yellow500};
  border-radius: 100%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
`;
