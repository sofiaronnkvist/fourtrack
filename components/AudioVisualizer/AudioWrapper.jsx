import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
// import MarkersPlugin from "wavesurfer.js/src/plugin/markers"
import styled from 'styled-components';
import * as SliderPrimitive from '@radix-ui/react-slider';
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';

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
      barRadius: 3,
      cursorWidth: 2,
      progressColor: 'hotpink',
      waveColor: 'white',
      backgroundColor: 'grey',
      height: 50,
      // backend: 'MediaElement',
      plugins: [
        MarkersPlugin.create({
          markers: [
            {
              time: sessionStorage.getItem(`startMarker${props.id}${props.projectId}`)
                ? sessionStorage.getItem(`startMarker${props.id}${props.projectId}`)
                : 0.002,
              label: 'start',
              color: 'hotpink',
              draggable: true,
            },
          ],
        }),
        RegionsPlugin.create({
          regionsMinLength: 2,
          regions: [
            // {
            //     start: 1,
            //     end: 3,
            //     loop: false,
            //     color: 'hsla(400, 100%, 30%, 0.5)'
            // },
            // {
            //   start: 1,
            //   end: 2,
            //   loop: false,
            //   color: 'hsla(200, 50%, 70%, 0.4)',
            //   minLength: 0.01,
            //   maxLength: 5,
            // },
          ],
          // dragSelection: {
          //     slop: 1
          // }
        }),

        // ({

        // }),
      ],
    });
    waveSurfer.load(props.src);
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer;
    });

    waveSurfer.on('marker-drop', function (marker) {
      console.log('marker drop:', marker.time);
      sessionStorage.setItem(`startMarker${props.id}${props.projectId}`, marker.time);
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
    margin-left: 18px;
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
        <WaveDiv ref={containerRef} />
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
      </form>
    </StyledDiv>
  );
};

export default AudioWrapper;

const StyledDiv = styled.div`
  margin: 0px 7px;
  width: 1079px;
  display: flex;
  justify-content: space-between;
`;
const OuterWaveDiv = styled.div`
  width: 1064px;
`;
const WaveDiv = styled.div`
  width: 80%%;
`;
