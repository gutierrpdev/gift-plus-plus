import styled from 'styled-components';

import { global } from '../themes/global';

const ScreenTitle = styled.h1`
  font-size: 6vw;
  margin: 0;
  line-height: 1;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export default ScreenTitle;
