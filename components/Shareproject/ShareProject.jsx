import { firestore } from '../../utils/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function ShareProject() {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

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
  };
  console.log('users in outside UE', searchResult);

  return (
    <div>
      <form onSubmit={getUsers}>
        <label id='friend'>Find your friend</label>
        <input
          minLength='1'
          maxLength='50'
          onChange={(e) => setSearchText(e.target.value)}
          type='email'
          placeholder='Enter email'
          id='friend'
          required
        ></input>
      </form>
      <button onClick={getUsers}>Search</button>
      {searchResult &&
        searchResult.map((user) => {
          return <p key={user.uid}>{user.email}</p>;
        })}
    </div>
  );
}
