import { MdDragIndicator } from 'react-icons/md';
import { AiOutlineStar } from 'react-icons/ai';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import ProjectDropDownMenu from '../ProjectDropDown/DropDownMenu';
import Favorite from '../Favorite/Favorite';
import { useState, useEffect } from 'react';

const ProjectCard = ({ title, date, id, ownerId, favorite }) => {
  const { user } = useAuth();
  const [owner, SetOwner] = useState(true);

  useEffect(() => {
    if (user.uid !== ownerId) {
      SetOwner(false);
    }
  }, []);

  return (
    <ProjectOuterWrapper id={id}>
      <ProjectWrapper>
        <Link
          href={{
            pathname: '/projects/[slug]',
            query: { slug: title },
          }}
          key={title}
        >
          <StyledA>
            <ProjectTitle>{title}</ProjectTitle>
            <ProjectDate>{date}</ProjectDate>
            <ProjectLegth>1.23</ProjectLegth>
            <ProjectLegth>113</ProjectLegth>
          </StyledA>
        </Link>
        <StarWrapper>
          {owner ? (
            <Favorite
              projectId={id}
              favorite={favorite}
              size={'20px'}
            ></Favorite>
          ) : null}
        </StarWrapper>
        <DotWrapper>
          <ProjectDropDownMenu ownerId={ownerId} projectId={id} title={title} />
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
  height: 72px;
  width: 1000px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: ${(props) => props.theme.mdShadow};
  border-radius: 4px;
`;
const StyledA = styled.a`
  height: 72px;
  width: 1000px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
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
