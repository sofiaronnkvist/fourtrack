import { firestore } from '../../utils/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function Project() {
  const [project, setProject] = useState({ title: '' });
  const { user } = useAuth();

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const projectsCollectionRef = collection(firestore, 'projects');
      await addDoc(projectsCollectionRef, {
        uid: user.uid,
        title: project.title,
      });
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={createProject}>
        <label>Project title</label>
        <input
          value={project.title}
          minLength='1'
          maxLength='30'
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
        <button type='submit'>Create new project</button>
      </form>
    </div>
  );
}
