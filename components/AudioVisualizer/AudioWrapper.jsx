import React, { useEffect, useImperativeHandle, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import * as SliderPrimitive from '@radix-ui/react-slider';

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

  const handleChange = (value) => {
    waveSurferRef.current.setVolume(value);
    console.log('value is:', value);
  };

  // const StyledSliderRoot = styled(Slider.Root)`
  //   backgroundcolor: black;
  // `;

  const slider = SliderPrimitive.Root;
  const track = SliderPrimitive.Track;
  const range = SliderPrimitive.Range;
  const thumb = SliderPrimitive.Thumb;

  const StyledSlider = styled(slider)`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: 6px;
    height: 50px;
    margin-left: 10px;
  `;

  const StyledTrack = styled(track)`
    background-color: black;
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
    width: 10px;
    height: 50px;
  `;

  const StyledRange = styled(range)`
    position: absolute;
    background-color: red;
    border-radius: 9999px;
    width: 100%;
  `;

  const StyledThumb = styled(thumb)`
    all: unset;
    display: block;
    width: 4px;
    height: 4px;
    background-color: lightgray;
    boxshadow: 0 2px 10px grey;
    border-radius: 10px;
    padding-right: 2px;
  `;
  return (
    <StyledDiv>
      <OuterWaveDiv>
        <div ref={containerRef} />
      </OuterWaveDiv>
      <form action=''>
        <StyledSlider
          defaultValue={[0.5]}
          max={1}
          min={0}
          step={0.1}
          aria-label='Volume'
          orientation='vertical'
          onValueChange={handleChange}
        >
          <StyledTrack>
            <StyledRange />
          </StyledTrack>
          <StyledThumb />
        </StyledSlider>
        {/* <HorizentalInput
          type='range'
          onChange={handleChange}
          min='0'
          max='1'
          step='0.1'
        /> */}
      </form>
      {/* <StyledSliderRoot defaultValue={[50]} >
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb />
        </StyledSliderRoot> */}
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
