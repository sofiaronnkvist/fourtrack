import { useEffect, useState } from 'react';
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../utils/firebase';
import { useAuth } from '../../context/AuthContext';

export const useMyRecorder = (id) => {
  const [audioURL, setAudioURL] = useState('');
  const [recordingStatus, setRecordingStatus] = useState('save');
  const [recorder, setRecorder] = useState(null);
  const [audioData, setAudioData] = useState(null);
  const [track, setTrack] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (recordingStatus === 'recording') {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (recordingStatus === 'recording') {
      recorder.start();
    } else if (recordingStatus === 'save') {
      recorder.stop();
    } else {
      setRecorder(null);
      setAudioData(null);
      setAudioURL('');
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      let chunks = [];
      chunks.push(e.data);
      const blob = new Blob(chunks, { type: 'audio/mpeg; codecs=opus' });
      console.log(blob);
      // setAudioData(e.data);
      // console.log(e.data);
      setAudioURL(URL.createObjectURL(blob));
      // sessionStorage.setItem(`audioUrl${id}`, URL.createObjectURL(e.data));
      uploadFiles(blob, user.uid);

      function uploadFiles(file, userId) {
        if (!file) return;
        const sotrageRef = ref(storage, `files/${userId}/${id}/test`);
        // console.log(sotrageRef);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
        // console.log(uploadTask);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            let progress = prog;
          },
          (error) => console.log(error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // console.log('File available at', downloadURL);
              setTrack(downloadURL);
            });
          }
        );
      }
    };

    recorder.addEventListener('dataavailable', handleData);
    return () => recorder.removeEventListener('dataavailable', handleData);
  }, [recorder, recordingStatus]);

  const [timer, setTimer] = useState(0);

  const startRecording = () => {
    setRecordingStatus('recording');
  };

  const cancleRecording = () => {
    setRecordingStatus('cancle');
  };

  const saveRecordedAudio = () => {
    setRecordingStatus('save');
  };

  useEffect(() => {
    let counter;
    if (recordingStatus === 'recording') {
      setTimer(0);
      counter = setInterval(() => {
        setTimer((prevState) => prevState + 1);
      }, 1000);
    } else {
      clearInterval(counter);
      setTimer(0);
    }

    return () => {
      clearInterval(counter);
      setTimer(0);
    };
  }, [recordingStatus]);

  return {
    audioURL,
    recordingStatus,
    startRecording,
    cancleRecording,
    saveRecordedAudio,
    audioData,
    timer,
    track,
  };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
