import React, { useEffect, useRef, useState } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import styled from 'styled-components';
import { verifyIdToken } from '../utils/firebaseAdmin';
import nookies from 'nookies';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import LeftSideNavigation from '../components/LeftSideNavigation/LeftSideNavigation';
import TopBar from '../components/TopBar/TopBar';

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

const Projects = ({ projects, collections }) => {
  return (
    <MainWrapper>
      <LeftSideNavigation collections={collections} />
      <MainContent>
        <TopBar></TopBar>
        <h1>All recordings</h1>
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
};
const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: 237px auto;
`;
const MainContent = styled.div``;

const Label = styled.label`
  color: black;
  display: flex;
  margin: 20px;
`;

export default Projects;
