import React from 'react';
import {Prompt} from 'react-router-dom';

import { isIosDevice } from '../utils/helpers';

/***
 * Detects when the page reloads/closes/moves away
 * Note: We do not detect or intefere with browser back as would be a bad user experience
 */

interface Props {
  promptOnReloadAndClose?: boolean;  // Prompts the user on reload and close
  promptOnRouterLinkClick?: boolean; // Prompts the user if they click a router link
  confirmationMessage?: string; // Optional confirmation message
}

const PageChangeDetect: React.FC<Props> = ({
    promptOnReloadAndClose = true,
    promptOnRouterLinkClick = true,
    confirmationMessage = 'Are you sure you want to leave?',
  }) => {

  if (promptOnReloadAndClose) {

    // Note: This does not work on iOS, despite using 'pagehide' event
    const eventName = 'beforeunload';

    // Capture and prompt for reload/close
    // Note: Some browsers will ignore the message we give
    window.addEventListener(eventName, (e) => {

      e.cancelBubble = true;

      (e || window.event).returnValue = confirmationMessage; // Gecko + IE
      return confirmationMessage;                            // Webkit, Safari, Chrome
    });

  }

  if (promptOnRouterLinkClick) {

    // Use a router prompt to detect users clicking to a new URL
    return (
      <Prompt
        when={true}
        message={confirmationMessage}
      />
    );

  }

  // Default
  return null;

};

export {
  PageChangeDetect,
};
