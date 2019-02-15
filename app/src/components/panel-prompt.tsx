import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';
import { PanelText } from './panel-text';

const Circle = styled.div`
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px dashed white;
  overflow: hidden;
  height: ${global.components.circle.width};
  width: ${global.components.circle.width};
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
  <Circle>
    <PanelText>{text}</PanelText>
  </Circle>
);

export {
  PanelPrompt,
};
