import { useMyRecorder } from './../Recorder/index';
import { forwardRef, useImperativeHandle } from 'react';

const Recorder = (props, ref) => {
  const { timer, track, saveRecordedAudio, startRecording, recordingStatus } =
    useMyRecorder(props.id, props.projectid, props.ownerid);

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
    recordingStatus,
  }));

  return (
    <div>
      <audio
        id={props.id}
        src={track}
        projectid={props.projectid}
        ownerid={props.ownerid}
      ></audio>
      {/* <span>{timer}</span> */}
    </div>
  );
};
export default forwardRef(Recorder);
