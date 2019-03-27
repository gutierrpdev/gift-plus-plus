import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';

import { Panel, PanelContent } from '../panel';
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

export interface Props {
  visible?: boolean;
  onComplete?: () => void;
}

// Todo : finish question
const ReceivingOpenGift: React.FC<Props> = (props) => {

  function handleOpenGift() {
    if (props.onComplete) {
      props.onComplete();
    }
  }

  return (
    <Panel visible={props.visible}>
      <PanelContent>
        <PanelRound border={'none'} background={'solid-white'} onClick={handleOpenGift}>
          <OpenPanel>
            <GiftImage src={require('../../assets/svg/gift.svg')} />
            <OpenText>Click to open</OpenText>
          </OpenPanel>
        </PanelRound>
      </PanelContent>
    </Panel>
  );
};

export {
  ReceivingOpenGift,
};
