import React from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound, PanelRoundBackgroundStyle } from './panel-round';

const PanelPromptStyle = styled.div`
  overflow: hidden;
  color: white;
  margin: 0 auto;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  text: string;
  background: PanelRoundBackgroundStyle;
}

const PanelPrompt: React.FC<Props> = (props: Props) => (
  <PanelRound background={props.background} dottedBorder={true}>
    <PanelPromptStyle>
      <PanelText>{props.text}</PanelText>
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelPrompt,
  PanelPromptStyle,
};
