import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import Link from 'next/link';
import ProjectDropDownMenu from '../ProjectDropDown/DropDownMenu';
import { async } from '@firebase/util';

const ProjectCard = ({ title, date, id, ownerId, favorite }) => {
  const { user } = useAuth();



  return (
    <ProjectOuterWrapper id={id}>
      <Link
        href={{
          pathname: '/projects/[slug]',
          query: { slug: title },
        }}
        key={title}
      >
        <a>
          <ProjectWrapper>
            <ProjectTitle>{title}</ProjectTitle>
            <ProjectDate>Laste edited {date}</ProjectDate>

            <DotWrapper>
              <ProjectDropDownMenu
                ownerId={ownerId}
                projectId={id}
                title={title}
              />
            </DotWrapper>
          </ProjectWrapper>
        </a>
      </Link>
    </ProjectOuterWrapper>
  );
};
export default ProjectCard;
const ProjectOuterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectWrapper = styled.div`
  height: 72px;
  width: 1000px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: ${(props) => props.theme.mdShadow};
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