import React from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';

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
  darkBackground: boolean;
}

const PanelPrompt: React.FC<Props> = (props: Props) => (
  <PanelRound darkBackground={props.darkBackground} dottedBorder={true}>
    <PanelPromptStyle>
      <PanelText>{props.text}</PanelText>
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelPrompt,
};
