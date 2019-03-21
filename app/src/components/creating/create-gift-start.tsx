import React, { useState } from 'react';

import { romanNumeralFromDecimal } from '../../themes/global';
import { StyledPanel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { PanelImageReveal } from '../panel-image-reveal';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { AudioRecorder } from '../../components/audio-recorder';
// import { RecipientLocation } from './choose-location';
import { Gift, GiftPart } from '../../domain';
import { WaitThen } from '../wait-then';
// import { GiftPartBackground } from '../gift-part-background';
import { TextInput } from '../inputs/text-input';

/***
 * The start of making a gift
 * Several screens that allows a user to move the process
 *
 * User enters recipient name
 */

type Status = 'first-message' | 'second-message' | 'third-message' | 'enter-recipient' | 'record-greeting';

// Extend panel props with extras
interface Props {
  gift: Gift;
  onComplete: () => void;
}

const CreateGiftStart: React.FC<Props> = ({ gift, onComplete }) => {

  // State
  const [status, setStatus] = useState<Status>('enter-recipient');
  const [audioHasPlayed, setAudioHasPlayed] = useState(false);
  const [greetingIsRecording, setGreetingIsRecording] = useState(false);
  const [greetingIsRecorded, setGreetingIsRecorded] = useState(false);
  const [nameIsEntered, setnameIsEntered] = useState(false);

  // Defaults
  const defaultWait = 5;

  // Move to section
  function gotoSecondMessage() {
    setStatus('second-message');
  }

  function gotoThirdMessage() {
    setStatus('third-message');
  }

  function gotoEnterRecipient() {
    setStatus('enter-recipient');
  }

  function gotoRecordGreeting() {
    setStatus('record-greeting');
  }

  // Callbacks

  // Set the recipient name
  function handleRecipientNameChange( name: string ) {

    // Update the gift object
    gift.recipientName = name;

    // Set state
    setnameIsEntered(true);
  }

  function handleAudioPlaybackFinished() {
    setAudioHasPlayed(true);
  }

  function handleAudioRecordingComplete() {

    setGreetingIsRecorded(true);

    // todo apply the recording to the gift

  }

  // // Our audio player has finished
  // function handleAudioPlaybackFinished() {
  //   setAudioHasPlayed(true);
  // }

  // This section is complete
  function finishedThisSection() {
    if (onComplete) {
      onComplete();
    }
  }

  // Render different bits of content
  function renderFirstMessage() {
    return (
      <>
        <PanelContent>
          <PanelPrompt text={'You’re about to make a gift for someone special.'} background={'transparent-black'}/>
            <WaitThen
              wait={defaultWait}
              andThen={gotoSecondMessage}
            />
        </PanelContent>
        <Buttons/>
      </>
    );
  }

  function renderSecondMessage() {
    return (
      <>
        <PanelContent>
          <PanelPrompt
            text={`It might take two minutes. It might take twenty.
              It’s what you choose.`}
            background={'transparent-black'}
          />
            <WaitThen
              wait={defaultWait}
              andThen={gotoThirdMessage}
            />
        </PanelContent>
        <Buttons/>
      </>
    );
  }

  function renderThirdMessage() {
    // todo check audio has already played ala script
    // todo audio required
    // todo skip
    return (
      <>
        <PanelContent>
          <AudioPlayer
            text={'Who are you going to choose?'}
            src={require('../../../src/assets/audio/_1-second-of-silence.mp3')}
            forwardButton={'GoToEnd'}
            onPlaybackComplete={handleAudioPlaybackFinished}
          />
        </PanelContent>
        <Buttons>
          {audioHasPlayed && <Button onClick={gotoEnterRecipient} primary={true}>Enter their name</Button>}
        </Buttons>
      </>
    );
  }

  function renderEnterRecipient() {
    return (
      <StyledPanel>
        <PanelContent>
          <TextInput placeHolder={'enter their first name'} onTextChanged={handleRecipientNameChange} />
        </PanelContent>
        <Buttons>
          {nameIsEntered && <Button onClick={gotoRecordGreeting}>Continue</Button>}
        </Buttons>
      </StyledPanel>
    );
  }


  function renderRecordGreeting() {

    // check audio has already played ala script

    return (
      <>
        <PanelContent>
          <AudioRecorder
            text={`Record a greeting for ${gift.recipientName}.`}
            onRecordingStop={handleAudioRecordingComplete}
          />
        </PanelContent>
        <Buttons>
          {greetingIsRecording && <Button>Start recording</Button>}
          {greetingIsRecording && <Button>Stop recording</Button>}
          {greetingIsRecorded && <Button>Re-record</Button>}
          {greetingIsRecorded && <Button primary={true} onClick={finishedThisSection}>Save Greeting</Button>}
        </Buttons>
      </>
    );
  }

  return (
    <StyledPanel>

        {status === 'first-message' && renderFirstMessage()}
        {status === 'second-message' && renderSecondMessage()}
        {status === 'third-message' && renderThirdMessage()}
        {status === 'enter-recipient' && renderEnterRecipient()}
        {status === 'record-greeting' && renderRecordGreeting()}

    </StyledPanel>
  );
};

export {
  CreateGiftStart,
};
