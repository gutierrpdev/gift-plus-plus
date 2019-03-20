import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

const ScreenTitle = styled(TextResize).attrs({
    mobileSize: 100,
    desktopSize: 70,
  })`
  margin: 0 0 1vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    margin: 0 0 10px;
  }
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenTitle,
};
