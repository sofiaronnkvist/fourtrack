import { useMyRecorder } from './../Recorder/index';
import Button from '../Button/Button';
import { forwardRef, useImperativeHandle } from 'react';

const Recorder = (props, ref) => {
  const {
    // audioURL,
    // audioData, // you can use this for send audio to server
    timer,
    track,
    // recordingStatus,
    // cancleRecording,
    saveRecordedAudio,
    startRecording,
  } = useMyRecorder(props.id);

  const stop = () => {
    console.log('Stoppad');
    saveRecordedAudio();
  };

  const hello = () => {
    console.log('hello');
  };
  useImperativeHandle(ref, () => ({
    start1() {
      startRecording();
    },
    start2() {
      startRecording();
    },
    start3() {
      startRecording();
    },
    start4() {
      startRecording();
    },
  }));
  // const start = () => {
  //   console.log('Startad');
  //   setTimeout(() => {
  //     startRecording();
  //   }, 0);

  // };

  return (
    <div>
      <div>
        <Button handleclick={stop} text='Stop'></Button>
        {/* <Button handleclick={start} text='Record'></Button> */}
      </div>
      <div>
        <audio id={props.id} controls src={track}></audio>
      </div>
      <h1>{timer}</h1>
    </div>
  );
};
export default forwardRef(Recorder);
