import React from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';

const PanelPromptStyle = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  padding: 20px;
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
}

const PanelPrompt: React.FC<Props> = ({ text }: Props) => (
  <PanelRound darkBackground={true} dottedBorder={true}>
    <PanelPromptStyle>
      <PanelText>{text}</PanelText>
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelPrompt,
};
