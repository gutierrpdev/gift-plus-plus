import styled from 'styled-components';

import { global } from '../themes/global';

const ScreenPostTitle = styled.h1`
  font-size: 4vw;
  margin: 0 0 0.5vw;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenPostTitle,
};
