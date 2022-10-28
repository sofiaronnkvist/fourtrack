import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import Project from '../components/Project/Project';
import styled from 'styled-components';
import Link from 'next/link';

const readUsers = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'users'));
  querySnapshot.forEach((doc, key) => {
    console.log('Look here at the users', `${doc.id} => ${doc.data()}${key}`);
  });
};

const Projects = () => {
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
      <h1> Well hello {user.email}!</h1>
      <h1> {user.uid}!</h1>

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
      <button onClick={readUsers}>Click here to see users</button>
    </div>
  );
};

const Label = styled.label`
  color: black;
  display: flex;
  margin: 20px;
`;

export default Projects;
