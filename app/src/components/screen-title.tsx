import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

export interface ScreenTitleProps {
  titleSize?: 'normal' | 'very-big';
}

const ScreenTitle = styled(TextResize).attrs<ScreenTitleProps>((props) => ({
    textSize: props.titleSize === 'very-big' ? 210 : 90,
    // todo this should be dynamic to allow for long names
  }))<ScreenTitleProps>`
  line-height: 1;
  margin: 0 0 1.3vh;
  @media (min-width: ${global.desktop.startPixels}px) {
    margin: 0 0 10px;
  }
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
`;

export {
  ScreenTitle,
};
