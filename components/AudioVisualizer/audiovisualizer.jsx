import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';

const AudioVisualizer = (props, ref) => {
  const AudioWrapper = dynamic(() => import('./AudioWrapper'), {
    ssr: false,
  });

  return (
    <div>
      <AudioWrapper progressColor={props.progressColor} waveColor={props.waveColor} background={props.background} id={props.id} projectId={props.projectId} waveRef1={ref} waveRef2={ref} waveRef3={ref} waveRef4={ref} src={props.src}></AudioWrapper>
    </div>
  );
};

export default forwardRef(AudioVisualizer);
