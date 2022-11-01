import { MdDragIndicator } from 'react-icons/md';
import styled from 'styled-components';

const ProjectCard = ({ title, date }) => {
  return (
    <ProjectWrapper>
      <MdDragIndicator></MdDragIndicator>
      <ProjectText>{title}</ProjectText>
      <ProjectText>1 nov 2022</ProjectText>
      <ProjectText>1.23</ProjectText>
    </ProjectWrapper>
  );
};
export default ProjectCard;

const ProjectWrapper = styled.div`
  height: 50px;
  width: 515px;
  margin: 8px;
  display: flex;
  align-items: center;
  
  background: #ffffff;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
`;
const ProjectText = styled.p``;
