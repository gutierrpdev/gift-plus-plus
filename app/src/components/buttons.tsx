import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

// Container for button(s) used at the bottom of screens
const Buttons = styled.div`
  display: flex;
  margin: 0;
  align-items: stretch;
  width: 100%;
  min-height: calc(1em + 8vw); // todo: this is a hack to ensure the buttons appear
  font-size: 6vw;
  line-height: 1;
`;

export interface ButtonProps {
  primary?: boolean;
  onClick?: () => void;
}

// Button
const ButtonStyle = styled.button<ButtonProps>`
  font-family: ${global.fonts.title.family};
  color: ${(props) => props.primary ? 'black' : 'white'};
  background-color: ${(props) => props.primary ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};;
  line-height: 1;
  margin: 0;
  padding: 5%;
  text-align: center;
  font-style: italic;
  flex-grow: 1;
  flex-basis: 0;
  border: none;
`;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonStyle {...props}>
      <TextResize textSize={50}>{props.children}</TextResize>
    </ButtonStyle>
  );
};


// Base button used for controls (audio player, photo capture, etc)
// Base button has active state
const BaseControlButton = styled.div`
  opacity: 0.8;
  &:active {
    opacity: 1;
  }
`;

export {
  Button,
  Buttons,
  BaseControlButton,
};
