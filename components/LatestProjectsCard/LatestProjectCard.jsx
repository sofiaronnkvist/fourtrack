import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import Link from 'next/link';
import ProjectDropDownMenu from '../ProjectDropDown/DropDownMenu';
import { async } from '@firebase/util';

const LatestProjectCard = ({ title, date, id, ownerId }) => {
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
          </ProjectWrapper>
        </a>
      </Link>
    </ProjectOuterWrapper>
  );
};
export default LatestProjectCard;
const ProjectOuterWrapper = styled.div``;

const ProjectWrapper = styled.div`
  height: 136px;
  width: 220px;
  box-shadow: ${(props) => props.theme.mdShadow};
  border: 1px solid ${(props) => props.theme.purple500};
  border-radius: 4px;
  padding: 16px;
  margin-right: 16px;
`;
const ProjectTitle = styled.p`
  font-size: 18px;
`;
const ProjectDate = styled.p`
  font-size: 10px;
  color: ${(props) => props.theme.purple500};
`;