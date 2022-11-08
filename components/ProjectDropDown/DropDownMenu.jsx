import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import {
  DotsVerticalIcon,
  DiscIcon,
  Share2Icon,
  Pencil1Icon,
  CrumpledPaperIcon,
} from '@radix-ui/react-icons';

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

export default function ProjectDropDownMenu() {
  const { user } = useAuth();

  return (
    <DropdownMenu.Root >
      <StyledMenuButton>
        <DotsVerticalIcon />
      </StyledMenuButton>

      <StyledMenuPortal>
        <StyledMenuContent>
          <StyledListItem>
            <DiscIcon style={{ marginRight: '5px', width: '13px' }} />
            Open
          </StyledListItem>
          <StyledListItem>
            <Share2Icon style={{ marginRight: '5px', width: '13px' }} />
            Share
          </StyledListItem>
          <StyledListItem>
            <Pencil1Icon style={{ marginRight: '5px', width: '13px' }} />
            Rename
          </StyledListItem>
          <StyledListItem>
            <CrumpledPaperIcon style={{ marginRight: '5px', width: '13px' }} />
            Delete
          </StyledListItem>
          {/* <DropdownMenu.Item>Open</DropdownMenu.Item>
          <DropdownMenu.Item>Share</DropdownMenu.Item>
          <DropdownMenu.Item disabled>Rename</DropdownMenu.Item>
          <DropdownMenu.Item disabled>Delete</DropdownMenu.Item> */}
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
`;
