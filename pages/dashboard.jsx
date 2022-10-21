import React from 'react';
import Recorder from '../components/Recorder/Recorder';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase';

const addUser = async () => {
  const usersCollectionRef = collection(firestore, 'users');
  const querySnapshot = await getDocs(usersCollectionRef);
  querySnapshot.forEach((doc) => {
    console.log('LOOK HERE', `${doc.id} => ${doc.data()}`);
  });
};

const Dashboard = () => {
  const { user } = useAuth();

  console.log(user);
  return (
    <div>
      <p>This route is protected</p>
      <p> Well hello {user.email}!</p>
      <Recorder id={1}></Recorder>
      <Recorder id={2}></Recorder>
      <button onClick={addUser}>Click here to add user</button>
    </div>
  );
};

export default Dashboard;
