import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { firestore } from '../../utils/firebase';
import React, { useEffect, useRef, useState } from 'react';
import Recorder from '../../components/Recorder/Recorder';
import { getFileFromStorage } from '../../utils/getFileFromStorage';
import styled from 'styled-components';
import { deleteFileFromStorage } from '../../utils/deleteFileFromStorage';
import Button from '../../components/Button/Button';
import { async } from '@firebase/util';

export default function Project({ res }) {
  const { user } = useAuth();
  const [trackArray, setTrackArray] = useState([]);
  const [playId, setPlayId] = useState();
  const [childTrack, setChildTrack] = useState(1);
  const [isPlaying, SetIsPlaying] = useState(false);

  let ref1 = useRef(null);
  let ref2 = useRef(null);
  let ref3 = useRef(null);
  let ref4 = useRef(null);

  useEffect(() => {
    // Waiting for index.js to send file to FB
    setTimeout(function () {
      getFileFromStorage(user.uid, res.id).then((res) => setTrackArray(res));
      // console.log('use effect k;rs');
    }, 500);
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
      // window.location.reload(false);
      return;
    } else if (recId == 2) {
      player1.pause();
      player3.pause();
      player4.pause();
      ref2.current.stop2();
      setChildTrack((prev) => prev + 1);
      // SetIsPlaying(false);
      // window.location.reload(false);
      return;
    } else if (recId == 3) {
      player1.pause();
      player2.pause();
      player4.pause();
      ref3.current.stop3();
      setChildTrack((prev) => prev + 1);
      // SetIsPlaying(false);
      // window.location.reload(false);
      return;
    } else if (recId == 4) {
      console.log('recId 4');
      player1.pause();
      player2.pause();
      player3.pause();
      ref4.current.stop4();
      setChildTrack((prev) => prev + 1);
      // SetIsPlaying(false);
      // window.location.reload(false);
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

  const deleteTrack = async (userId, projectId, trackNo, arrayIndex) => {
    console.log('klick ok');
    await deleteFileFromStorage(userId, projectId, trackNo);
    // setChildTrack((prev) => prev + 1);
  };

  return (
    <div>
      <p>This route is protected</p>
      <h1>{res.title}</h1>
      <p>id: {res.id}</p>

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
          <RecorderBlock color='lightsalmon'>
            Track One
            <Button
              handleclick={() => deleteTrack(user.uid, res.id, 1, 0)}
              text={'X'}
            ></Button>
          </RecorderBlock>
          <Recorder id={1} projectid={res.id} ref={ref1}></Recorder>
        </Label>
        <Label htmlFor=''>
          <input
            checked={playId === '2'}
            onChange={handleChange}
            type='checkbox'
            value='2'
            name='playId'
          ></input>
          <RecorderBlock color='lightyellow'>
            Track Two
            <Button
              handleclick={() => deleteTrack(user.uid, res.id, 2, 1)}
              text={'X'}
            ></Button>
          </RecorderBlock>

          <Recorder id={2} projectid={res.id} ref={ref2}></Recorder>
        </Label>
        <Label htmlFor=''>
          <input
            checked={playId === '3'}
            onChange={handleChange}
            type='checkbox'
            value='3'
            name='playId'
          ></input>
          <RecorderBlock color='lightcoral'>
            Track Three
            <Button
              handleclick={() => deleteTrack(user.uid, res.id, 3, 2)}
              text={'X'}
            ></Button>
          </RecorderBlock>

          <Recorder id={3} projectid={res.id} ref={ref3}></Recorder>
        </Label>
        <Label htmlFor=''>
          <input
            checked={playId === '4'}
            onChange={handleChange}
            type='checkbox'
            value='4'
            name='playId'
          ></input>
          <RecorderBlock color='aliceblue'>
            Track Four
            <Button
              handleclick={() => deleteTrack(user.uid, res.id, 4, 3)}
              text={'X'}
            ></Button>
          </RecorderBlock>

          <Recorder id={4} projectid={res.id} ref={ref4}></Recorder>
        </Label>
      </Form>
      <button onClick={() => stop(playId)}>STOP</button>
      <button onClick={() => playChecked(playId)}>PLAY</button>
      <button onClick={() => record(playId)}>REC</button>
      <p>To play all tracks at once, uncheck all tracks and press play.</p>

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
}

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
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;

export async function getServerSideProps(ctx) {
  const slug = ctx.query.slug;
  let res;
  const ref = collection(firestore, 'projects');
  const projectsQuery = query(ref, where('title', '==', slug));
  const querySnapshot = await getDocs(projectsQuery);
  querySnapshot.forEach((doc) => {
    res = { id: doc.id, ...doc.data() };
  });
  return { props: { res } };
}
