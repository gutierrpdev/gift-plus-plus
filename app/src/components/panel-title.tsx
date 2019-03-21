import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

/***
 * A sub title element at the top of panels
 */

const PanelTitle = styled(TextResize).attrs({
    mobileSize: 60,
  })`
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  margin: 0 0 0.5vh 0;
`;

export {
  PanelTitle,
};
