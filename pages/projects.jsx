import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import Project from '../components/Project/Project';
import styled from 'styled-components';
import Link from 'next/link';

const AudioVisualizer = dynamic(
  () => import('../components/AudioVisualizer/audiovisualizer'),
  {
    ssr: false,
  }
);

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  const getProjects = () => {
    const ref = collection(firestore, 'projects');
    const projectsQuery = query(ref, where('uid', '==', user.uid));
    getDocs(projectsQuery).then((data) => {
      setProjects(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  // TODO: Can this be put in a getServerSideProps instead?
  useEffect(() => {
    const thedata = getProjects();
  }, []);

  return (
    <div>
      <p>This route is protected</p>
      <h1> Well hello {user.email}!</h1>
      <Project user={user} />
      <h3>My projects</h3>
      <ul>
        {projects &&
          projects.map((project, key) => {
            return (
              <>
                <Link href={`/projects/${project.title}`} key={project.title}>
                  {project.title}
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

export default Dashboard;
