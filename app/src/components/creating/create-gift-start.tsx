import React, { useState } from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { AudioRecorder } from '../../components/audio-recorder';
import { Gift } from '../../domain';
import { WaitThen } from '../wait-then';
import { TextInput } from '../inputs/text-input';

/***
 * The start of making a gift
 * Several screens that allows a user to move the process
 *
 * User enters recipient name
 */

type Status = 'first-message' | 'second-message' | 'third-message' | 'enter-recipient' | 'record-greeting';

interface Props {
  gift: Gift;
  onRecipientNameSet: () => void;
  onComplete: () => void;
}

const CreateGiftStart: React.FC<Props> = ({ gift, onRecipientNameSet, onComplete }) => {

  // State
  const [status, setStatus] = useState<Status>('first-message');
  const [audioHasPlayed, setAudioHasPlayed] = useState(false);
  const [greetingIsRecording, setGreetingIsRecording] = useState(false);
  const [greetingIsRecorded, setGreetingIsRecorded] = useState(false);
  const [nameIsEntered, setNameIsEntered] = useState(false);

  // Defaults
  const defaultWait = 5;

  // Local values
  let audioRecorder: AudioRecorder;

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

    // Notify that the recipient name is set
    if (onRecipientNameSet) {
      onRecipientNameSet();
    }

    setStatus('record-greeting');
  }

  // Callbacks

  // Set the recipient name
  function handleRecipientNameChange( name: string ) {

    // Update the gift object
    gift.recipientName = name;

    // Set state
    setNameIsEntered(true);

  }

  function handleAudioPlaybackFinished() {
    setAudioHasPlayed(true);
  }

  function handleAudioRecordingStart() {

    // Set our state
    setGreetingIsRecorded(false);
    setGreetingIsRecording(true);

  }

  function handleAudioRecordingStop( fileUrl: string ) {

    // Set out state
    setGreetingIsRecorded(true);
    setGreetingIsRecording(false);

    // Update the gift
    gift.recipientGreeting = fileUrl;

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
      <Panel>
        <PanelContent>
          <TextInput placeHolder={'enter their first name'} onTextChanged={handleRecipientNameChange} />
        </PanelContent>
        <Buttons>
          {nameIsEntered && <Button onClick={gotoRecordGreeting}>Continue</Button>}
        </Buttons>
      </Panel>
    );
  }


  function renderRecordGreeting() {

    // check audio has already played ala script

    return (
      <>
        <PanelContent>
          {!greetingIsRecorded &&
            <AudioRecorder
              text={`Record a greeting for ${gift.recipientName}.`}
              onRecordingStop={handleAudioRecordingStop}
              onRecordingStart={handleAudioRecordingStart}
              ref={(recorder: AudioRecorder) => {audioRecorder = recorder; }}
            />
          }
          {greetingIsRecorded &&
            <AudioPlayer
              text={'Review your recording'}
              src={gift.recipientGreeting}
              forwardButton={'SkipSeconds'}
            />
          }
        </PanelContent>
        <Buttons>
          {!greetingIsRecorded && !greetingIsRecording &&
            <Button onClick={() => { audioRecorder.startRecording(); }} primary={true}>Start recording</Button>
          }
          {greetingIsRecording && <Button onClick={() => { audioRecorder.stopRecording(); }}>Stop recording</Button>}
          {greetingIsRecorded && <Button onClick={() => {setGreetingIsRecorded(false); }}>Re-record</Button>}
          {greetingIsRecorded && <Button primary={true} onClick={finishedThisSection}>Save Greeting</Button>}
        </Buttons>
      </>
    );
  }

  return (
    <Panel>

        {status === 'first-message' && renderFirstMessage()}
        {status === 'second-message' && renderSecondMessage()}
        {status === 'third-message' && renderThirdMessage()}
        {status === 'enter-recipient' && renderEnterRecipient()}
        {status === 'record-greeting' && renderRecordGreeting()}

    </Panel>
  );
};

export {
  CreateGiftStart,
};
