import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import styled from 'styled-components';
import * as SliderPrimitive from '@radix-ui/react-slider';
import MarkersPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.markers.min.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.min.js';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';

const AudioWrapper = (props) => {
  const containerRef = useRef();
  const [myMarker, setMyMarker] = useState(props.marker);
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
      progressColor: `${props.waveColor}`,
      waveColor: `${props.waveColor}`,
      backgroundColor: `${props.background}`,
      height: 100,
      plugins: [
        MarkersPlugin.create({
          markers: [
            {
              time: myMarker,
              // label: 'start',
              color: `${props.waveColor}`,
              draggable: true,
            },
          ],
        }),
        RegionsPlugin.create({
          regionsMinLength: 2,
          regions: [
          ],
      
        }),
      ],
    });
    waveSurfer.load(props.src);
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer;
    });

    waveSurfer.on('marker-drop', async function (marker) {
      console.log('marker drop:', marker.time);
      try {
        const ref = doc(firestore, 'projects', props.projectId);
        await updateDoc(ref, {
          [`marker${props.id}`]: marker.time,
        });
      } catch (error) {
        console.log(error);
      }
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
    width: 3px;
    height: 100px;
    margin-left: 18px;
  `;

  const StyledTrack = styled(track)`
    background-color: ${(props) => props.theme.grey600};
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
    width: 10px;
    height: 100px;
  `;

  const StyledRange = styled(range)`
    position: absolute;
    background-color: ${props.volumeColor};
    border-radius: 9999px;
    width: 100%;
  `;

  const StyledThumb = styled(thumb)`
    all: unset;
    display: block;
    width: 6px;
    height: 6px;
    background-color: white;
    border: 0.9px solid black;
    border-radius: 10px;
    margin-left: -2.5px;
  `;
  return (
    <StyledDiv>
      <OuterWaveDiv>
        <WaveDiv ref={containerRef} />
      </OuterWaveDiv>
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
    </StyledDiv>
  );
};

export default AudioWrapper;

const StyledDiv = styled.div`
  margin: 0px 7px;
  width: 1170px;
  display: flex;
  justify-content: space-between;
`;
const OuterWaveDiv = styled.div`
  width: 1170px;
`;
const WaveDiv = styled.div`
  width: 1170px;
  border-radius: 4px;
`;
