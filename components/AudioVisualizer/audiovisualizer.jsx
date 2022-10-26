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
      barWidth: 4,
      barHeight: 1,
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

  const playPauseWave = () => {
    waveSurferRef.current.playPause();
  };

  useImperativeHandle(ref, () => ({
    playPauseWave() {
      waveSurferRef.current.playPause();
    },
    playPauseWave2() {
      console.log('plaaaayyyyy');
    },
  }));
  return (
    <div>
      <button
        onClick={() => {
          //   toggleIsPlaying(waveSurferRef.current.isPlaying());
          playPauseWave();
        }}
        type='button'
      >
        Button
        {/* {isPlaying ? <FaPauseCircle size='3em' /> : <FaPlayCircle size='3em' />} */}
      </button>
      <div ref={containerRef} />
    </div>
  );
};

export default forwardRef(AudioVisualizer);
