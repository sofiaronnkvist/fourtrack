import { firestore } from '../../utils/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  setDoc,
  arrayUnion,
  updateDoc,
} from 'firebase/firestore';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function ShareProject(props) {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const shareButton = async (e, projectId) => {
    e.preventDefault();
    try {
      const usersArray = await getUsers();
      if (usersArray.length == 1) {
        const uid = usersArray[0].uid;
        const projectRef = doc(firestore, 'projects', projectId);
        await updateDoc(projectRef, {
          colab_uid: arrayUnion(uid),
        });
        setFormMessage(`Successfully shared with ${usersArray[0].email}!`);
      } else {
        setFormMessage('This user does not seem to have Fourtrack, yet...');
      }
    } catch (error) {
      alert(error);
    }
  };

  const getUsers = async () => {
    let array = [];
    const q = query(
      collection(firestore, 'users'),
      where('email', '==', searchText)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });
    setSearchResult(array);
    return array;
  };

  return (
    <div>
      <form onSubmit={(e) => shareButton(e, props.projectId)}>
        <label hidden id='friend'>
          Search field
        </label>
        <input
          minLength='1'
          maxLength='50'
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type='email'
          placeholder='Enter email'
          id='friend'
          required
        ></input>
        <button type='submit'>Share</button>
      </form>
      <p>{formMessage}</p>
    </div>
  );
}
