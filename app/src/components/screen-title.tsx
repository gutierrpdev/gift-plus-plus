import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

const ScreenTitle = styled(TextResize).attrs({
    size: 100,
  })`
  margin: 0 0 1vw;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenTitle,
};
