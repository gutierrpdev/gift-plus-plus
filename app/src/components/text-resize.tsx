import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../themes/global';

interface Props {
  // Note: textSize is optional as this is inherited by some components.
  // It's inherited as it allows good merging to CSS classes over styled components
  textSize?: number;
}

const TextResize = styled.div<Props>`
  font-size: ${(props) => calcMobileTextSize(props.textSize || 50)}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( props.textSize || 50 ) }%;
  };
`;

export {
  TextResize,
};
