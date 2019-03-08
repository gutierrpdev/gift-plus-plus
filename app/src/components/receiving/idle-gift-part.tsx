import React from 'react';
import styled from 'styled-components';

import { GiftPart } from '../../domain';

import { GiftPartBackground } from './gift-part-background';

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

  // small - Occupy a small space
  ${(props) => props.displaySize === 'small' && `
    flex-grow: 0;
    justify-content: center;
    min-height: 10vw;
  `}

  // medium - Fill gaps
  ${(props) => props.displaySize === 'medium' && `
    justify-content: center;
  `}

`;

const IdleGiftPart: React.FC<IdleGiftPartProps> = (props) => {
  return (
    <IdleGiftPartStyle {...props}>
      <GiftPartBackground giftPart={props.part}>
      <button onClick={props.onClick} >
        {props.children}
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      </button>
      </GiftPartBackground>
    </IdleGiftPartStyle>
  );
};

export {
  IdleGiftPart,
};
