import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Buttons, Button } from '../buttons';
import { ScreenMessage } from './screen-message';
import { TextResize } from '../text-resize';

/**
 * Error Message component
 */

interface Props {
  extraMessage?: string; // Optional extra message to show user
}

const DeviceButtons = styled(Buttons)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ErrorMessage: React.FC<Props> = ({ extraMessage }) => (
  <ScreenMessage>

    <TextResize>There was a problem.</TextResize>
    {extraMessage && <TextResize>{extraMessage}</TextResize>}
    <TextResize>Cancel to return to the Gift homepage</TextResize>

    <DeviceButtons>
      <Button><Link to='/'>Cancel</Link></Button>
      <Button><a href={window.location.href}>Try again</a></Button>
    </DeviceButtons>

  </ScreenMessage>
);

export {
  ErrorMessage,
};
