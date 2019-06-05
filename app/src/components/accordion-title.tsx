import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';
import SvgDownChevWhite from './svg/down-chev-white';

/***
 * Accordion title
 */

const SvgDownChevWhiteStyled = styled(SvgDownChevWhite)`
  width: 3rem;
  height: 3rem;
  position: absolute;
  bottom: -8vh;
  left: 50%;
  transform: translate(-50%, 0);
`;

export interface AccordionTitleProps {
  textSize: 'big' | 'medium' | 'small';
  textColour: 'black' | 'white';
  showOpenPrompt: boolean;
}

// Gift Part Title
const AccordionTitleStyle = styled.div<AccordionTitleProps>`
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  color: white;
  display: flex;
  display: block;
  margin: 0 auto;
  line-height: 1;
  position: relative;
  z-index: 1;
  width: 100%;
  text-align: center;

  // Text Size
  ${(props: AccordionTitleProps) => props.textSize === 'big' && `
    font-size: 10vw;
    @media (min-width: ${global.desktop.startPixels}px) {
      font-size: 210%;
    }
  `}
  ${(props: AccordionTitleProps) => props.textSize === 'medium' && `
    font-size: 6vw;
    margin: 20px auto;
    @media (min-width: ${global.desktop.startPixels}px) {
      font-size: 160%;
    }
  `}
  ${(props: AccordionTitleProps) => props.textSize === 'small' && `
    font-size: 5vw;
    color: black;
    @media (min-width: ${global.desktop.startPixels}px) {
      font-size: 150%;
    }
  `}

  // Text Colour
  ${(props: AccordionTitleProps) => props.textColour === 'black' && `
    color: black;
  `}

  // Open Prompt
  ${(props: AccordionTitleProps) => props.showOpenPrompt && `
    position: relative;
    &:before {
      content: 'Open';
      position: absolute;
      top: -4vh;
      text-align: center;
      width: 100%;
      left: 0;
      font-size: 50%;
      font-family: ${global.fonts.body.family};
      text-transform: uppercase;
    }
  `}

`;

const AccordionTitle: React.FC<AccordionTitleProps> = (props) => (
  <AccordionTitleStyle {...props}>
    {props.children}
    {props.showOpenPrompt && <SvgDownChevWhiteStyled />}
  </AccordionTitleStyle>
);

export {
  AccordionTitle,
};
