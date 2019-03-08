import React from 'react';
import styled from 'styled-components';

import { GiftPart } from '../../domain';

import { GiftPartBackground } from './gift-part-background';
import { AccordionTitle } from '../accordion-title';

/***
 * Renders an idle gift part
 */
interface IdleGiftPartProps {
  part: GiftPart;
  displaySize: 'small' | 'medium' | 'big';
  textColour: 'black' | 'white';
  showOpenPrompt: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

const IdleGiftPartStyle = styled.div<IdleGiftPartProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  position: relative;
  z-index: 0;
  text-align: center;
  justify-content: center;

  // small - Occupy a small space
  ${(props) => props.displaySize === 'small' && `
    flex-grow: 0;
    min-height: 10vw;
  `}

  // medium - Fill gaps
  ${(props) => props.displaySize === 'medium' && `
  `}

  // Dark overlay when disabled
  ${(props) => props.isDisabled && `
    &:before {
      filter: grayscale(60%) blur(5px);
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }
  `}

`;


const IdleGiftPart: React.FC<IdleGiftPartProps> = (props) => {

  // Only allow the onClick when appropriate
  function handleOnClick() {
    if (!props.isDisabled && props.onClick) {
      props.onClick();
    }
  }

  return (
    <IdleGiftPartStyle {...props} onClick={handleOnClick}>
      <GiftPartBackground giftPart={props.part}>
        <AccordionTitle
          textSize={props.displaySize}
          textColour={props.textColour}
          showOpenPrompt={props.showOpenPrompt}
        >
          {props.children}
        </AccordionTitle>
      </GiftPartBackground>
    </IdleGiftPartStyle>
  );
};

export {
  IdleGiftPart,
};
