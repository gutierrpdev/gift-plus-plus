import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';

import { StyledPanel, PanelContent, PanelProps } from '../panel';
import { PanelRound } from '../panel-round';
import { PanelPromptStyle } from '../panel-prompt';

/***
 * Open gift
 */

const GiftImage = styled.img`
  max-width: 100%;
  margin: 5vw 0 1vw;
`;

const OpenPanel = styled.div`
  display: block;
  text-align: center;
  margin: 0 auto;
`;

const OpenText = styled.div`
  font-style: italic;
  font-family: ${global.fonts.title.family};
  font-size: 7vw;
  position: relative;
  top: -2vw; // nudge up because of svg spacing
  color: black;
`;

// Extend panel props with extras
export interface Props extends PanelProps {
}

// Todo : finish question
const ReceivingOpenGift: React.FC<Props> = (panelProps) => {

  function handleOpenGift() {
    if (panelProps.onComplete) {
      panelProps.onComplete();
    }
  }

  return (
    <StyledPanel {...panelProps}>
      <PanelContent>
        <PanelRound dottedBorder={false} background={'solid-white'} onClick={handleOpenGift}>
          <OpenPanel>
            <GiftImage src={require('../../assets/svg/gift.svg')} />
            <OpenText>Click to open</OpenText>
          </OpenPanel>
        </PanelRound>
      </PanelContent>
    </StyledPanel>
  );
};

export {
  ReceivingOpenGift,
};
