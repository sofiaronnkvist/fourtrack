import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa';
import styled from 'styled-components';

const AudioVisualizer = (props) => {
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });
  //   const [isPlaying, toggleIsPlaying] = useState(false);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      barWidth: 2,
      barHeight: 1,
      cursorWidth: 1,
      progressColor: 'hotpink',
      waveColor: 'white',
      backgroundColor: 'grey',
      height: 50,
    });
    waveSurfer.load(props.src);
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer;
    });

    return () => {
      waveSurfer.destroy();
    };
  }, []);

//   useEffect(() => {
//     if (props.playingTest) {
//       console.log('true');
//       waveSurferRef.current.playPause();
//     }
//     if (!props.playingTest) {
//       console.log('true');
//       waveSurferRef.current.playPause();
//     }
//   }, [props.playingTest]);

  const pauseWave = () => {
    waveSurferRef.current.playPause();
  };

  const playWave = () => {
    waveSurferRef.current.playPause();
  };

  const playorpause = () => {
    waveSurferRef.current.playPause();
  };

  //   useImperativeHandle(ref, () => ({
  //     playPauseWave() {
  //       waveSurferRef.current.playPause();
  //     },
  //     playPauseWave2() {
  //       console.log('plaaaayyyyy');
  //     },
  //   }));

  return (
    <div>
      <button
        onClick={() => {
          //   toggleIsPlaying(waveSurferRef.current.isPlaying());
          playorpause();
        }}
        type='button'
      >
        play
      </button>
      <button
        onClick={() => {
          //   toggleIsPlaying(waveSurferRef.current.isPlaying());
          playorpause();
        }}
        type='button'
      >
        pause
      </button>
      <div ref={containerRef} />
    </div>
  );
};

export default AudioVisualizer;
