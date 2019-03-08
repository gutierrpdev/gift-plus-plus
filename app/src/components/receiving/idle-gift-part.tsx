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
  displaySize: 'small' | 'medium';
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
  border: 1px solid yellow;
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

`;

const IdleGiftPart: React.FC<IdleGiftPartProps> = (props) => {
  return (
    <IdleGiftPartStyle {...props} onClick={props.onClick}>
      <GiftPartBackground giftPart={props.part}>
        <AccordionTitle textSize={props.displaySize} textColour={'black'} showOpenPrompt={false}>
          {props.children}
        </AccordionTitle>
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      </GiftPartBackground>
    </IdleGiftPartStyle>
  );
};

export {
  IdleGiftPart,
};
