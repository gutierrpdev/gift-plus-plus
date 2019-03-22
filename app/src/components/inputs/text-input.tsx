import React from 'react';
import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../../themes/global';

/***
 * Text input field
 */

const TextInputStyled = styled.input.attrs({
    type: 'text',
  })<Props>`
  font-size: ${(props) => calcMobileTextSize( props.textSize || 40 )}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( props.textSize || 40 ) }%;
  };
`;

interface Props {
  defaultValue?: string;
  placeHolder?: string;
  textSize?: number;
  onTextChanged?: (text: string) => void;
}

const TextInput: React.FC<Props> = ( props ) => {

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (props.onTextChanged) {
      props.onTextChanged(event.target.value);
    }
  }

  return (
    <TextInputStyled
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
