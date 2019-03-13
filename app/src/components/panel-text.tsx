import styled from 'styled-components';

import { TextResize } from './text-resize';

const PanelText = styled(TextResize).attrs({
    size: 60,
  })`
  text-align: center;
  font-weight: 300;
  padding: 0 5%;
`;

export {
  PanelText,
};
