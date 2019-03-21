import React from 'react';
import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../../themes/global';

/***
 * Text Area input field
 */

const TextAreaStyled = styled.textarea<Props>`
  width: 100%;
  max-width: 95%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6vw;
  border: none;
  padding: 5vw 5vw;
  box-sizing: border-box;
  resize: none;
  font-size: ${(props) => calcMobileTextSize( props.mobileSize || 40 )}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( (props.desktopSize ? props.desktopSize : props.mobileSize) || 40 ) }%;
  };
`;

interface Props {
  defaultValue?: string;
  placeHolder?: string;
  mobileSize?: number;
  desktopSize?: number;
  onTextChanged?: (text: string) => void;
}

const TextAreaInput: React.FC<Props> = ( props ) => {

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (props.onTextChanged) {
      props.onTextChanged(event.target.value);
    }
  }

  return (
    <TextAreaStyled
      defaultValue={props.defaultValue}
      mobileSize={props.mobileSize}
      desktopSize={props.desktopSize}
      placeholder={props.placeHolder}
      onChange={handleChange}
    />
  );
};

export {
  TextAreaInput,
};
