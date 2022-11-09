import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  GearIcon,
  ExitIcon,
  ChevronDownIcon,
  Pencil1Icon,
  CrumpledPaperIcon,
} from '@radix-ui/react-icons';
import { DeleteFolderFromStorage } from '../../utils/deleteFolderFromStorage';
import { useRouter } from 'next/router';
import Link from 'next/link';
import UserModal from '../UserModal/UserModal';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut } from 'react-icons/fi';

const menuPortal = DropdownMenu.Portal;
const menuButton = DropdownMenu.Trigger;
const menuContent = DropdownMenu.Content;

const StyledMenuPortal = styled(menuPortal)`
  background-color: red;

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
  const router = useRouter();
  const { user, logout } = useAuth();

  console.log('Auth user', user.uid);
  console.log('owner', props.ownerId);

  const deteleProject = async (userId, ProjectId, ownerId) => {
    await DeleteFolderFromStorage(userId, ProjectId, ownerId);
    router.push('/projects');
  };

  return (
    <DropdownMenu.Root>
      <StyledMenuButton>
        <ProfileIcon>N</ProfileIcon>
        <ChevronDownIcon />
      </StyledMenuButton>
      <StyledMenuPortal>
        <StyledMenuContent>
          <StyledListItem>
            <GearIcon style={{ marginRight: '5px', width: '13px' }} />
            {/* Rename */}
            <UserModal projectId={props.projectId} />
          </StyledListItem>
          <StyledListItem
            onClick={() =>
              logout()
            }
          >
            <ExitIcon style={{ marginRight: '5px', width: '13px' }} />
            Log out
          </StyledListItem>
        </StyledMenuContent>
      </StyledMenuPortal>
    </DropdownMenu.Root>
  );
}
const NavWrapper = styled.nav`
  margin: 32px;
`;
const StyledListItem = styled.li`
  list-style-type: none;
  display: flex;
  padding: 5px;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`;

const ProfileIcon = styled.div`
  background-color: red;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
`;
