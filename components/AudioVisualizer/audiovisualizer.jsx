import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';

const AudioVisualizer = (props, ref) => {
  const AudioWrapper = dynamic(() => import('./AudioWrapper'), {
    ssr: false,
  });

  return (
    <div>
      <AudioWrapper waveRef1={ref} waveRef2={ref} waveRef3={ref} waveRef4={ref} src={props.src}></AudioWrapper>
    </div>
  );
};

export default forwardRef(AudioVisualizer);
