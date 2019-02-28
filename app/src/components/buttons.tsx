import styled from 'styled-components';

import { global } from '../themes/global';

// Container for button(s)
const Buttons = styled.div`
  display: flex;
  margin: 0;
  align-items: stretch;
`;

export interface ButtonProps {
  invisible?: boolean; // Makes the button hidden, but still occupies space
}

// Button
const Button = styled.button<ButtonProps>`
  font-family: ${global.fonts.title.family};
  visibility: ${(props) => props.invisible ? 'hidden' : 'visible'};
  font-size: 6vw;
  margin: 0;
  padding: 4vw;
  line-height: 1;
  text-align: center;
  font-style: italic;
  color: white;
  flex-grow: 1;
  flex-basis: 0;
  background-color: rgba(0,0,0,0.7);
  border: none;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.8);
`;

export {
  Button,
  Buttons,
};
