import styled from 'styled-components';

import { global } from '../themes/global';

const ScreenTitle = styled.h1`
  font-size: 3vw;
  margin: 0 0 20px;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export default ScreenTitle;
