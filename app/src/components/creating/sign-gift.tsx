import React, { useState } from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { PanelPlus } from '../panel-plus';
import { PanelRound } from '../panel-round';
import { Buttons, Button } from '../buttons';
import { Gift } from '../../domain';
import { TextInput } from '../inputs/text-input';
import { ProgressLoader } from '../progress-loader';
import { ShareGift } from '../share-gift';

/**
 * Sign the gift
 *
 * TODO: Refactor -- there's a bit too much going on in here. Signing a gift
 * should probably be distinct from sending and sharing.
 */

type Status =
  | 'first-message'
  | 'enter-name'
  | 'saving'
  | 'saving-failed'
  | 'ready-to-send'
  | 'share'
;

interface Props {}

export const SignGift: React.FC<Props> = () => {

  // State
  const [status, setStatus] = useState<Status>('first-message');
  const [saveProgress, setSaveProgress] = useState(50);
  const [senderName, setSenderName] = useState('');


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
          <TextInput
            placeHolder={'Your first name'}
            onTextChanged={setSenderName}
            // onEnterPressed={() => {onComplete(recipientName); }}
          />
        </PanelContent>
        <Buttons>
          {senderName &&
           <Button onClick={() => setStatus('saving')} primary={true}>Enter</Button>
          }
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
      setStatus('share');
    }, 3000);

    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Saving it</PanelSubTitle>
        <PanelContent>
          <PanelRound background='transparent-black'>
            <ProgressLoader text='Saving' percent={saveProgress} colour='white' />
          </PanelRound>
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

  function renderShare() {

    return (
      <Panel>
        <PanelTitle>Share your gift</PanelTitle>
        {/* <PanelSubTitle>Ready to send</PanelSubTitle> */}
        <PanelContent>
          <ShareGift url='https://thegift.app/' />
        </PanelContent>
        <Buttons>
          {/* <Button>OK</Button> */}
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
      {status === 'share' && renderShare()}
    </>
  );
};
