import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

const buttonPaddingVh = 2.5;
const buttonBorderRadiusVh = 2;
const buttonsPaddingVh = buttonPaddingVh * 2;

// Container for button(s) used at the bottom of screens
const Buttons = styled.div`
  display: flex;
  margin: 0;
  align-items: stretch;
  width: 100%;
  padding: 0 3% 3%;
  // ensure the buttons section is visible without a button
  min-height: calc(1em + ${buttonsPaddingVh}vh);
  line-height: 1;
  z-index: 10; // keep above most content
  // Set the height to match the buttons, desktop only
  @media (max-width: ${global.mobile.endPixels}px) {
    font-size: 5vw;
  }
`;

type ButtonColour =
  | 'white'
  | 'black'
;


export interface ButtonProps {
  primary?: boolean; // todo: remove this once confirm no longer required by NT
  colour?: ButtonColour;
  onClick?: () => void;
}

// Button
const ButtonStyle = styled.button<ButtonProps>`
  font-family: ${global.fonts.title.family};
  background-color: ${(props) => props.colour === 'white' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)'};
  line-height: 1;
  margin: 0;
  padding: ${buttonPaddingVh}vh 5%;
  text-align: center;
  font-style: italic;
  flex-grow: 1;
  flex-basis: 0;
  border: none;
  cursor: pointer;
  opacity: 0.95;
  &, a {
    color: ${(props) => props.colour === 'white' ? 'black' : 'white'};
  }
  &:active, &:hover {
    opacity: 1;
  }
  &:only-child {
    border-radius: 2.5vh;
  }
  &:not(:only-child) {
    &:nth-child(1) {
      border-top-left-radius: ${buttonBorderRadiusVh}vh;
      border-bottom-left-radius: ${buttonBorderRadiusVh}vh;
      border-right: 1px solid;
      border-right-color: ${(props) => props.colour === 'black' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'};
    }
    &:nth-child(2) {
      border-top-right-radius: ${buttonBorderRadiusVh}vh;
      border-bottom-right-radius: ${buttonBorderRadiusVh}vh;
    }
  }
`;

const Button: React.FC<ButtonProps> = ({ colour = 'white', children, onClick }) => {
  return (
    <ButtonStyle colour={colour} onClick={onClick}>
      <TextResize textSize={50}>{children}</TextResize>
    </ButtonStyle>
  );
};


// Base button used for controls (audio player, photo capture, etc)
// Base button has active state
const BaseControlButton = styled.div`
  cursor: pointer;
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
