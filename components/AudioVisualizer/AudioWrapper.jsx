import React, { useEffect, useImperativeHandle, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import * as Slider from '@radix-ui/react-slider';

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

  const handleChange = (event) => {
    waveSurferRef.current.setVolume(event.target.value);
    console.log('value is:', event.target.value);
  };

  return (
    <StyledDiv>
      <OuterWaveDiv>
        <div ref={containerRef} />
      </OuterWaveDiv>
      <form action=''>
        <HorizentalInput
          type='range'
          onChange={handleChange}
          min='0'
          max='1'
          step='0.1'
        />
      </form>
    </StyledDiv>
  );
};

export default AudioWrapper;

const StyledDiv = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-between;
`;
const OuterWaveDiv = styled.div`
  width: 100%;
`;
const HorizentalInput = styled.input`
  margin: 10px;
  appearance: slider-vertical;
`;
