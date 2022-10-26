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

const AudioVisualizer = (props, ref) => {
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
      barHeight: 0.5,
      cursorWidth: 0,
      progressColor: 'yellow',
    });
    waveSurfer.load(props.src);
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer;
    });

    return () => {
      waveSurfer.destroy();
    };
  }, []);

  //   const pauseWave = () => {
  //     waveSurferRef.current.playPause();
  //   };

  //   const playWave = () => {
  //     waveSurferRef.current.playPause()();
  //   };

  useImperativeHandle(ref, () => ({
    playPauseWave() {
      waveSurferRef.current.playPause();
    },
    playPauseWave2() {
      console.log('plaaaayyyyy');
    },
  }));
  //   console.log(`playing in comp: ${props.playingTest}`);
  if (props.playingTest) {
    waveSurferRef.current.play();
  }

  //   if (!props.playingTest) {
  //     pauseWave();
  //   }
  //   props.playingTest
  //     ? waveSurferRef.current.play()
  //     : waveSurferRef.current.playPause();
  return (
    <div>
      <button
        onClick={() => {
          //   toggleIsPlaying(waveSurferRef.current.isPlaying());
          playWave();
        }}
        type='button'
      >
        play
        {/* {isPlaying ? <FaPauseCircle size='3em' /> : <FaPlayCircle size='3em' />} */}
      </button>
      <button
        onClick={() => {
          //   toggleIsPlaying(waveSurferRef.current.isPlaying());
          pauseWave();
        }}
        type='button'
      >
        pause
        {/* {isPlaying ? <FaPauseCircle size='3em' /> : <FaPlayCircle size='3em' />} */}
      </button>
      <div ref={containerRef} />
    </div>
  );
};

export default forwardRef(AudioVisualizer);
