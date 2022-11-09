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
import Project from '../../components/Project/Project';
import styled from 'styled-components';
import Link from 'next/link';
import { verifyIdToken } from '../../utils/firebaseAdmin';
import nookies from 'nookies';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import LeftSideNavigation from '../../components/LeftSideNavigation/LeftSideNavigation';
import TopBar from '../../components/TopBar/TopBar';
import ShareProject from '../../components/Shareproject/ShareProject';

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = await verifyIdToken(cookies.token);

  const { uid } = token;
  let colabProjects = [];

  const ref = collection(firestore, 'projects');
  const colabQuery = query(
    ref,
    where('colab_uid', 'array-contains-any', [uid]),
    orderBy('timestamp', 'desc')
  );
  await getDocs(colabQuery).then((data) => {
    colabProjects.push(
      data.docs.map((item) => {
        return {
          ...item.data(),
          id: item.id,
          timestamp: item.data().timestamp.toDate().toLocaleDateString(),
        };
      })
    );
  });
  return {
    props: { colabProjects },
  };
}

const checkColabs = (projects) => {
  if (projects[0].length >= 1) {
    return true;
  }
};

const Favorites = ({ colabProjects }) => {
  return (
    <MainWrapper>
      <LeftSideNavigation></LeftSideNavigation>
      <MainContent>
        <TopBar></TopBar>
        <h1>Favorites</h1>
        <ul>
          {checkColabs(colabProjects) ? (
            colabProjects &&
            colabProjects[0].map((project) => {
              return (
                <ProjectCard
                  ownerId={project.uid}
                  key={project.title}
                  id={project.id}
                  title={project.title}
                  date={project.timestamp}
                ></ProjectCard>
              );
            })
          ) : (
            <p>Nothing here yet</p>
          )}
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

export default Favorites;
