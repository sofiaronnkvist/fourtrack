import React, { useEffect, useRef, useState } from 'react';
import Recorder from '../components/Recorder/Recorder';
import { useAuth } from '../context/AuthContext';
import { getFileFromStorage } from '../utils/getFileFromStorage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import Project from '../components/Project/Project';
// import AudioVisualizer from '../components/AudioVisualizer/audiovisualizer';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

const AudioVisualizer = dynamic(
  () => import('../components/AudioVisualizer/audiovisualizer'),
  {
    ssr: false,
  }
);

const readUsers = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'users'));
  querySnapshot.forEach((doc) => {
    console.log('Look here at the users', `${doc.id} => ${doc.data()}`);
  });
};

const Dashboard = () => {
  const { user } = useAuth();
  const [trackArray, setTrackArray] = useState([]);
  const [playId, setPlayId] = useState();
  const [projects, setProjects] = useState([]);
  const [childTrack, setChildTrack] = useState(1);
  const [isPlaying, SetIsPlaying] = useState(false);

  let ref1 = useRef(null);
  let ref2 = useRef(null);
  let ref3 = useRef(null);
  let ref4 = useRef(null);
  let waveRef = useRef(null);

  const getProjects = () => {
    const ref = collection(firestore, 'projects');
    const projectsQuery = query(ref, where('uid', '==', user.uid));
    getDocs(projectsQuery).then((data) => {
      setProjects(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  // TODO: Can this be put in a getServerSideProps instead?
  useEffect(() => {
    const thedata = getProjects();
  }, []);

  useEffect(() => {
    getFileFromStorage(user.uid).then((res) => setTrackArray(res));
  }, [childTrack]);

  const player1 = new Audio(trackArray[0]);
  const player2 = new Audio(trackArray[1]);
  const player3 = new Audio(trackArray[2]);
  const player4 = new Audio(trackArray[3]);

  const playChecked = (id) => {
    if (id == 1) {
      player1.play();
      // SetIsPlaying(true);
      // waveRef.current.playPauseWave2();
      return;
    } else if (id == 2) {
      player2.play();
      // SetIsPlaying(true);
      return;
    } else if (id == 3) {
      console.log('playing 3');
      player3.play();
      // SetIsPlaying(true);
      return;
    } else if (id == 4) {
      console.log('playing 4');

      player4.play();
      // SetIsPlaying(true);
      return;
    } else {
      console.log('playing all');
      player1.play();
      player2.play();
      player3.play();
      player4.play();
      SetIsPlaying(true);
    }
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    if (playId == event.target.value) {
      setPlayId('');
    } else {
      setPlayId(event.target.value);
    }
  };

  const record = (recId) => {
    if (recId == 1) {
      console.log('recId 1');
      player2.play();
      player3.play();
      player4.play();
      ref1.current.start1();
      return;
    } else if (recId == 2) {
      console.log('recId 2');
      player1.play();
      player3.play();
      player4.play();
      ref2.current.start2();
      return;
    } else if (recId == 3) {
      console.log('recId 3');
      player1.play();
      player2.play();
      player4.play();
      ref3.current.start3();
      return;
    } else if (recId == 4) {
      console.log('recId 4');
      player1.play();
      player2.play();
      player3.play();
      ref4.current.start4();
      return;
    }
  };

  const stop = (recId) => {
    if (recId == 1) {
      player2.pause();
      player3.pause();
      player4.pause();
      ref1.current.stop1();
      setChildTrack((prev) => prev + 1);
      // SetIsPlaying(false);
      //NOT WORKING
      // waveRef.current.playPauseWave();
      window.location.reload(false);
      return;
    } else if (recId == 2) {
      player1.pause();
      player3.pause();
      player4.pause();
      ref2.current.stop2();
      setChildTrack((prev) => prev + 1);
      // SetIsPlaying(false);
      window.location.reload(false);
      return;
    } else if (recId == 3) {
      player1.pause();
      player2.pause();
      player4.pause();
      ref3.current.stop3();
      setChildTrack((prev) => prev + 1);
      // SetIsPlaying(false);
      window.location.reload(false);
      return;
    } else if (recId == 4) {
      console.log('recId 4');
      player1.pause();
      player2.pause();
      player3.pause();
      ref4.current.stop4();
      setChildTrack((prev) => prev + 1);
      // SetIsPlaying(false);
      window.location.reload(false);
      return;
    } else {
      console.log('stop all');
      player1.pause();
      player2.pause();
      player3.pause();
      player4.pause();
      // SetIsPlaying(false);
    }
  };

  return (
    <div>
      <p>This route is protected</p>
      <h1> Well hello {user.email}!</h1>

      <h3>Recorders</h3>
      <Form>
        <Label htmlFor=''>
          <input
            checked={playId === '1'}
            onChange={handleChange}
            type='checkbox'
            value='1'
            name='playId'
          ></input>{' '}
          <RecorderBlock color='lightsalmon'>Track One</RecorderBlock>
          <Recorder id={1} ref={ref1}></Recorder>
        </Label>
        <Label htmlFor=''>
          <input
            checked={playId === '2'}
            onChange={handleChange}
            type='checkbox'
            value='2'
            name='playId'
          ></input>
          <RecorderBlock color='lightyellow'>Track Two</RecorderBlock>

          <Recorder id={2} ref={ref2}></Recorder>
        </Label>
        <Label htmlFor=''>
          <input
            checked={playId === '3'}
            onChange={handleChange}
            type='checkbox'
            value='3'
            name='playId'
          ></input>
          <RecorderBlock color='lightcoral'>Track Three</RecorderBlock>

          <Recorder id={3} ref={ref3}></Recorder>
        </Label>
        <Label htmlFor=''>
          <input
            checked={playId === '4'}
            onChange={handleChange}
            type='checkbox'
            value='4'
            name='playId'
          ></input>
          <RecorderBlock color='aliceblue'>Track Four</RecorderBlock>

          <Recorder id={4} ref={ref4}></Recorder>
        </Label>
      </Form>
      <button onClick={() => stop(playId)}>STOP</button>
      <button onClick={() => playChecked(playId)}>PLAY</button>
      <button onClick={() => record(playId)}>REC</button>
      <p>To play all tracks at once, uncheck all tracks and press play.</p>
      <h4>Stuff bellow not working:</h4>
      <Project user={user} />
      <h3>My projects</h3>
      <ul>
        {projects &&
          projects.map((project) => {
            return <li key={project.title}>{project.title}</li>;
          })}
      </ul>
      <button onClick={readUsers}>Click here to see users</button>
      {/* <h3>The audio visulaizer not quite working</h3> */}
      {/* {trackArray[0] ? (
        <AudioVisualizer
          src={trackArray[0]}
          // playingTest={isPlaying}
        ></AudioVisualizer>
      ) : (
        <div></div>
      )}
      {trackArray[1] ? (
        <AudioVisualizer
          src={trackArray[1]}
          // playingTest={isPlaying}
        ></AudioVisualizer>
      ) : (
        <div></div>
      )}
      {trackArray[2] ? (
        <AudioVisualizer
          src={trackArray[2]}
          // playingTest={isPlaying}
        ></AudioVisualizer>
      ) : (
        <div></div>
      )}
      {trackArray[3] ? (
        <AudioVisualizer
          src={trackArray[3]}
          // playingTest={isPlaying}
        ></AudioVisualizer>
      ) : (
        <div></div>
      )} */}
    </div>
  );
};

const Label = styled.label`
  color: black;
  display: flex;
  margin: 20px;
`;
const Form = styled.form`
  margin-top: 20px;
`;
const RecorderBlock = styled.div`
  height: 50px;
  width: 515px;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;

export default Dashboard;
