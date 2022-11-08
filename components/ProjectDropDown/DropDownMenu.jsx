import React from 'react';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DotsVerticalIcon,
  DiscIcon,
  Share2Icon,
  Pencil1Icon,
  CrumpledPaperIcon,
} from '@radix-ui/react-icons';
import { deleteFolderFromStorage } from '../../utils/deleteFolderFromStorage';
import { useRouter } from 'next/router';
import Link from 'next/link';

const menuPortal = DropdownMenu.Portal;
const menuButton = DropdownMenu.Trigger;
const menuContent = DropdownMenu.Content;

const StyledMenuPortal = styled(menuPortal)`
  background-color: red;

  width: 440px;
  height: 85px;
`;
const StyledMenuButton = styled(menuButton)`
  background-color: transparent;
  border: none;
`;
const StyledMenuContent = styled(menuContent)`
  background-color: ${(props) => props.theme.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 104px;
  height: 128px;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
    0px 4px 6px -2px rgba(16, 24, 40, 0.03);
`;

export default function ProjectDropDownMenu(props) {
  const router = useRouter();

  const deteleProject = async (userId, ProjectId) => {
    await deleteFolderFromStorage(userId, ProjectId);
    router.push('/projects');
  };

  return (
    <DropdownMenu.Root>
      <StyledMenuButton>
        <DotsVerticalIcon style={{ width: '40px', height: '20px' }} />
      </StyledMenuButton>
      <StyledMenuPortal>
        <StyledMenuContent>
          <StyledListItem>
            <DiscIcon style={{ marginRight: '5px', width: '13px' }} />
            <Link
              href={{
                pathname: '/projects/[slug]',
                query: { slug: props.title },
              }}
            >
              Open
            </Link>
          </StyledListItem>
          <StyledListItem>
            <Share2Icon style={{ marginRight: '5px', width: '13px' }} />
            Share
          </StyledListItem>
          <StyledListItem>
            <Pencil1Icon style={{ marginRight: '5px', width: '13px' }} />
            Rename
          </StyledListItem>
          <StyledListItem
            onClick={() => deteleProject(props.userId, props.projectId)}
          >
            <CrumpledPaperIcon style={{ marginRight: '5px', width: '13px' }} />
            Delete
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
