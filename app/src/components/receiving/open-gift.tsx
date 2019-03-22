import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';

import { StyledPanel, PanelContent, PanelProps } from '../panel';
import { PanelRound } from '../panel-round';
import { TextResize } from './../text-resize';

/***
 * Open gift
 */

const GiftImage = styled.img`
  max-width: 70%;
  margin: 7% 0 0;
`;

const OpenPanel = styled.div`
  display: block;
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;

const OpenText = styled(TextResize).attrs({
    textSize: 60,
  })`
  font-style: italic;
  font-family: ${global.fonts.title.family};
  position: relative;
  top: -5%; // nudge up because of svg spacing
  color: black;
`;

// Extend panel props with extras
export interface Props extends PanelProps {
  onComplete?: () => void;
}

// Todo : finish question
const ReceivingOpenGift: React.FC<Props> = (panelProps) => {

  function handleOpenGift() {
    if (panelProps.onComplete) {
      panelProps.onComplete();
    }
  }

  return (
    <StyledPanel visible={panelProps.visible}>
      <PanelContent>
        <PanelRound border={'none'} background={'solid-white'} onClick={handleOpenGift}>
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
