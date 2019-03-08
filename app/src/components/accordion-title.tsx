import styled from 'styled-components';

import { global } from '../themes/global';

/***
 * Accordion title
 */

export interface AccordionTitleProps {
  textSize: 'big' | 'medium' | 'small';
  textColour: 'black' | 'white';
  showOpenPrompt: boolean;
}

// Gift Part Title
const AccordionTitle = styled.div<AccordionTitleProps>`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  display: flex;
  display: block;
  margin: 0 auto;
  font-weight: ${global.fonts.title.bold};
  line-height: 1;
  position: relative;
  z-index: 1;
  width: 100%;
  text-align: center;

  // Text Size
  ${(props: AccordionTitleProps) => props.textSize === 'big' && `
    font-size: 10vw;
  `}
  ${(props: AccordionTitleProps) => props.textSize === 'medium' && `
    font-size: 6vw;
    margin: 20px auto;
  `}
  ${(props: AccordionTitleProps) => props.textSize === 'small' && `
    font-size: 5vw;
    color: black;
  `}

  // Text Colour
  ${(props: AccordionTitleProps) => props.textColour === 'black' && `
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
      left: 0;
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
