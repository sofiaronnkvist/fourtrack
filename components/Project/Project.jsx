import { firestore } from '../../utils/firebase';
import { collection, addDoc, getDocs, Timestamp } from 'firebase/firestore';
import { useState } from 'react';

const createProject = async (person, data) => {
  try {
    const projectsCollectionRef = collection(firestore, 'projects');
    // const date = new Date;
    await addDoc(projectsCollectionRef, {
      uid: person.uid,
      title: data.title,
      // createdAt: Timestamp.now(),
    });
    readProjects();
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

const readProjects = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'projects'));
  querySnapshot.forEach((doc) => {
    console.log('Look here at the projects', `${doc.id} => ${doc.data()}`);
  });
};

export default function Project({ user }) {
  const [project, setProject] = useState({ title: '' });

  return (
    <div>
      <form>
        <label>Project title</label>
        <input
          value={project.title}
          onChange={(e) =>
            setProject({
              ...project,
              title: e.target.value,
            })
          }
          type='text'
          placeholder='My new song'
          required
        ></input>
      </form>
      <button onClick={() => createProject(user, project)}>
        Create new project
      </button>
    </div>
  );
}
