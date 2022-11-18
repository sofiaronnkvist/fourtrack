import { keyframes } from 'styled-components';

export const OrangeAnimation = keyframes`
  0% {
    top: 10%;
    transform: rotate(0deg);
  }

  50% {
    top: 20%;
    transform: rotate(20deg);
  }

  100% {
    top: 10%;
    transform: rotate(0deg);
  }
`;

export const BlueAnimation = keyframes`
  0% {
    bottom: 50%;
  }

  50% {
    bottom: 45%;
  }

  100% {
    bottom: 50%;
  }
`;

export const YellowAnimation = keyframes`
  0% {
    bottom: 16%;
  }

  50% {
    bottom: 21%;
  }

  100% {
    bottom: 16%;
  }
`;

export const PurpleAnimation = keyframes`
 0% {
 top: 60%;
 transform: rotate(0deg);
}

50% {
 top: 65%;
 transform: rotate(40deg);
}

100%{
 top: 60%;
 transform: rotate(0deg);
}
`;
