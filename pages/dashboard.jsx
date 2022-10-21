import React, { useCallback, useEffect, useState } from 'react';
import Recorder from '../components/Recorder/Recorder';
import { useAuth } from '../context/AuthContext';
import { getFileFromStorage } from '../utils/getFileFromStorage';
import ReactHowler from 'react-howler';
import ReactAudioPlayer from 'react-audio-player';

const Dashboard = () => {
  const { user } = useAuth();
  const [testArray, setTestArray] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [preload, setPreload] = useState(false);
  const [audio, setAudio] = useState('example.mp3');

  useEffect(() => {
    getFileFromStorage(user.uid).then((res) => setTestArray(res));
  }, []);

  const play = () => {
    setPlaying(true);
  };

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

  return (
    <div>
      <p>This route is protected</p>
      <p> Well hello {user.email}!</p>
      <audio src={testArray[0]}></audio>

      <button onClick={() => player1.play()}>Play</button>
      <button onClick={() => player1.pause()}>Stop</button>
      <button onClick={() => player2.play()}>Play2</button>
      <button onClick={() => player2.pause()}>Stop2</button>
      <button onClick={() => player3.play()}>Play3</button>
      <button onClick={() => player3.pause()}>Stop3</button>
      <button onClick={() => player4.play()}>Play4</button>
      <button onClick={() => player4.pause()}>Stop4</button>
      <button onClick={() => playAll()}>play all</button>

      <h3>Recorders</h3>
      <Recorder id={1}></Recorder>
      <Recorder id={2}></Recorder>
      <Recorder id={3}></Recorder>
      <Recorder id={4}></Recorder>
    </div>
  );
};

export default Dashboard;
