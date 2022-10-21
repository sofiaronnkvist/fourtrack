import React, { useCallback, useEffect, useState } from 'react';
import Recorder from '../components/Recorder/Recorder';
import { useAuth } from '../context/AuthContext';
import { getFileFromStorage } from '../utils/getFileFromStorage';

const Dashboard = () => {
  const { user } = useAuth();
  const [testArray, setTestArray] = useState([]);
  const [playId, setPlayId] = useState();

  useEffect(() => {
    getFileFromStorage(user.uid).then((res) => setTestArray(res));
  }, []);

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
    console.log(`event.target: ${event.target.value}`);
    if (playId == event.target.value) {
      console.log('in if');
      setPlayId('');
      return;
    }
    setPlayId(event.target.value);
    console.log(`play id after if: ${playId}`);
  };
  console.log(`PlayId outside func: ${playId}`);
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

      <h3>Recorders</h3>
      <form>
        <input onChange={handleChange} type='checkbox' value='1'></input>
        <input onChange={handleChange} type='checkbox' value='2'></input>
      </form>
      <Recorder id={1}></Recorder>
      <Recorder id={2}></Recorder>
      <Recorder id={3}></Recorder>
      <Recorder id={4}></Recorder>
    </div>
  );
};

export default Dashboard;
