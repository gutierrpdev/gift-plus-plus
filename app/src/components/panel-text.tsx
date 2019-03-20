import styled from 'styled-components';

import { TextResize } from './text-resize';

const PanelText = styled(TextResize).attrs({
    mobileSize: 50,
  })`
  text-align: center;
  font-weight: 300;
  padding: 0 5%;
  line-height: 1.1;
`;

export {
  PanelText,
};
