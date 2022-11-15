import React, { useEffect, useRef, useState } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import styled from 'styled-components';
import { verifyIdToken } from '../../utils/firebaseAdmin';
import nookies from 'nookies';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import LeftSideNavigation from '../../components/LeftSideNavigation/LeftSideNavigation';
import TopBar from '../../components/TopBar/TopBar';

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = await verifyIdToken(cookies.token);

  const { uid } = token;
  let projects = [];
  let collections = [];

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
          timestamp: item.data().timestamp.toDate().toLocaleDateString(),
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

const checkFavorites = (projects) => {
  if (projects[0].length >= 1) {
    return true;
  }
};

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
                <HedlineItem style={{ marginLeft: '305px' }}>date </HedlineItem>
                <HedlineItem style={{ marginLeft: '130px' }}>bpm </HedlineItem>
                <HedlineItem style={{ marginLeft: '100px' }}>
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
                      ></ProjectCard>
                    );
                  })}
              </StyledUlList>
            </>
          ) : (
            <NoProjectsMainWrapper>
              <NoProjectsHeadline>
                Oh no, no tracks here. Mark some as favorites!
              </NoProjectsHeadline>
            </NoProjectsMainWrapper>
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
const NoProjectsMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
`;
const NoProjectsHeadline = styled.h2`
  color: ${(props) => props.theme.purple500};
  font-weight: 400;
  width: 400px;
`;

export default Favorites;
