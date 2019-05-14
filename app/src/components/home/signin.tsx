import React, { useState } from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { Buttons, Button } from '../buttons';
import { BgSvgFullScreen } from '../svg/bg';
import { TextInput } from '../inputs/text-input';
import { TextResize } from '../text-resize';
import { PanelTitle } from '../panel-title';
import { HeaderCloseButton } from './header-close-button';
import { BaseModal } from '../modals/base-modal';

/**
 * Sign in component
 */

const Outer = styled(BaseModal)`
  background-color: white;
`;

const Message = styled(TextResize)`
  color: black;
`;

interface Props {
  onCloseButtonClick: () => void; // Callback when the close button is clicked
}

const SignIn: React.FC<Props> = ({ onCloseButtonClick }) => {

  const [emailAddress, setEmailAddress] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Attempt the sign in
  function handleSignIn(email: string) {

    email = email; // todo remove this, once value is used

    // Todo: Check for 200 or 401 response from API

    setMessage(`Checking...`);
    setEmailSent(true);

    // Contact the API, and show a response
    setTimeout( () => {
      setMessage('Check your emails for instructions.');
    }, 2000);

  }

  return (

    <Outer>
      <BgSvgFullScreen />

      <HeaderCloseButton onClick={onCloseButtonClick} />

      <Panel>

        <PanelTitle>Sign in</PanelTitle>

        <PanelContent>

          <TextInput
            placeHolder={'Your email address'}
            onTextChanged={setEmailAddress}
            onEnterPressed={() => {handleSignIn(emailAddress); }}
          />

          <Message textSize={30}>{message}</Message>

        </PanelContent>

        <Buttons>
          {emailAddress && !emailSent &&
            <Button onClick={() => handleSignIn(emailAddress)} primary={true}>Sign in</Button>
          }
        </Buttons>

      </Panel>

    </Outer>
  );

};

export {
  SignIn,
};
