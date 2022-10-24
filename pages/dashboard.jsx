import React, { useEffect, useRef, useState } from 'react';
import Recorder from '../components/Recorder/Recorder';
import { useAuth } from '../context/AuthContext';
import { getFileFromStorage } from '../utils/getFileFromStorage';

import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import Project from '../components/Project/Project';

const readUsers = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'users'));
  querySnapshot.forEach((doc) => {
    console.log('Look here at the users', `${doc.id} => ${doc.data()}`);
  });
};
const readProjects = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'projects'));
  querySnapshot.forEach((doc) => {
    console.log('Look here at the projects', `${doc.id} => ${doc.data()}`);
  });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [testArray, setTestArray] = useState([]);
  const [playId, setPlayId] = useState();
  let ref1 = useRef(null);
  let ref2 = useRef(null);
  let ref3 = useRef(null);
  let ref4 = useRef(null);

  // useEffect(() => {
  //   getFileFromStorage(user.uid).then((res) => setTestArray(res));
  // }, []);

  const player1 = new Audio(testArray[0]);
  const player2 = new Audio(testArray[1]);
  const player3 = new Audio(testArray[2]);
  const player4 = new Audio(testArray[3]);

  const playAll = () => {
    player1.play();
    player2.play();
    player3.play();
    player4.play();
  };
  const playChecked = (id) => {
    if (id == 1) {
      player1.play();
      return;
    }
    if (id == 2) {
      player2.play();
      return;
    }
    if (id == 3) {
      player3.play();
      return;
    }
    if (id == 4) {
      player4.play();
      return;
    }
  };

  const handleChange = (event) => {
    if (playId == event.target.value) {
      setPlayId('');
    } else {
      setPlayId(event.target.value);
    }
  };

  const record = (recId) => {
    if (recId == 1) {
      console.log('recId 1');
      player2.play()
      player3.play()
      player4.play()
      ref1.current.start1();
    }
    if (recId == 2) {
      console.log('recId 2');
      player1.play()
      player3.play()
      player4.play()
      ref2.current.start2();
    }
    if (recId == 3) {
      console.log('recId 3');
      player1.play()
      player2.play()
      player4.play()
      ref3.current.start3();
    }
    if (recId == 4) {
      console.log('recId 4');
      player1.play()
      player2.play()
      player3.play()
      ref4.current.start4();
    }
  };

  return (
    <div>
      <p>This route is protected</p>
      <p> Well hello {user.email}!</p>

      <button onClick={() => player1.play()}>Play</button>
      <button onClick={() => player1.pause()}>Stop</button>
      <button onClick={() => player2.play()}>Play2</button>
      <button onClick={() => player2.pause()}>Stop2</button>
      <button onClick={() => player3.play()}>Play3</button>
      <button onClick={() => player3.pause()}>Stop3</button>
      <button onClick={() => player4.play()}>Play4</button>
      <button onClick={() => player4.pause()}>Stop4</button>
      <button onClick={() => playAll()}>play all</button>
      <button onClick={() => playChecked(playId)}>play checked</button>
      <button onClick={() => record(playId)}>Record</button>

      <h3>Recorders</h3>
      <form>
        <label htmlFor=''>track 1</label>
        <input onChange={handleChange} type='radio' value='1' name='playId'></input>
        <label htmlFor=''>track 2</label>
        <input onChange={handleChange} type='radio' value='2' name='playId'></input>
        <label htmlFor=''>track 3</label>
        <input onChange={handleChange} type='radio' value='3' name='playId'></input>
        <label htmlFor=''>track 4</label>
        <input onChange={handleChange} type='radio' value='4' name='playId'></input>
      </form>
      <Recorder id={1} ref={ref1}></Recorder>
      <Recorder id={2} ref={ref2}></Recorder>
      <Recorder id={3} ref={ref3}></Recorder>
      <Recorder id={4} ref={ref4}></Recorder>
      <Project user={user} />
      <button onClick={readUsers}>Click here to see users</button>
      <button onClick={readProjects}>Click here to see projects</button>
    </div>
  );
};

export default Dashboard;
