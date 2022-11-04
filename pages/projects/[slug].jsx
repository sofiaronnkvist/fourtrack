import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { firestore } from '../../utils/firebase';
import React, { useEffect, useRef, useState } from 'react';
import Recorder from '../../components/Recorder/Recorder';
import { getFileFromStorage } from '../../utils/getFileFromStorage';
import styled, { ThemeConsumer } from 'styled-components';
import AudioVisualizer from '../../components/AudioVisualizer/audiovisualizer';
import { deleteFileFromStorage } from '../../utils/deleteFileFromStorage';
import DeleteButton from '../../components/Button/DeleteButton';
import { useRouter } from 'next/router';
import { async } from '@firebase/util';

export default function Project({ res }) {
  const { user } = useAuth();
  const [trackArray, setTrackArray] = useState([]);
  const [playId, setPlayId] = useState();
  const [childTrack, setChildTrack] = useState(1);
  const router = useRouter();

  let ref1 = useRef(null);
  let ref2 = useRef(null);
  let ref3 = useRef(null);
  let ref4 = useRef(null);
  let waveRef1 = useRef(null);
  let waveRef2 = useRef(null);
  let waveRef3 = useRef(null);
  let waveRef4 = useRef(null);

  useEffect(() => {
    // Waiting for index.js to send file to FB
    setTimeout(function () {
      getFileFromStorage(user.uid, res.id).then((res) => setTrackArray(res));
    }, 500);
  }, [childTrack]);

  const player1 = new Audio(trackArray[0]);
  const player2 = new Audio(trackArray[1]);
  const player3 = new Audio(trackArray[2]);
  const player4 = new Audio(trackArray[3]);

  const playChecked = (id) => {
    if (id == 1) {
      waveRef1.current ? waveRef1.current.play() : null;
      return;
    } else if (id == 2) {
      waveRef2.current ? waveRef2.current.play() : null;
      return;
    } else if (id == 3) {
      waveRef3.current ? waveRef3.current.play() : null;
      return;
    } else if (id == 4) {
      waveRef4.current ? waveRef4.current.play() : null;
      return;
    } else {
      console.log('playing all');
      waveRef1.current ? waveRef1.current.play() : null;
      waveRef2.current ? waveRef2.current.play() : null;
      waveRef3.current ? waveRef3.current.play() : null;
      waveRef4.current ? waveRef4.current.play() : null;
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
      waveRef2.current ? waveRef2.current.play() : null;
      waveRef3.current ? waveRef3.current.play() : null;
      waveRef4.current ? waveRef4.current.play() : null;
      ref1.current.start1();
      return;
    } else if (recId == 2) {
      console.log('recId 2');
      waveRef1.current ? waveRef1.current.play() : null;
      waveRef3.current ? waveRef3.current.play() : null;
      waveRef4.current ? waveRef4.current.play() : null;
      ref2.current.start2();
      return;
    } else if (recId == 3) {
      console.log('recId 3');
      waveRef1.current ? waveRef1.current.play() : null;
      waveRef2.current ? waveRef2.current.play() : null;
      waveRef4.current ? waveRef4.current.play() : null;
      ref3.current.start3();
      return;
    } else if (recId == 4) {
      console.log('recId 4');
      waveRef1.current ? waveRef1.current.play() : null;
      waveRef2.current ? waveRef2.current.play() : null;
      waveRef3.current ? waveRef3.current.play() : null;
      ref4.current.start4();
      return;
    }
  };

  const stop = (recId) => {
    if (recId == 1) {
      ref1.current.stop1();
      waveRef2.current ? waveRef2.current.pause() : null;
      waveRef3.current ? waveRef3.current.pause() : null;
      waveRef4.current ? waveRef4.current.pause() : null;
      setChildTrack((prev) => prev + 1);

      return;
    } else if (recId == 2) {
      ref2.current.stop2();
      waveRef1.current ? waveRef1.current.pause() : null;
      waveRef3.current ? waveRef3.current.pause() : null;
      waveRef4.current ? waveRef4.current.pause() : null;
      // window.location.reload(false);
      setChildTrack((prev) => prev + 1);

      return;
    } else if (recId == 3) {
      ref3.current.stop3();
      waveRef1.current ? waveRef1.current.pause() : null;
      waveRef2.current ? waveRef2.current.pause() : null;
      waveRef4.current ? waveRef4.current.pause() : null;
      setChildTrack((prev) => prev + 1);
      // window.location.reload(false);
      return;
    } else if (recId == 4) {
      ref4.current.stop4();
      waveRef1.current ? waveRef1.current.pause() : null;
      waveRef2.current ? waveRef2.current.pause() : null;
      waveRef3.current ? waveRef3.current.pause() : null;
      setChildTrack((prev) => prev + 1);
      // window.location.reload(false);

      //try if insted
      return;
    } else {
      console.log('stop all');
      waveRef1.current ? waveRef1.current.pause() : null;
      waveRef2.current ? waveRef2.current.pause() : null;
      waveRef3.current ? waveRef3.current.pause() : null;
      waveRef4.current ? waveRef4.current.pause() : null;
    }
  };

  const deleteTrack = async (userId, projectId, trackNo) => {
    await deleteFileFromStorage(userId, projectId, trackNo);
  };

  return (
    <div>
      <p>This route is protected</p>
      <button onClick={() => router.back()}>Back</button>
      <h1>{res.title}</h1>
      <p>id: {res.id}</p>

      <h3>Recorders</h3>
      {/* Loopa tracks och ref */}
      <Form>
        <Label htmlFor=''>
          <input
            checked={playId === '1'}
            onChange={handleChange}
            type='checkbox'
            value='1'
            name='playId'
          ></input>{' '}
          <Container>
            {trackArray[0] ? (
              <AudioVisualizer
                src={trackArray[0]}
                ref={waveRef1}
                id={1}
                projectId={res.id}
                background='#EBBA00'
                waveColor={'white'}
                progressColor={'hotpink'}
              ></AudioVisualizer>
            ) : (
              // <div></div>
              <NoAudioVisualizationContainer
                style={{ backgroundColor: '#EBBA00' }}
              ></NoAudioVisualizationContainer>
            )}
            <DeleteButton
              handleclick={() => deleteTrack(user.uid, res.id, 1)}
              text={'X'}
            ></DeleteButton>
          </Container>
          {/* <RecorderBlock></RecorderBlock> */}
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
          <div>
            {trackArray[1] ? (
              <AudioVisualizer
                src={trackArray[1]}
                ref={waveRef2}
                id={2}
                projectId={res.id}
                background='#EC8300'
                waveColor={'white'}
                progressColor={'hotpink'}
              ></AudioVisualizer>
            ) : (
              <NoAudioVisualizationContainer
                style={{ backgroundColor: '#EC8300' }}
              ></NoAudioVisualizationContainer>
            )}
            <DeleteButton
              handleclick={() => deleteTrack(user.uid, res.id, 2)}
              text={'X'}
            ></DeleteButton>
          </div>
          {/* <RecorderBlock></RecorderBlock> */}

          <Recorder id={2} projectid={res.id} ref={ref2}></Recorder>
        </Label>{' '}
        <Label htmlFor=''>
          <input
            checked={playId === '3'}
            onChange={handleChange}
            type='checkbox'
            value='3'
            name='playId'
          ></input>
          <div>
            {trackArray[2] ? (
              <AudioVisualizer
                src={trackArray[2]}
                ref={waveRef3}
                id={3}
                projectId={res.id}
                background='#69B6D3'
                waveColor={'white'}
                progressColor={'hotpink'}
              ></AudioVisualizer>
            ) : (
              <NoAudioVisualizationContainer
                style={{ backgroundColor: '#69B6D3' }}
              ></NoAudioVisualizationContainer>
            )}
            <DeleteButton
              handleclick={() => deleteTrack(user.uid, res.id, 3)}
              text={'X'}
            ></DeleteButton>
          </div>
          {/* <RecorderBlock></RecorderBlock> */}
          <Recorder id={3} projectid={res.id} ref={ref3}></Recorder>
        </Label>{' '}
        <Label htmlFor=''>
          <input
            checked={playId === '4'}
            onChange={handleChange}
            type='checkbox'
            value='4'
            name='playId'
          ></input>
          <div>
            {trackArray[3] ? (
              <AudioVisualizer
                src={trackArray[3]}
                ref={waveRef4}
                id={4}
                projectId={res.id}
                background='#69B6D3'
                waveColor={'white'}
                progressColor={'hotpink'}
              ></AudioVisualizer>
            ) : (
              <NoAudioVisualizationContainer
                style={{ backgroundColor: '#B4ABDC' }}
              ></NoAudioVisualizationContainer>
            )}
            <DeleteButton
              handleclick={() => deleteTrack(user.uid, res.id, 4)}
              text={'X'}
            ></DeleteButton>
          </div>
          {/* <RecorderBlock></RecorderBlock> */}

          <Recorder id={4} projectid={res.id} ref={ref4}></Recorder>
        </Label>{' '}
      </Form>
      <button onClick={() => stop(playId)}>STOP</button>
      <button onClick={() => playChecked(playId)}>PLAY</button>
      <button onClick={() => record(playId)}>REC</button>
      <p>To play all tracks at once, uncheck all tracks and press play.</p>
    </div>
  );
}

const Label = styled.label`
  position: relative;
  display: grid;
  grid-template-columns: 2% 95% 3%;
  align-items: center;
  margin-bottom: 10px;
`;
const Form = styled.form`
  margin-top: 20px;
  margin-bottom: 20px;
`;
const RecorderBlock = styled.div`
  position: absolute;
  top: 27%;
  height: 50px;
  width: 97%;
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.color};
  margin-left: 10px;
`;
const NoAudioVisualizationContainer = styled.div`
  height: 49px;
  width: 1055px;
  margin-left: 7px;
  margin-top: 0px;
`;
const Container = styled.div`
  width: 1064px;
`;

export async function getServerSideProps(ctx) {
  const slug = ctx.query.slug;
  let res;
  const ref = collection(firestore, 'projects');
  const projectsQuery = query(ref, where('title', '==', slug));
  const querySnapshot = await getDocs(projectsQuery);
  querySnapshot.forEach((doc) => {
    res = {
      ...doc.data(),
      id: doc.id,
      timestamp: doc.data().timestamp.toDate().toLocaleDateString(),
    };
  });
  return { props: { res } };
}
