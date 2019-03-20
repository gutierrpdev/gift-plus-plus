import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

const ScreenSubTitle = styled(TextResize).attrs({
  mobileSize: 70,
  })`
  /* font-size: 7vw; */
  margin: 0 0 3vw;
  @media (min-width: 768px) {
    margin: 0 0 15px;
  }
  line-height: 1;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenSubTitle,
};
