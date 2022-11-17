import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../../utils/firebase';
import styled, { ThemeConsumer } from 'styled-components';
import ProjectCard from '../../../components/ProjectCard/ProjectCard';
import LeftSideNavigation from '../../../components/LeftSideNavigation/LeftSideNavigation';
import TopBar from '../../../components/TopBar/TopBar';
import { verifyIdToken } from '../../../utils/firebaseAdmin';
import nookies from 'nookies';
import SongsInCollectionModal from '../../../components/Modals/SongsInCollectionModal/SongsInCollectionModal';
import NoProjects from '../../../components/NoProjects/NoProjects';

export default function Project({ slug, collections, projects, allProjects }) {
  return (
    <MainWrapper>
      <LeftSideNavigation collections={collections} />
      <MainContent>
        <TopBar></TopBar>
        <HeaderContent>
          <HeaderTexts>
            <StyledCollectionText>Collection</StyledCollectionText>
            <StyledCollectionTitle>{slug}</StyledCollectionTitle>
          </HeaderTexts>
          <SongsInCollectionModal
            allProjects={allProjects}
            slug={slug}
            projects={projects}
          />
        </HeaderContent>
        {projects[0].length >= 1 ? (
          <>
            <ProjectHeadlines>
              <HedlineItem>title </HedlineItem>
              <HedlineItem style={{ marginLeft: '312px' }}>date </HedlineItem>
              <HedlineItem style={{ marginLeft: '137px' }}>bpm </HedlineItem>
              <HedlineItem style={{ marginLeft: '105px' }}>lenght </HedlineItem>
            </ProjectHeadlines>
            <StyledUlList>
              {projects &&
                projects[0].map((project) => {
                  return (
                    <ProjectCard
                      ownerId={project.uid}
                      key={project.title}
                      id={project.id}
                      title={project.title}
                      date={project.timestamp}
                      favorite={project.favorite}
                    ></ProjectCard>
                  );
                })}
            </StyledUlList>
          </>
        ) : (
          <NoProjects
            heading={'Oh no, no tracks here. Choose some for your collection!'}
          />
        )}
      </MainContent>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 237px auto;
`;
const MainContent = styled.div``;
const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 100%;
  padding-top: 20px;
  p {
    padding: 0;
    margin: 0;
  }
`;
const HeaderTexts = styled.div``;
const StyledUlList = styled.ul`
  margin: 0;
  padding: 0;
`;
const ProjectHeadlines = styled.div`
  display: flex;
  margin: 0px 27px;
`;
const HedlineItem = styled.p`
  color: ${(props) => props.theme.black50};
  font-size: 12px;
`;
const StyledCollectionText = styled.p`
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.black200};
  font-size: 14px;
`;
const StyledCollectionTitle = styled.h1`
  margin: 0 0 21.44px 0;
  padding: 10px 0 0 0;
`;

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;

  const cookies = nookies.get(ctx);
  const token = await verifyIdToken(cookies.token);
  const { uid } = token;
  let collections = [];
  let projects = [];
  let allProjects = [];

  const collectionsRef = collection(firestore, 'collections');
  const collectionsQuery = query(
    collectionsRef,
    where('uid', '==', uid),
    orderBy('title')
  );
  await getDocs(collectionsQuery).then((data) => {
    collections.push(
      data.docs.map((item) => {
        return {
          ...item.data(),
          id: item.id,
        };
      })
    );
  });

  const projectsRef = collection(firestore, 'projects');
  const projectsQuery = query(
    projectsRef,
    where('collections', '==', slug),
    where('uid', '==', uid),
    orderBy('timestamp', 'desc')
  );
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  await getDocs(projectsQuery).then((data) => {
    projects.push(
      data.docs.map((item) => {
        return {
          ...item.data(),
          id: item.id,
          timestamp: item
            .data()
            .timestamp.toDate()
            .toLocaleDateString(undefined, options),
        };
      })
    );
  });

  const allProjectsRef = collection(firestore, 'projects');
  const allProjectsQuery = query(
    allProjectsRef,
    where('uid', '==', uid),
    where('collections', '==', ''),
    orderBy('title')
  );
  await getDocs(allProjectsQuery).then((data) => {
    allProjects.push(
      data.docs.map((item) => {
        return {
          ...item.data(),
          id: item.id,
          timestamp: item
            .data()
            .timestamp.toDate()
            .toLocaleDateString(undefined, options),
        };
      })
    );
  });

  return { props: { slug, collections, projects, allProjects } };
}
