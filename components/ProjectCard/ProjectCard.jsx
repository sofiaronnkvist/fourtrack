import { MdDragIndicator } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import ProjectDropDownMenu from '../ProjectDropDown/DropDownMenu';
import { TrashIcon } from '@radix-ui/react-icons';
import Favorite from '../Favorite/Favorite';

const ProjectCard = ({ title, date, id, ownerId, favorite }) => {
  const { user } = useAuth();

  return (
    <ProjectOuterWrapper id={id}>
      {/* <Link
        href={{
          pathname: '/projects/[slug]',
          query: { slug: title },
        }}
        key={title}
      >
        <a> */}
      <ProjectWrapper>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDate>{date}</ProjectDate>
        <ProjectLegth>1.23</ProjectLegth>
        <ProjectLegth>113</ProjectLegth>
        <StarWrapper>
          <Favorite
            projectId={id}
            favorite={favorite}
            size={'20px'}
          ></Favorite>
        </StarWrapper>
        <DotWrapper>
          <ProjectDropDownMenu ownerId={ownerId} projectId={id} title={title} />
        </DotWrapper>
        <TrashIcon />
      </ProjectWrapper>
      {/* </a>
      </Link> */}
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
