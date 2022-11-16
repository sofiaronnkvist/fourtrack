import { useAuth } from '../../context/AuthContext';
import * as ContextMenu from '@radix-ui/react-context-menu';
import styled from 'styled-components';
import Link from 'next/link';
import Favorite from '../Favorite/Favorite';
import { useState, useEffect } from 'react';
import { DiscIcon, CrumpledPaperIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import SearchModal from '../Modals/SearchModal/SearchModal';
import RenameModal from '../Modals/RenameModal/RenameModal';
import { DeleteFolderFromStorage } from '../../utils/deleteFolderFromStorage';

const ContextRoot = ContextMenu.Root;
const ContextTrigger = ContextMenu.Trigger;
const ContextPortal = ContextMenu.Portal;
const ContextContent = ContextMenu.Content;
const ContextItem = ContextMenu.Item;

const ProjectCard = ({ title, date, id, ownerId, favorite }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [owner, SetOwner] = useState(true);

  useEffect(() => {
    if (user.uid !== ownerId) {
      SetOwner(false);
    }
  }, []);

  const deleteProject = async (userId, ProjectId, ownerId) => {
    await DeleteFolderFromStorage(userId, ProjectId, ownerId);
    router.push('/projects');
  };

  return (
    <ContextRoot>
      <ContextTrigger>
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
            <ContextPortal>
              <StyledContextContent>
                <StyledContextItem>
                  <DiscIcon style={{ marginRight: '5px', width: '13px' }} />
                  <Link
                    href={{
                      pathname: '/projects/[...slug]',
                      query: { slug: title },
                    }}
                  >
                    Open
                  </Link>
                </StyledContextItem>
                {owner ? (
                  <>
                    <StyledContextItem asChild={true}>
                      <SearchModal
                        btnWithBackground={false}
                        projectTitle={title}
                        projectId={id}
                      />
                    </StyledContextItem>
                    <StyledContextItem asChild={true}>
                      <RenameModal projectId={id} />
                    </StyledContextItem>
                  </>
                ) : null}
                <StyledContextItem>
                  <StyledContextButton
                    onClick={() => deleteProject(user.uid, id, ownerId)}
                  >
                    <CrumpledPaperIcon
                      style={{ marginRight: '5px', width: '13px' }}
                    />
                    {owner ? 'Delete' : 'Leave project'}
                  </StyledContextButton>
                </StyledContextItem>
              </StyledContextContent>
            </ContextPortal>
          </ProjectWrapper>
        </ProjectOuterWrapper>
      </ContextTrigger>
    </ContextRoot>
  );
};
export default ProjectCard;
const ProjectOuterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProjectWrapper = styled.div`
  height: 72px;
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: ${(props) => props.theme.mdShadow};
  border-radius: 4px;
`;
const StyledA = styled.a`
  height: 72px;
  width: 100%;
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
  margin-right: 100px;
`;

const StyledContextContent = styled(ContextContent)`
  min-width: 150px;
  background-color: white;
  border-radius: 6px;
  overflow: hidden;
  padding: 5px;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`;

const StyledContextButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledContextItem = styled(ContextItem)`
  line-height: 1;
  color: black;
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 20px;
  position: relative;
  padding-left: 10px;
  font-size: 12px;
  user-select: none;
  outline: none;
  background-color: transparent;
  box-shadow: ${(props) => props.theme.mdShadow};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
