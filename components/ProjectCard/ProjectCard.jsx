import { MdDragIndicator } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';

import styled from 'styled-components';

const ProjectCard = ({ title, date }) => {
  return (
    <ProjectOuterWrapper>
      <MdDragIndicator size={'24px'}></MdDragIndicator>
      <ProjectWrapper>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDate>{date}</ProjectDate>
        <ProjectLegth>1.23</ProjectLegth>
        <ProjectLegth>113</ProjectLegth>
        <StarWrapper>
          <AiOutlineStar size={'20px'}></AiOutlineStar>
        </StarWrapper>
        <DotWrapper>
          <BiDotsVerticalRounded size={'25px'}></BiDotsVerticalRounded>
        </DotWrapper>
      </ProjectWrapper>
    </ProjectOuterWrapper>
  );
};
export default ProjectCard;
const ProjectOuterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectWrapper = styled.div`
  height: 50px;
  width: 1000px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
`;
const ProjectTitle = styled.p`
  margin-left: 28px;
  width: 250px;
`;
const ProjectDate = styled.p`
  margin-left: 48px;
`;
const ProjectLegth = styled.p`
  margin-left: 100px;
`;
const StarWrapper = styled.div`
  margin-left: 100px;
`;
const DotWrapper = styled.div`
  margin-left: 100px;
`;
