import styled from 'styled-components';

import { global } from '../themes/global';

// Container for button(s) used at the bottom of screens
const Buttons = styled.div`
  display: flex;
  margin: 0;
  align-items: stretch;
  width: 100%;
`;

export interface ButtonProps {
  invisible?: boolean; // Makes the button hidden, but still occupies space
  primary?: boolean;
}

// Button
const Button = styled.button<ButtonProps>`
  font-family: ${global.fonts.title.family};
  visibility: ${(props) => props.invisible ? 'hidden' : 'visible'};
  color: ${(props) => props.primary ? 'black' : 'white'};
  background-color: ${(props) => props.primary ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};;
  font-size: 6vw;
  margin: 0;
  padding: 4vw;
  line-height: 1;
  text-align: center;
  font-style: italic;
  flex-grow: 1;
  flex-basis: 0;
  border: none;
`;

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
