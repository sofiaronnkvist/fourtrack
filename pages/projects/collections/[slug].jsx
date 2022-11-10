import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from '../../../utils/firebase';
import styled, { ThemeConsumer } from 'styled-components';
import ProjectCard from '../../../components/ProjectCard/ProjectCard';
import LeftSideNavigation from '../../../components/LeftSideNavigation/LeftSideNavigation';
import TopBar from '../../../components/TopBar/TopBar';
import { verifyIdToken } from '../../../utils/firebaseAdmin';
import nookies from 'nookies';

export default function Project({ slug, collections, projects }) {
  return (
    <MainWrapper>
      <LeftSideNavigation collections={collections} />
      <MainContent>
        <TopBar></TopBar>
        <p>Collections</p>
        <h1>{slug}</h1>
        <ul>
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
        </ul>
      </MainContent>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 237px auto;
`;
const MainContent = styled.div``;

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;

  const cookies = nookies.get(ctx);
  const token = await verifyIdToken(cookies.token);
  const { uid } = token;
  let collections = [];
  let projects = [];

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
    where('collections', 'array-contains', slug),
    where('uid', '==', uid),
    orderBy('timestamp', 'desc')
  );
  await getDocs(projectsQuery).then((data) => {
    projects.push(
      data.docs.map((item) => {
        return {
          ...item.data(),
          id: item.id,
          timestamp: item.data().timestamp.toDate().toLocaleDateString(),
        };
      })
    );
  });

  return { props: { slug, collections, projects } };
}
