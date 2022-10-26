import React, { useEffect, useRef, useState } from 'react';
import Recorder from '../components/Recorder/Recorder';
import { useAuth } from '../context/AuthContext';
import { getFileFromStorage } from '../utils/getFileFromStorage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../utils/firebase';
import Project from '../components/Project/Project';
// import AudioVisualizer from '../components/AudioVisualizer/audiovisualizer';
import dynamic from 'next/dynamic';

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

  // const playAll = () => {
  //   player1.play();
  //   player2.play();
  //   player3.play();
  //   player4.play();
  // };
  const playChecked = (id) => {
    if (id == 1) {
      player1.play();
      setChildTrack(true);
      // waveRef.current.playPauseWave2();
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
    } else {
      player1.play();
      player2.play();
      player3.play();
      player4.play();
      SetIsPlaying(true);

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
      player2.play();
      player3.play();
      player4.play();
      ref1.current.start1();
    }
    if (recId == 2) {
      console.log('recId 2');
      player1.play();
      player3.play();
      player4.play();
      ref2.current.start2();
    }
    if (recId == 3) {
      console.log('recId 3');
      player1.play();
      player2.play();
      player4.play();
      ref3.current.start3();
    }
    if (recId == 4) {
      console.log('recId 4');
      player1.play();
      player2.play();
      player3.play();
      ref4.current.start4();
    }
  };

  const stop = (recId) => {
    console.log(`in stop(), recId: ${recId}`);
    if (recId == 1) {
      console.log('stop recId 1');
      player2.pause();
      player3.pause();
      player4.pause();
      ref1.current.stop1();
      setChildTrack((prev) => prev + 1);
      setChildTrack(false);

      window.location.reload(false);
    }
    if (recId == 2) {
      console.log('recId 2');
      player1.pause();
      player3.pause();
      player4.pause();
      ref2.current.stop2();
      setChildTrack((prev) => prev + 1);
      window.location.reload(false);
    }
    if (recId == 3) {
      console.log('recId 3');
      player1.pause();
      player2.pause();
      player4.pause();
      ref3.current.stop3();
      setChildTrack((prev) => prev + 1);
      window.location.reload(false);
    }
    if (recId == 4) {
      console.log('recId 4');
      player1.pause();
      player2.pause();
      player3.pause();
      ref4.current.stop4();
      setChildTrack((prev) => prev + 1);
      window.location.reload(false);
    } else {
      player1.pause();
      player2.pause();
      player3.pause();
      player4.pause();
    }
  };

  return (
    <div>
      <p>This route is protected</p>
      <p> Well hello {user.email}!</p>
      <ul>
        {projects &&
          projects.map((project) => {
            return <li key={project.title}>{project.title}</li>;
          })}
      </ul>

      {trackArray[0] ? (
        <AudioVisualizer
          ref={waveRef}
          src={trackArray[0]}
          playingTest={isPlaying}
        ></AudioVisualizer>
      ) : (
        <div></div>
      )}
      {trackArray[1] ? (
        <AudioVisualizer
          ref={waveRef}
          src={trackArray[1]}
          playingTest={isPlaying}
        ></AudioVisualizer>
      ) : (
        <div></div>
      )}
      <button onClick={() => stop(playId)}>STOP</button>
      <button onClick={() => playChecked(playId)}>PLAY</button>
      <button onClick={() => record(playId)}>REC</button>

      <h3>Recorders</h3>
      <form>
        <label htmlFor=''>track 1</label>
        <input
          onChange={handleChange}
          type='radio'
          value='1'
          name='playId'
        ></input>
        <label htmlFor=''>track 2</label>
        <input
          onChange={handleChange}
          type='radio'
          value='2'
          name='playId'
        ></input>
        <label htmlFor=''>track 3</label>
        <input
          onChange={handleChange}
          type='radio'
          value='3'
          name='playId'
        ></input>
        <label htmlFor=''>track 4</label>
        <input
          onChange={handleChange}
          type='radio'
          value='4'
          name='playId'
        ></input>
      </form>
      <Recorder id={1} ref={ref1}></Recorder>
      <Recorder id={2} ref={ref2}></Recorder>
      <Recorder id={3} ref={ref3}></Recorder>
      <Recorder id={4} ref={ref4}></Recorder>
      <Project user={user} />
      <button onClick={readUsers}>Click here to see users</button>
    </div>
  );
};

export default Dashboard;
