import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

const ScreenPostTitle = styled(TextResize).attrs({
  mobileSize: 30,
})`
  margin: 0 0 0.5vw;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenPostTitle,
};
