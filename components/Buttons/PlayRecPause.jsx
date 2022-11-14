import styled from 'styled-components';
import { PlayIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export default function PlayRecPauseButton({
  handleclick,
  icon,
  backgroundRed,
}) {
  console.log(backgroundRed);
  return (
    <PlayRecPauseBtn  onClick={handleclick}>
      <StyledWrapper backgroundRed={backgroundRed}>{icon}</StyledWrapper>
    </PlayRecPauseBtn>
  );
}
const PlayRecPauseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  padding: 0px;
  background-color: ${(props) => props.theme.grey200};
  border: 2px solid ${(props) => props.theme.grey600};
  border-radius: 4px;
  margin: 5px 7px;

  :hover {
    background-color: ${(props) => props.theme.grey300};
    border: 2px solid ${(props) => props.theme.purple300};
  }
  :active {
    border: 2px solid ${(props) => props.theme.purple500};
  }
`;
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  padding: 0px;
  box-shadow: ${(props) => props.theme.mdShadow};
  background-color: ${(props) =>
    props.backgroundRed ? `${props.backgroundRed}` : `${props.theme.black200}`};
  border: none;
  border-radius: 100%;
`;
