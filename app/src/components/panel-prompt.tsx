import React from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound, PanelRoundBackgroundStyle } from './panel-round';

interface StyleProps {
  textColor?: 'white' | 'black';
}

const PanelPromptStyle = styled.div<StyleProps>`
  overflow: hidden;
  color: ${(props) => props.textColor || 'white'};
  margin: 0 auto;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

interface Props {
  text?: string;
  textColor?: 'white' | 'black';
  textSize?: number;
  background?: PanelRoundBackgroundStyle;
  allowCompactRound?: boolean;
}

const PanelPrompt: React.FC<Props> = (props) => (
  <PanelRound background={props.background || 'none'} allowCompact={props.allowCompactRound || false}>
    <PanelPromptStyle textColor={props.textColor}>
      {/* support line breaks */}
      {props.text && props.text.split('\n').map((item, key) => {
        return <PanelText textSize={props.textSize} key={key}>{item}</PanelText>;
      })}
      {props.children}
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelPrompt,
  PanelPromptStyle,
};
