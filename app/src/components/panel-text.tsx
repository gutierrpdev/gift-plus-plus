import styled from 'styled-components';

import { TextResize } from './text-resize';

// Pass through to TextResize
const PanelText = styled(TextResize)`
  text-align: center;
  font-weight: 300;
  padding: 0 5%;
  line-height: 1.1;
`;

export {
  PanelText,
};
