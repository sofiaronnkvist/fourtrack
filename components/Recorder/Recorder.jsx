import { useMyRecorder } from './../Recorder/index';
import Button from '../Button/Button';

export default function Recorder({ id }) {
  // Code to load component in client. To be added to index.js or where the component is used.
  // const Recorder = dynamic(() => import('./components/ownRecorder'), {
  //     ssr: false,
  //   });

  const {
    audioURL,
    audioData, // you can use this for send audio to server
    timer,
    track,
    recordingStatus,
    cancleRecording,
    saveRecordedAudio,
    startRecording,
  } = useMyRecorder(id);

  const stop = () => {
    console.log('Stoppad');
    saveRecordedAudio();
  };

  const start = () => {
    console.log('Startad');
    setTimeout(() => {
      startRecording();
    }, 500);
  };

  return (
    <div>
      <div>
        <Button handleCklick={stop} text='Stop'></Button>
        <Button handleCklick={start} text='Record'></Button>
      </div>
      <div>
        <audio id={id} controls src={track}></audio>
      </div>
      <h1>{timer}</h1>
    </div>
  );
}
