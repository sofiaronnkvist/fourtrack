import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { firestore } from '../../utils/firebase';
import React, { useEffect, useRef, useState } from 'react';
import Recorder from '../../components/Recorder/Recorder';
import { getFileFromStorage } from '../../utils/getFileFromStorage';
import styled from 'styled-components';
import AudioVisualizer from '../../components/AudioVisualizer/audiovisualizer';

export default function Project({ res }) {
  const { user } = useAuth();
  const [trackArray, setTrackArray] = useState([]);
  const [playId, setPlayId] = useState();
  const [childTrack, setChildTrack] = useState(1);

  let ref1 = useRef(null);
  let ref2 = useRef(null);
  let ref3 = useRef(null);
  let ref4 = useRef(null);
  let waveRef1 = useRef(null);
  let waveRef2 = useRef(null);
  let waveRef3 = useRef(null);
  let waveRef4 = useRef(null);

  useEffect(() => {
    getFileFromStorage(user.uid, res.id).then((res) => setTrackArray(res));
  }, [childTrack]);

  const player1 = new Audio(trackArray[0]);
  const player2 = new Audio(trackArray[1]);
  const player3 = new Audio(trackArray[2]);
  const player4 = new Audio(trackArray[3]);

  const playChecked = (id) => {
    if (id == 1) {
      try {
        waveRef1.current.play();
      } catch (error) {}
      return;
    } else if (id == 2) {
      try {
        waveRef2.current.play();
      } catch (error) {}

      return;
    } else if (id == 3) {
      try {
        waveRef3.current.play();
      } catch (error) {}

      return;
    } else if (id == 4) {
      try {
        waveRef4.current.play();
      } catch (error) {}
      return;
    } else {
      console.log('playing all');
      try {
        waveRef1.current.play();
      } catch (error) {}
      try {
        waveRef2.current.play();
      } catch (error) {}
      try {
        waveRef3.current.play();
      } catch (error) {}
      try {
        waveRef4.current.play();
      } catch (error) {}
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

      try {
        waveRef2.current.play();
      } catch (error) {}
      try {
        waveRef3.current.play();
      } catch (error) {}
      try {
        waveRef4.current.play();
      } catch (error) {}
      ref1.current.start1();
      return;
    } else if (recId == 2) {
      console.log('recId 2');

      try {
        waveRef1.current.play();
      } catch (error) {}
      try {
        waveRef3.current.play();
      } catch (error) {}
      try {
        waveRef4.current.play();
      } catch (error) {}
      ref2.current.start2();
      return;
    } else if (recId == 3) {
      console.log('recId 3');

      try {
        waveRef1.current.play();
      } catch (error) {}
      try {
        waveRef2.current.play();
      } catch (error) {}
      try {
        waveRef4.current.play();
      } catch (error) {}
      ref3.current.start3();
      return;
    } else if (recId == 4) {
      console.log('recId 4');

      try {
        waveRef1.current.play();
      } catch (error) {}
      try {
        waveRef2.current.play();
      } catch (error) {}
      try {
        waveRef3.current.play();
      } catch (error) {}
      ref4.current.start4();
      return;
    }
  };

  const stop = (recId) => {
    if (recId == 1) {
      ref1.current.stop1();

      try {
        waveRef2.current.pause();
      } catch (error) {
        console.log(error);
      }
      try {
        waveRef3.current.pause();
      } catch (error) {
        console.log(error);
      }
      try {
        waveRef4.current.pause();
      } catch (error) {
        console.log(error);
      }
      setChildTrack((prev) => prev + 1);

      return;
    } else if (recId == 2) {
      ref2.current.stop2();

      try {
        waveRef1.current.pause();
      } catch (error) {
        console.log(error);
      }
      try {
        waveRef3.current.pause();
      } catch (error) {
        console.log(error);
      }
      try {
        waveRef4.current.pause();
      } catch (error) {
        console.log(error);
      }
      // window.location.reload(false);
      setChildTrack((prev) => prev + 1);

      return;
    } else if (recId == 3) {
      ref3.current.stop3();

      try {
        waveRef1.current.pause();
      } catch (error) {
        console.log(error);
      }
      try {
        waveRef2.current.pause();
      } catch (error) {
        console.log(error);
      }
      try {
        waveRef4.current.pause();
      } catch (error) {
        console.log(error);
      }
      setChildTrack((prev) => prev + 1);
      // window.location.reload(false);
      return;
    } else if (recId == 4) {
      console.log('recId 4');
      ref4.current.stop4();

      try {
        waveRef1.current.pause();
      } catch (error) {
        console.log(error);
      }
      try {
        waveRef2.current.pause();
      } catch (error) {
        console.log(error);
      }
      try {
        waveRef3.current.pause();
      } catch (error) {
        console.log(error);
      }

      setChildTrack((prev) => prev + 1);
      // window.location.reload(false);
      return;
    } else {
      console.log('stop all');
      try {
        waveRef1.current.pause();
      } catch (error) {
        console.log(error);
      }

      try {
        waveRef2.current.pause();
      } catch (error) {
        console.log(error);
      }

      try {
        waveRef3.current.pause();
      } catch (error) {
        console.log(error);
      }

      try {
        waveRef4.current.pause();
      } catch (error) {
        console.log(error);
      }
    }
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
          <RecorderBlock color='lightsalmon'>Track One</RecorderBlock>
          <Recorder id={1} projectid={res.id} ref={ref1}></Recorder>
        </Label>
        {trackArray[0] ? (
          <AudioVisualizer src={trackArray[0]} ref={waveRef1}></AudioVisualizer>
        ) : (
          <div></div>
        )}
        <Label htmlFor=''>
          <input
            checked={playId === '2'}
            onChange={handleChange}
            type='checkbox'
            value='2'
            name='playId'
          ></input>
          <RecorderBlock color='lightyellow'>Track Two</RecorderBlock>
          <Recorder id={2} projectid={res.id} ref={ref2}></Recorder>
        </Label>{' '}
        {trackArray[1] ? (
          <AudioVisualizer src={trackArray[1]} ref={waveRef2}></AudioVisualizer>
        ) : (
          <div></div>
        )}
        <Label htmlFor=''>
          <input
            checked={playId === '3'}
            onChange={handleChange}
            type='checkbox'
            value='3'
            name='playId'
          ></input>
          <RecorderBlock color='lightcoral'>Track Three</RecorderBlock>

          <Recorder id={3} projectid={res.id} ref={ref3}></Recorder>
        </Label>{' '}
        {trackArray[2] ? (
          <AudioVisualizer src={trackArray[2]} ref={waveRef3}></AudioVisualizer>
        ) : (
          <div></div>
        )}
        <Label htmlFor=''>
          <input
            checked={playId === '4'}
            onChange={handleChange}
            type='checkbox'
            value='4'
            name='playId'
          ></input>
          <RecorderBlock color='aliceblue'>Track Four</RecorderBlock>
          <Recorder id={4} projectid={res.id} ref={ref4}></Recorder>
        </Label>{' '}
        {trackArray[3] ? (
          <AudioVisualizer src={trackArray[3]} ref={waveRef4}></AudioVisualizer>
        ) : (
          <div></div>
        )}
      </Form>
      <button onClick={() => stop(playId)}>STOP</button>
      <button onClick={() => playChecked(playId)}>PLAY</button>
      <button onClick={() => record(playId)}>REC</button>
      <p>To play all tracks at once, uncheck all tracks and press play.</p>

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
