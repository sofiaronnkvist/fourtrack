import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import Project from '../components/Project/Project';
import styled from 'styled-components';
import Link from 'next/link';
import { verifyIdToken } from '../utils/firebaseAdmin';
import nookies from 'nookies';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import LeftSideNavigation from '../components/LeftSideNavigation/LeftSideNavigation';

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = await verifyIdToken(cookies.token);

  const { uid } = token;
  let projects = [];

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
  return {
    props: { projects },
  };
}

const Projects = ({ projects }) => {
  const { user } = useAuth();
  console.log(projects);

  return (
    <MainWrapper>
      <LeftSideNavigation></LeftSideNavigation>
      <MainContent>
        <h1> Well hello {user.email}!</h1>
        <h1> {user.uid}!</h1>

        <Project />
        <h3>My projects</h3>
        <ul>
          {projects &&
            projects[0].map((project) => {
              return (
                <Link
                  href={{
                    pathname: '/projects/[slug]',
                    query: { slug: project.title },
                  }}
                  key={project.title}
                >
                  <a>
                    <ProjectCard
                      title={project.title}
                      date={project.timestamp}
                    ></ProjectCard>
                  </a>
                </Link>
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
