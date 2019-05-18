import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { GlobalStyles } from '../../themes/global';
import { Buttons, Button } from '../buttons';
import { ScreenMessage } from './screen-message';
import { ScreenManager } from '../screen-manager';
import { TextResize } from '../text-resize';

/**
 * Error Message component
 * This will be shown instead of any other content
 */

interface Props {
  message: string;
}

const DeviceButtons = styled(Buttons)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ErrorTextResize = styled(TextResize)`
  margin-bottom: 1vh;
`;

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <ScreenManager>
    <ScreenMessage>
      <GlobalStyles />

      <ErrorTextResize>{message}</ErrorTextResize>

      <ErrorTextResize>Cancel to return to the Gift homepage</ErrorTextResize>

      <DeviceButtons>
        <Button colour='black'><Link to='/'>Cancel</Link></Button>
        <Button colour='black'><a href={window.location.href}>Try again</a></Button>
      </DeviceButtons>

    </ScreenMessage>
  </ScreenManager>
);

export {
  ErrorMessage,
};
