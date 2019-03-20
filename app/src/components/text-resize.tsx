import styled from 'styled-components';

import { global } from '../themes/global';

interface Props {
  mobileSize: number;
  desktopSize?: number; // Optional value for desktop.  Calculated if not included
}

const TextResize = styled.div<Props>`
  font-size: ${(props) => (props.mobileSize / 10)}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => Math.round( props.desktopSize ? (props.desktopSize * 4.8) : (props.mobileSize * 4.8) )}%;
  };
`;

export {
  TextResize,
};
