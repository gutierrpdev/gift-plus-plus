import React from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound, PanelRoundBackgroundStyle } from './panel-round';

interface StyleProps {
  textColor?: 'white' | 'black';
}

const PanelPromptStyle = styled.div<StyleProps>`
  overflow: hidden;
  color: ${(props) => props.textColor};
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
  textColor?: 'white' | 'black';
  background?: PanelRoundBackgroundStyle;
}

const PanelPrompt: React.FC<Props> = ({ text, textColor, background = 'none', children }) => (
  <PanelRound background={background}>
    <PanelPromptStyle textColor={textColor}>
      {/* support line breaks */}
      {text.split('\n').map((item, key) => {
        return <PanelText key={key}>{item}</PanelText>;
      })}
      {children}
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelPrompt,
  PanelPromptStyle,
};
