import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

const ScreenTitle = styled(TextResize).attrs({
    textSize: 100,
  })`
  line-height: 1.2;
  margin: 0 10vw 1vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    margin: 0 10px 10px;
  }
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenTitle,
};
