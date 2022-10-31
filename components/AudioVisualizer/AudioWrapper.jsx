import React, {
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';

const AudioWrapper = (props) => {
  const containerRef = useRef();
  const waveSurferRef = useRef({
    isPlaying: () => false,
  });

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

//   const pauseWave = () => {
//     waveSurferRef.current.pause();
//   };

//   const playWave = () => {
//     waveSurferRef.current.play();
//   };

  useImperativeHandle(props.waveRef1, () => ({
    play() {
      waveSurferRef.current.play();
    },
    pause() {
      waveSurferRef.current.pause();
    },
  }));

  useImperativeHandle(props.waveRef2, () => ({
    play() {
      waveSurferRef.current.play();
    },
    pause() {
      waveSurferRef.current.pause();
    },
  }));
  useImperativeHandle(props.waveRef3, () => ({
    play() {
      waveSurferRef.current.play();
    },
    pause() {
      waveSurferRef.current.pause();
    },
  }));
  useImperativeHandle(props.waveRef4, () => ({
    play() {
      waveSurferRef.current.play();
    },
    pause() {
      waveSurferRef.current.pause();
    },
  }));

  return (
    <div>
      {/* <button
        onClick={() => {
          //   toggleIsPlaying(waveSurferRef.current.isPlaying());
          playWave();
        }}
        type='button'
      >
        play
      </button>
      <button
        onClick={() => {
          //   toggleIsPlaying(waveSurferRef.current.isPlaying());
          pauseWave();
        }}
        type='button'
      >
        pause
      </button> */}
      <div ref={containerRef} />
    </div>
  );
};

export default AudioWrapper;
