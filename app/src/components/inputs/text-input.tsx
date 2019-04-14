import React from 'react';
import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../../themes/global';

/***
 * Text input field
 */

const TextInputStyled = styled.input.attrs<TextInputProps>((props) => ({
    type: props.inputType || 'text',
  }))<TextInputProps>`
  font-size: ${(props) => calcMobileTextSize( props.textSize || 50 )}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( props.textSize || 50 ) }%;
  };
`;

interface TextInputProps {
  inputType?: 'text' | 'email';
  defaultValue?: string;
  placeHolder?: string;
  textSize?: number;
  onTextChanged?: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ( props ) => {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (props.onTextChanged) {
      props.onTextChanged(event.target.value.trim());
    }
  }

  return (
    <TextInputStyled
      inputType={props.inputType}
      defaultValue={props.defaultValue}
      textSize={props.textSize}
      placeholder={props.placeHolder}
      onChange={handleChange}
    />
  );
};

export {
  TextInput,
};
