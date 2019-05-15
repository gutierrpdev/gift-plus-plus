import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

export interface ScreenTitleProps {
  titleSize?: 'normal' | 'big' | 'very-big'; // The title text size
  marginBottom?: 'small' | 'medium'; // The margin below the title
}

const ScreenTitle = styled(TextResize).attrs<ScreenTitleProps>((props) => ({
  textSize: (() => {
    switch (props.titleSize) {
      case 'very-big':
        return 350;
      case 'big':
        return 175;
      default:
        return 90;
    }
  })(),
    scaleDownForSmallDevices: true,
    // todo text size should be dynamic calculated to allow for long names
  }))<ScreenTitleProps>`
  line-height: 1;
  margin: 0;
  ${(props: ScreenTitleProps) => ((!props.marginBottom) || (props.marginBottom === 'medium')) && `
    margin-bottom: 1.3vh;
  `}
  ${(props: ScreenTitleProps) => props.marginBottom === 'small' && `
    margin-bottom: 0.5vh;
  `}
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
