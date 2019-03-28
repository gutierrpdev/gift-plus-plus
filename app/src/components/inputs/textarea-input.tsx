import React from 'react';
import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../../themes/global';

/***
 * Text Area input field
 */

const TextAreaStyled = styled.textarea<Props>`
  padding: 6vw;
  resize: none;
  font-size: ${(props) => calcMobileTextSize( props.textSize || 40 )}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( props.textSize || 40 ) }%;
    padding: 30px;
  };
`;

interface Props {
  defaultValue?: string;
  placeHolder?: string;
  textSize?: number;
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
      textSize={props.textSize}
      placeholder={props.placeHolder}
      onChange={handleChange}
    />
  );
};

export {
  TextAreaInput,
};
