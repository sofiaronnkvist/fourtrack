import { useMyRecorder } from './../Recorder/index';
import Button from '../Button/Button';
import { forwardRef, useImperativeHandle } from 'react';

const Recorder = (props, ref) => {
  const {
    // audioURL,
    // audioData, // you can use this for send audio to server
    timer,
    track,
    saveRecordedAudio,
    startRecording,
  } = useMyRecorder(props.id, props.projectid);

  // props.changeTrack(track);

  // const stop = () => {
  //   saveRecordedAudio();
  // };

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
    stop1() {
      saveRecordedAudio();
    },
    stop2() {
      saveRecordedAudio();
    },
    stop3() {
      saveRecordedAudio();
    },
    stop4() {
      saveRecordedAudio();
    },
  }));
  // const start = () => {
  //   console.log('Startad');
  //   setTimeout(() => {
  //     startRecording();
  //   }, 0);

  // };
  // console.log(audioURL);
  return (
    <div>
      <div>
        {/* <Button handleclick={stop} text='Stop'></Button> */}
        {/* <Button handleclick={start} text='Record'></Button> */}
        {/* <button onClick={() => props.setChildTrack(audioURL)}>setTrack</button> */}
      </div>
      <div>
        <audio id={props.id} src={track} projectid={props.projectid}></audio>
        <span>{timer}</span>
      </div>
    </div>
  );
};
export default forwardRef(Recorder);
