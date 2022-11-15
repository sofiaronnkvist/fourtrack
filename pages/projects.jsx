import React, { useEffect, useRef, useState } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  where,
} from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import styled from 'styled-components';
import { verifyIdToken } from '../utils/firebaseAdmin';
import nookies from 'nookies';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import LeftSideNavigation from '../components/LeftSideNavigation/LeftSideNavigation';
import TopBar from '../components/TopBar/TopBar';
import LatestProjectCard from '../components/LatestProjectsCard/LatestProjectCard';

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = await verifyIdToken(cookies.token);
  const { uid } = token;
  let projects = [];
  let latestProjects = [];
  let collections = [];

  const ref = collection(firestore, 'projects');
  const projectsQuery = query(
    ref,
    where('uid', '==', uid),
    orderBy('timestamp', 'desc')
  );

  const latestProjectsQuery = query(
    ref,
    where('uid', '==', uid),
    orderBy('timestamp', 'desc'),
    limit(5)
  );
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const getProjects = async (projectsQuery, array) => {
    await getDocs(projectsQuery).then((data) => {
      array.push(
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
  };

  getProjects(projectsQuery, projects);
  getProjects(latestProjectsQuery, latestProjects);

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
    props: { projects, collections, latestProjects },
  };
}
const Projects = ({ projects, collections, latestProjects }) => {
  return (
    <>
      <MainWrapper>
        <LeftSideNavigation collections={collections} />
        <MainContent>
          <TopBar projectsToDelete={projects}></TopBar>
          {projects[0].length >= 1 ? (
            <>
              <h1>All recordings</h1>
              <StyledUlList>
                <LatestProjectsWrapper>
                  {latestProjects &&
                    latestProjects[0].map((latestProject) => {
                      return (
                        <LatestProjectCard
                          ownerId={latestProject.uid}
                          key={latestProject.title}
                          id={latestProject.id}
                          title={latestProject.title}
                          date={latestProject.timestamp}
                        ></LatestProjectCard>
                      );
                    })}
                </LatestProjectsWrapper>
              </StyledUlList>
              <ProjectHeadlines>
                <HedlineItem>title </HedlineItem>
                <HedlineItem style={{ marginLeft: '312px' }}>date </HedlineItem>
                <HedlineItem style={{ marginLeft: '137px' }}>bpm </HedlineItem>
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
              </StyledUlList>{' '}
            </>
          ) : (
            <NoProjectsMainWrapper>
              <NoProjectsHeadline>
                Oh no, no tracks here. Just press the create recording button to
                get started.
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

const LatestProjectsWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;
`;
const ProjectHeadlines = styled.div`
  display: flex;
  margin: 0px 27px;
`;
const HedlineItem = styled.p`
  color: ${(props) => props.theme.black50};
  font-size: 12px;
`;
const Label = styled.label`
  color: black;
  display: flex;
  margin: 20px;
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
const StyledUlList = styled.ul`
  margin: 0;
  padding: 0;
`;

export default Projects;
