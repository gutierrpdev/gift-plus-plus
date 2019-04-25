import React, { useState } from 'react';
import styled from 'styled-components';

import { isMobileDevice } from '../utils/helpers';
import { MessageModal } from './message-modal';

/***
 * Shows a message when mobile device is in landscape orientation
 */

const StyledMessage = styled(MessageModal)`
  text-align: center;
`;

export const LandscapeMessage: React.FC = () => {

  // Our state
  const [isLandscape, setIsLandscape] = useState(getIsLandscape);

  // Return whether the screen is landscape
  function getIsLandscape(): boolean {
    return window.innerWidth > window.innerHeight;
  }

  // Updates the state with the current orientation
  function updateIsLandscape() {
    setIsLandscape(getIsLandscape());
  }

  // Check
  window.addEventListener('orientationchange', () => {
    updateIsLandscape();
  });
  window.addEventListener('resize', () => {
    updateIsLandscape();
  });

  if (isMobileDevice() && isLandscape) {
    return (
      <StyledMessage>
        <p>This app only works in portrait mode.</p>
        <p>Please rotate your phone</p>
        <div style={{fontSize: '5rem'}}>📱</div>
      </StyledMessage>
    );
  }

  // Default
  return null;

};
