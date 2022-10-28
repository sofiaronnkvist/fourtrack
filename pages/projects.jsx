import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import Project from '../components/Project/Project';
import styled from 'styled-components';
import Link from 'next/link';
import { verifyIdToken } from '../utils/firebaseAdmin';
import nookies from 'nookies';

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const token = await verifyIdToken(cookies.token);

  const { uid } = token;
  let projects = [];

  const ref = collection(firestore, 'projects');
  const projectsQuery = query(ref, where('uid', '==', uid));
  await getDocs(projectsQuery).then((data) => {
    projects.push(
      data.docs.map((item) => {
        return { ...item.data(), id: item.id };
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
    <div>
      <h1> Well hello {user.email}!</h1>
      <h1> {user.uid}!</h1>

      <Project user={user} />
      <h3>My projects</h3>
      <ul>
        {projects &&
          projects[0].map((project) => {
            return (
              <>
                <Link
                  href={{
                    pathname: '/projects/[slug]',
                    query: { slug: project.title },
                  }}
                  key={project.title}
                >
                  <a>{project.title}</a>
                </Link>

                <p>project Id: {project.id}</p>
              </>
            );
          })}
      </ul>
    </div>
  );
};

const Label = styled.label`
  color: black;
  display: flex;
  margin: 20px;
`;

export default Projects;