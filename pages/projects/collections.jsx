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

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const ref = collection(firestore, 'projects');
  const projectsQuery = query(
    ref,
    where('uid', '==', uid),
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
  return {
    props: { projects },
  };
}

const Collections = ({ projects }) => {
  return (
    <MainWrapper>
      <LeftSideNavigation projectsRef={projects}></LeftSideNavigation>
      <MainContent>
        <TopBar></TopBar>
        <h1>Collections</h1>
        <ProjectHeadlines>
          <HedlineItem>title </HedlineItem>
          <HedlineItem style={{ marginLeft: '305px' }}>date </HedlineItem>
          <HedlineItem style={{ marginLeft: '130px' }}>bpm </HedlineItem>
          <HedlineItem style={{ marginLeft: '100px' }}>lenght </HedlineItem>
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
      </MainContent>
    </MainWrapper>
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

export default Collections;
