import React, { useState } from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { PanelPlus } from '../panel-plus';
import { Buttons, Button } from '../buttons';
import { Gift } from '../../domain';
import { TextInput } from '../inputs/text-input';
import { ProgressLoader } from '../progress-loader';

/***
 * Sign the gift
 */

type Status = 'first-message' | 'enter-name' | 'saving' | 'saving-failed' | 'ready-to-send';

interface Props {
  gift: Gift;
  isVerifiedUser: boolean;
  userName?: string; // User name if logged in user
}

const SignGift: React.FC<Props> = ({ isVerifiedUser, userName }) => {

  // State
  const [status, setStatus] = useState<Status>('first-message');
  const [saveProgress, setSaveProgress] = useState(0);
  const [senderName, setSenderName] = useState('');
  const [senderEmailAddress, setSenderEmailAddress] = useState('');

  // Handlers
  function handleFirstNameChange( name: string ) {
    setSenderName(name);
  }

  function handleEmailChange( email: string ) {
    setSenderEmailAddress(email);
  }

  // Render different bits of content
  function renderFirstMessage() {
    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Sign it</PanelSubTitle>
        <PanelContent>
          <PanelPlus text={'Now sign your gift'} onClick={() => {setStatus('enter-name'); }} />
        </PanelContent>
        <Buttons>
          <Button onClick={() => setStatus('enter-name')} primary={true}>Add my name</Button>
        </Buttons>
      </Panel>
    );
  }

  function renderEnterName() {
    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Sign it</PanelSubTitle>
        <PanelContent>
          {isVerifiedUser &&
            <TextInput placeHolder={'Your first name'} defaultValue={userName} onTextChanged={handleFirstNameChange} />
          }
          {!isVerifiedUser &&
            <>
              <TextInput placeHolder={'Your first name'} onTextChanged={handleFirstNameChange} />
              <TextInput placeHolder={'Your email'} inputType={'email'} onTextChanged={handleEmailChange} />
            </>
          }
        </PanelContent>
        <Buttons>
          {senderName && senderEmailAddress &&
            <Button onClick={() => setStatus('saving')} primary={true}>Enter</Button>}
        </Buttons>
      </Panel>
    );
  }

  function renderSaving() {

    // Todo : this should be the upload to API
    setTimeout( () => {
      // Upload not successful
      // setSaveProgress(50);
      // setStatus('saving-failed');

      // Upload successful
      setSaveProgress(100);
      setStatus('ready-to-send');
    }, 1000);

    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Saving it</PanelSubTitle>
        <PanelContent>
          <ProgressLoader text='Saving' percent={saveProgress} colour='white' />
        </PanelContent>
        <Buttons>
          <Button onClick={() => setStatus('saving')} primary={true}>Enter</Button>
        </Buttons>
      </Panel>
    );
  }

  function renderSavingFailed() {

    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Saving failed</PanelSubTitle>
        <PanelContent>
          <PanelPrompt text={`Please check you're connected to the internet`} />
        </PanelContent>
        <Buttons>
          <Button onClick={() => setStatus('saving')} primary={true}>Try again</Button>
          <Button>Help</Button>
        </Buttons>
      </Panel>
    );
  }

  function renderReadyToSend() {

    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Ready to send</PanelSubTitle>
        <PanelContent>
          <PanelPrompt
            background={'transparent-black'}
            text={`We’ve sent you an email.
              Please click on the link in the email to confirm your address.`}
          />
        </PanelContent>
        <Buttons>
          <Button onClick={() => {}} primary={true}>Re-send email</Button>
          <Button>Help</Button>
        </Buttons>
      </Panel>
    );
  }

  return (
    <>
      {status === 'first-message' && renderFirstMessage()}
      {status === 'enter-name' && renderEnterName()}
      {status === 'saving' && renderSaving()}
      {status === 'saving-failed' && renderSavingFailed()}
      {status === 'ready-to-send' && renderReadyToSend()}
    </>
  );

};

export {
  SignGift,
};
