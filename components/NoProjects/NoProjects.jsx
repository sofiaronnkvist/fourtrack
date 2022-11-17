import styled from 'styled-components';
import SquareIcon from '../../public/SquareIcon';
import BigRoundIcon from '../../public/BigRoundIcon';
import SmallRoundIcon from '../../public/SmallRoundIcon';
import SmallSquareIcon from '../../public/SmallSquareIcon';
import CircleIcon from '../../public/CircleIcon';

export default function NoProjects({ heading }) {
  return (
    <NoProjectsMainWrapper>
      <NoProjectsHeadline>{heading}</NoProjectsHeadline>
      <PurpleIconWrapper>
        <SquareIcon height={'35vh'} width={'35vw'} fillInner={'#B4ABDC'} />
      </PurpleIconWrapper>
      <YellowIconWrapper>
        <BigRoundIcon height={'20vh'} width={'20vw'} fillInner={'#EBBA00'} />
      </YellowIconWrapper>
      <OrangeIconWrapper>
        <SmallRoundIcon height={'10vh'} width={'10vw'} fillInner={'#FF9D24'} />
      </OrangeIconWrapper>
      <BlueIconWrapper>
        <SmallSquareIcon height={'18vh'} width={'18vw'} fillInner={'#69B6D3'} />
      </BlueIconWrapper>
      <CircleIconWrapper>
        <CircleIcon height={'4vh'} width={'4vw'} fillInner={'#B4ABDC'} />
      </CircleIconWrapper>
    </NoProjectsMainWrapper>
  );
}

const NoProjectsMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 75vh;
  overflow-y: hidden;
  position: relative;
`;
const NoProjectsHeadline = styled.h2`
  color: ${(props) => props.theme.purple500};
  font-weight: 400;
  width: 400px;
`;
const PurpleIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  bottom: 0;
  right: 5%;
`;
const OrangeIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 20%;
  left: 30%;
  opacity: 0.4;
  transform: rotate(-17deg);
`;
const YellowIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  bottom: 15%;
  left: 5%;
`;
const BlueIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 15%;
  right: 30%;
`;
const CircleIconWrapper = styled.div`
  position: absolute;
  z-index: 0;
  top: 5%;
  left: 42%;
`;
