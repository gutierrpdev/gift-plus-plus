import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';

/***
 * Accordion title
 */

export interface AccordionTitleProps {
  textSize: 'Big' | 'Medium' | 'Small';
  textColour: 'Black' | 'White';
  showOpenPrompt: boolean;
}

// Gift Part Title
const AccordionTitle = styled.div<AccordionTitleProps>`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  display: flex;
  margin: 0 auto;
  font-weight: ${global.fonts.title.bold};
  line-height: 1;
  position: relative;
  z-index: 1;

  // Text Size
  ${(props: AccordionTitleProps) => props.textSize === 'Big' && `
    font-size: 10vw;
  `}
  ${(props: AccordionTitleProps) => props.textSize === 'Medium' && `
    font-size: 6vw;
    margin: 20px auto;
  `}
  ${(props: AccordionTitleProps) => props.textSize === 'Small' && `
    font-size: 5vw;
    color: black;
  `}

  // Text Colour
  ${(props: AccordionTitleProps) => props.textColour === 'Black' && `
    color: black;
  `}

  // Open Prompt
  ${(props: AccordionTitleProps) => props.showOpenPrompt && `
    position: relative;
    font-size: 10vw;
    &:before {
      content: 'Open';
      position: absolute;
      top: -4vh;
      text-align: center;
      width: 100%;
      left: auto;
      font-size: 4vw;
      font-family: ${global.fonts.body.family};
      text-transform: uppercase;
    }
    &:after {
      content: '';
      background-image: url( ${require('../assets/svg/down-chev-white.svg')} );
      background-size: cover;
      width: 10vw;
      height: 8vw;
      position: absolute;
      bottom: -6vh;
      left: 50%;
      transform: translate(-50%, 0);
    }
  `}

`;

export {
  AccordionTitle,
};
