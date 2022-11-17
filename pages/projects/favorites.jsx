import React from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import styled from 'styled-components';
import { verifyIdToken } from '../../utils/firebaseAdmin';
import nookies from 'nookies';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import LeftSideNavigation from '../../components/LeftSideNavigation/LeftSideNavigation';
import TopBar from '../../components/TopBar/TopBar';
import NoProjects from '../../components/NoProjects/NoProjects';

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = await verifyIdToken(cookies.token);

  const { uid } = token;
  let projects = [];
  let collections = [];

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const ref = collection(firestore, 'projects');
  const projectsQuery = query(
    ref,
    where('uid', '==', uid),
    where('favorite', '==', true),
    orderBy('timestamp', 'desc')
  );
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

  return {
    props: { projects, collections },
  };
}

const Favorites = ({ projects, collections }) => {
  return (
    <>
      <MainWrapper>
        <LeftSideNavigation collections={collections} />
        <MainContent>
          <TopBar></TopBar>
          <h1>Favorites</h1>
          {projects[0].length >= 1 ? (
            <>
              <ProjectHeadlines>
                <HedlineItem>title </HedlineItem>
                <HedlineItem style={{ marginLeft: '312px' }}>date </HedlineItem>
                <HedlineItem style={{ marginLeft: '137px' }}>bpm </HedlineItem>
                <HedlineItem style={{ marginLeft: '105px' }}>
                  lenght{' '}
                </HedlineItem>
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
                        collection={project.collections}
                      ></ProjectCard>
                    );
                  })}
              </StyledUlList>
            </>
          ) : (
            <NoProjects
              heading={'Oh no, no tracks here. Mark some as favorites!'}
            />
          )}
        </MainContent>
      </MainWrapper>
    </>
  );
};
const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 237px auto;
`;
const MainContent = styled.div``;
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

export default Favorites;
