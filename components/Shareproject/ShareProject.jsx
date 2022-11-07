import { firestore } from '../../utils/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function ShareProject() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    console.log('klick!!!');
    let array = [];
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    console.log(`snapshot ${querySnapshot}`);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      array.push(doc.data());
    });
    console.log(array);
    setUsers(array);
  };
  console.log(users);
  const createProject = async (e) => {
    console.log('yup');
    // e.preventDefault();
    // try {
    //   const projectsCollectionRef = collection(firestore, 'projects');
    //   await addDoc(projectsCollectionRef, {
    //     uid: user.uid,
    //     title: project.title,
    //     timestamp: serverTimestamp(),
    //   });
    //   setProject({ title: '' });
    //   router.push('/projects');
    // } catch (error) {
    //   console.log(error);
    //   alert(error);
    // }
  };

  return (
    <div>
      <form onSubmit={createProject}>
        <label>Project title</label>
        <select>
          {users &&
            users.map((user, key) => {
              return (
                <option key={key} value='volvo'>
                  {user.email}
                </option>
              );
            })}
          <option>hello</option>
        </select>
        {/* <input
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
          placeholder='Find your friend'
          required
        ></input> */}
        <button type='submit'>Send invite</button>
      </form>
      <button onClick={getUsers}>get users</button>
    </div>
  );
}
