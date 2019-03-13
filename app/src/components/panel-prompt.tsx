import React from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound, PanelRoundBackgroundStyle } from './panel-round';
import { checkPropTypes } from 'prop-types';

const PanelPromptStyle = styled.div`
  overflow: hidden;
  color: white;
  margin: 0 auto;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

interface Props {
  text: string;
  background: PanelRoundBackgroundStyle;
  dottedBorder?: boolean;
}

const PanelPrompt: React.FC<Props> = ({ text, background, dottedBorder = false, children }) => (
  <PanelRound background={background} dottedBorder={dottedBorder}>
    <PanelPromptStyle>
      <PanelText>{text}</PanelText>
      {children}
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelPrompt,
  PanelPromptStyle,
};
