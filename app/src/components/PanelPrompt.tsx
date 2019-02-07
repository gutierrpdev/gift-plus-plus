import React from 'react';
import styled from 'styled-components/macro';

interface CircleProps {
  background_image?: string,
}

const Circle = styled.div<CircleProps>`
  background-image: url(${props => props.background_image});
  background-position: center;
  background-size: cover;
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
`

interface Props {
  background_image?: string;
  text: string;
};

const PanelPrompt: React.FC<Props> = ({ text, background_image }: Props) => (
  <Circle background_image={background_image}>
    {text}
  </Circle>
)

export default PanelPrompt;