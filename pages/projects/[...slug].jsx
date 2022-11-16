import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import React, { useEffect, useRef, useState } from 'react';
import Recorder from '../../components/Recorder/Recorder';
import { getFileFromStorage } from '../../utils/getFileFromStorage';
import styled from 'styled-components';
import AudioVisualizer from '../../components/AudioVisualizer/audiovisualizer';
import { deleteFileFromStorage } from '../../utils/deleteFileFromStorage';
import DeleteButton from '../../components/Buttons/DeleteButton';
import { useRouter } from 'next/router';
import SearchModal from '../../components/Modals/SearchModal/SearchModal';
import PlayRecPause from '../../components/Buttons/PlayRecPause';
import { FaPlay, FaStop } from 'react-icons/fa';
import { BsRecordFill } from 'react-icons/bs';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

export default function Project({ ...res }) {
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
      getFileFromStorage(res.uid, res.id).then((res) => setTrackArray(res));
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
      console.log('playing all', id);
      waveRef1.current ? waveRef1.current.play() : console.log('cant play');
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
      setTimeout(() => {
        stop(1);
      }, 60 * 1000);
      return;
    } else if (recId == 2) {
      console.log('recId 2');
      waveRef1.current ? waveRef1.current.play() : null;
      waveRef3.current ? waveRef3.current.play() : null;
      waveRef4.current ? waveRef4.current.play() : null;
      ref2.current.start2();
      setTimeout(() => {
        stop(2);
      }, 60 * 1000);
      return;
    } else if (recId == 3) {
      console.log('recId 3');
      waveRef1.current ? waveRef1.current.play() : null;
      waveRef2.current ? waveRef2.current.play() : null;
      waveRef4.current ? waveRef4.current.play() : null;
      ref3.current.start3();
      setTimeout(() => {
        stop(3);
      }, 60 * 1000);
      return;
    } else if (recId == 4) {
      console.log('recId 4');
      waveRef1.current ? waveRef1.current.play() : null;
      waveRef2.current ? waveRef2.current.play() : null;
      waveRef3.current ? waveRef3.current.play() : null;
      ref4.current.start4();
      setTimeout(() => {
        stop(4);
      }, 60 * 1000);
      return;
    }
  };

  const stop = (recId) => {
    if (recId == 1) {
      ref1.current ? ref1.current.stop1() : null;
      waveRef2.current ? waveRef2.current.pause() : null;
      waveRef3.current ? waveRef3.current.pause() : null;
      waveRef4.current ? waveRef4.current.pause() : null;
      setChildTrack((prev) => prev + 1);

      return;
    } else if (recId == 2) {
      ref2.current ? ref2.current.stop2() : null;
      waveRef1.current ? waveRef1.current.pause() : null;
      waveRef3.current ? waveRef3.current.pause() : null;
      waveRef4.current ? waveRef4.current.pause() : null;
      setChildTrack((prev) => prev + 1);

      return;
    } else if (recId == 3) {
      ref3.current ? ref3.current.stop3() : null;
      waveRef1.current ? waveRef1.current.pause() : null;
      waveRef2.current ? waveRef2.current.pause() : null;
      waveRef4.current ? waveRef4.current.pause() : null;
      setChildTrack((prev) => prev + 1);
      return;
    } else if (recId == 4) {
      ref4.current ? ref4.current.stop4() : null;
      waveRef1.current ? waveRef1.current.pause() : null;
      waveRef2.current ? waveRef2.current.pause() : null;
      waveRef3.current ? waveRef3.current.pause() : null;
      setChildTrack((prev) => prev + 1);

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
      <StyledTopBar>
        <BackBtn onClick={() => router.push('/projects')}>
          <ChevronLeftIcon />
          Back
        </BackBtn>
        <StyledTitle>{res.title}</StyledTitle>{' '}
        <SearchModal
          btnWithBackground={true}
          projectTitle={res.title}
          projectId={res.id}
        />
      </StyledTopBar>
      <Form>
        <Label htmlFor=''>
          <InputWrapper>
            <input
              className='yellowInput'
              checked={playId === '1'}
              onChange={handleChange}
              type='checkbox'
              value='1'
              name='playId'
              placeholder='1'
            ></input>{' '}
            <StyledInput>1</StyledInput>
          </InputWrapper>
          <Container>
            {trackArray[0] ? (
              <AudioVisualizer
                src={trackArray[0]}
                ref={waveRef1}
                id={1}
                marker={res.marker1}
                projectId={res.id}
                background={'#EBBA00'}
                waveColor={'#2E2E2E'}
                volumeColor={'#EBBA00'}
              ></AudioVisualizer>
            ) : (
              <NoAudioVisualizationContainer
                style={{ backgroundColor: '#EBBA00' }}
              ></NoAudioVisualizationContainer>
            )}
            {trackArray[0] ? (
              <DeleteButton
                handleclick={() => deleteTrack(res.uid, res.id, 1)}
                text={'X'}
              ></DeleteButton>
            ) : null}
          </Container>
          <Recorder
            id={1}
            ownerid={res.uid}
            projectid={res.id}
            ref={ref1}
          ></Recorder>
        </Label>
        <Label htmlFor=''>
          <InputWrapper>
            <input
              className='orangeInput'
              checked={playId === '2'}
              onChange={handleChange}
              type='checkbox'
              value='2'
              name='playId'
            ></input>{' '}
            <StyledInput>2</StyledInput>
          </InputWrapper>

          <div>
            {trackArray[1] ? (
              <AudioVisualizer
                src={trackArray[1]}
                ref={waveRef2}
                id={2}
                marker={res.marker2}
                projectId={res.id}
                background='#EC8300'
                waveColor={'#2E2E2E'}
                volumeColor={'#EC8300'}
              ></AudioVisualizer>
            ) : (
              <NoAudioVisualizationContainer
                style={{ backgroundColor: '#EC8300' }}
              ></NoAudioVisualizationContainer>
            )}
            {trackArray[1] ? (
              <DeleteButton
                handleclick={() => deleteTrack(res.uid, res.id, 2)}
                text={'X'}
              ></DeleteButton>
            ) : null}
          </div>

          <Recorder
            id={2}
            ownerid={res.uid}
            projectid={res.id}
            ref={ref2}
          ></Recorder>
        </Label>{' '}
        <Label htmlFor=''>
          <InputWrapper>
            <input
              className='blueInput'
              checked={playId === '3'}
              onChange={handleChange}
              type='checkbox'
              value='3'
              name='playId'
            ></input>
            <StyledInput>3</StyledInput>
          </InputWrapper>
          <div>
            {trackArray[2] ? (
              <AudioVisualizer
                src={trackArray[2]}
                ref={waveRef3}
                id={3}
                marker={res.marker3}
                projectId={res.id}
                background='#69B6D3'
                waveColor={'#2E2E2E'}
                volumeColor={'#69B6D3'}
              ></AudioVisualizer>
            ) : (
              <NoAudioVisualizationContainer
                style={{ backgroundColor: '#69B6D3' }}
              ></NoAudioVisualizationContainer>
            )}
            {trackArray[2] ? (
              <DeleteButton
                handleclick={() => deleteTrack(res.uid, res.id, 3)}
                text={'X'}
              ></DeleteButton>
            ) : null}
          </div>
          <Recorder
            id={3}
            ownerid={res.uid}
            projectid={res.id}
            ref={ref3}
          ></Recorder>
        </Label>{' '}
        <Label htmlFor=''>
          <InputWrapper>
            <input
              className='lavenderInput'
              checked={playId === '4'}
              onChange={handleChange}
              type='checkbox'
              value='4'
              name='playId'
            ></input>
            <StyledInput>4</StyledInput>
          </InputWrapper>

          <div>
            {trackArray[3] ? (
              <AudioVisualizer
                src={trackArray[3]}
                ref={waveRef4}
                id={4}
                marker={res.marker4}
                projectId={res.id}
                background='#B4ABDC'
                waveColor={'#2E2E2E'}
                volumeColor={'#B4ABDC'}
              ></AudioVisualizer>
            ) : (
              <NoAudioVisualizationContainer
                style={{ backgroundColor: '#B4ABDC' }}
              ></NoAudioVisualizationContainer>
            )}
            {trackArray[3] ? (
              <DeleteButton
                handleclick={() => deleteTrack(res.uid, res.id, 4)}
                text={'X'}
              ></DeleteButton>
            ) : null}
          </div>

          <Recorder
            id={4}
            ownerid={res.uid}
            projectid={res.id}
            ref={ref4}
          ></Recorder>
        </Label>{' '}
      </Form>
      <ButtonWrapper>
        <PlayRecPause
          handleclick={() => playChecked(playId)}
          icon={<FaPlay fill='white' />}
        ></PlayRecPause>
        <PlayRecPause
          handleclick={() => stop(playId)}
          icon={<FaStop fill='white' />}
        ></PlayRecPause>
        <PlayRecPause
          handleclick={() => record(playId)}
          backgroundRed={'#F57659'}
          icon={<BsRecordFill fill='white' size='20px' />}
        ></PlayRecPause>
      </ButtonWrapper>
      <p>To play all tracks at once, uncheck all tracks and press play.</p>
    </div>
  );
}
const StyledTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding: 26px;
`;

const BackBtn = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
`;
const StyledTitle = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

const Label = styled.label`
  position: relative;
  display: grid;
  grid-template-columns: 3% 97%;
  align-items: center;
  margin-bottom: 10px;
`;
const Form = styled.form`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type='checkbox'] {
    -webkit-appearance: none;
    appearance: none;
    position: relative;
    height: 25px;
    width: 25px;
    border-radius: 4px;
    z-index: 99;
  }

  .yellowInput {
    background-color: rgba(255, 221, 90, 0.5);
    :checked {
      background-color: rgba(235, 186, 0, 0.8);
    }
  }

  .orangeInput {
    background-color: rgba(255, 206, 145, 0.5);
    :checked {
      background-color: rgba(236, 131, 0, 0.8);
    }
  }
  .blueInput {
    background-color: rgba(195, 226, 237, 0.5);
    :checked {
      background-color: rgba(105, 182, 211, 0.8);
    }
  }
  .lavenderInput {
    background-color: rgba(195, 188, 227, 0.5);
    :checked {
      background-color: rgba(180, 171, 220, 0.8);
    }
  }
`;

const InputWrapper = styled.div`
  display: block;
  position: relative;
  cursor: pointer;
`;
const StyledInput = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  border-radius: 4px;
  text-align: center;
  font-size: 12px;
  padding-top: 20%;
  padding-left: 20%;

  z-index: 0;
`;

const NoAudioVisualizationContainer = styled.div`
  height: 100px;
  width: 1170px;
  margin-left: 7px;
  margin-top: 0px;
  border-radius: 4px;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;

  let res;
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  const ref = collection(firestore, 'projects');
  const projectsQuery = query(ref, where('title', '==', slug[0]));
  const querySnapshot = await getDocs(projectsQuery);
  querySnapshot.forEach((doc) => {
    res = {
      ...doc.data(),
      id: doc.id,
      timestamp: doc
        .data()
        .timestamp.toDate()
        .toLocaleDateString(undefined, options),
    };
  });
  return { props: { ...res } };
}
