import styled from 'styled-components';

import { global } from '../themes/global';

const ScreenTitle = styled.h1`
  font-size: 12vw; // todo check font size for big name
  margin: 0 0 1vw;
  line-height: 1;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenTitle,
};
