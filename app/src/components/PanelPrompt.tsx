import React from 'react';
import styled from 'styled-components';

interface CircleProps {
}

const Circle = styled.div<CircleProps>`
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 2px dashed white;
  overflow: hidden;
  height: 150px;
  width: 150px;
  padding: 50px;
  color: white;
  margin: 0 auto;
  text-align: center;
  position: relative;
`;

interface Props {
  text: string;
}

const PanelPrompt: React.FC<Props> = ({ text }: Props) => (
  <Circle>
    {text}
  </Circle>
);

export default PanelPrompt;