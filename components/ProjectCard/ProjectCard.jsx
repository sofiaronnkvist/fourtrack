import { MdDragIndicator } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { useAuth } from '../../context/AuthContext';
import { deleteFolderFromStorage } from '../../utils/deleteFolderFromStorage';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import { async } from '@firebase/util';

const ProjectCard = ({ title, date, id }) => {
  const { user } = useAuth();
  const router = useRouter();

  console.log(`project id in card ${id}`);
  console.log(`user id in card ${user.uid}`);

  const deteleProject = async (userId, ProjectId) => {
    await deleteFolderFromStorage(userId, ProjectId);
    router.push('/projects');
  };
  return (
    <ProjectOuterWrapper id={id}>
      <MdDragIndicator size={'24px'}></MdDragIndicator>
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
        </a>
      </Link>
      <button onClick={() => deteleProject(user.uid, id)}>X</button>
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
