import { firestore } from '../../utils/firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

export default function ShareProject() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let array = [];
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    console.log(`snapshot ${querySnapshot}`);
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, ' => ', doc.data());
      array.push(doc.data());
    });
    // console.log(array);
    setUsers(array);
  };

  console.log(`users outside fetch ${users}`);

  useEffect(() => {
    console.log(users);
    const searchResult = users.find((element) => element == 'sofia');
    console.log(`search result ${searchResult}`);
  }, [searchText]);

  return (
    <div>
      <form>
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
        <input
          minLength='1'
          maxLength='50'
          onChange={(e) => setSearchText(e.target.value)}
          type='text'
          placeholder='Find your friend'
          required
        ></input>
        <button type='submit'>Send invite</button>
      </form>
      {/* <button onClick={getUsers}>get users</button> */}
      {searchResult &&
        searchResult.map((user, key) => {
          return (
            <p key={key} value='volvo'>
              {user.email}
            </p>
          );
        })}
    </div>
  );
}
