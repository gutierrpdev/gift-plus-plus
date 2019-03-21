import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../themes/global';

interface Props {
  mobileSize: number;
  desktopSize?: number; // Optional value for desktop.  Calculated if not included
}

const TextResize = styled.div<Props>`
  font-size: ${(props) => calcMobileTextSize(props.mobileSize)}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( props.desktopSize ? props.desktopSize : props.mobileSize ) }%;
  };
`;

export {
  TextResize,
};
