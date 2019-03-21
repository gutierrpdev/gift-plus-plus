import React, { useState } from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelImageReveal } from '../panel-image-reveal';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { AudioRecorder } from '../../components/audio-recorder';
import { Gift, GiftPart } from '../../domain';
import { WaitThen } from '../wait-then';
import { PhotoCapture } from '../../components/photo-capture';

/***
 * Show the creating gift part content
 */

type Status = 'first-message' | 'second-message' | 'take-photo' | 'pre-record-message' | 'record-message' |
  'pre-clue-message1' | 'pre-clue-message2' | 'write-clue' | 'finish-message1' | 'finish-message2' | 'send';

 // Extend panel props with extras
export interface Props {
  gift: Gift; // Pass in the whole gift.  This component will add all necessary parts
  onComplete: () => void;
}

const CreatingPartContent: React.FC<Props> = ({ gift }) => {

  // State
  const [giftPartIndex, setGiftPartIndex] = useState(0); // The current gift part index
  const [status, setStatus] = useState<Status>('first-message');
  const [firstAudioHasPlayed, setFirstAudioHasPlayed] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [secondAudioHasPlayed, setSecondAudioHasPlayed] = useState(false);
  const [audioIsRecorded, setAudioIsRecorded] = useState(false);
  const [clueIsWritten, setClueIsWritten] = useState(false);

  // Defaults
  const defaultWait = 1;

  function handlePhotoTaken() { // pass file
    // Handle file here // todo

    // Move to next section
    setStatus('pre-record-message');
  }

  function handleAudioRecordingComplete() {

    // todo apply the recording to the gift

    // Save it to the state ready for the confirm button
    // setAudioFileName('');
    setAudioIsRecorded(true);
  }

  function handleAudioRecordSave() {

    // todo: save the audio to the gift

    setStatus('pre-clue-message1');
  }

  function handleSaveClue() {
    // todo: save the clue to the gift

    setStatus('finish-message1');
  }

  function handleSendNow() {

  }

  function handleStartPart2() {
    // todo save the gift now?

    // Setup the second part

    // Set the index
    setGiftPartIndex(1);
    setStatus('first-message');
  }

  // Render different bits of content
  function renderFirstMessage() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt text={'Time to choose your first object from the museum'} background={'transparent-black'}/>
          }
          <WaitThen
            wait={defaultWait}
            andThen={() => { setStatus('second-message'); }}
          />
        </PanelContent>
        <Buttons />
      </>
    );
  }

  function renderSecondMessage() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <AudioPlayer
              text={'Listen while you look for your first object...'}
              src={require('../../../src/assets/audio/c-choose-part-1.mp3')}
              forwardButton={'GoToEnd'}
              onPlaybackComplete={() => { setFirstAudioHasPlayed(true); }}
            />
          }
        </PanelContent>
        <Buttons>
          {/* <Button onClick={gotoHereYouGo} primary={true}>Skip</Button> */}
          {firstAudioHasPlayed &&
            <Button onClick={() => {setStatus('take-photo'); }} primary={true}>OK</Button>
          }
        </Buttons>
      </>
    );
  }

  function renderTakePhoto() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PhotoCapture
              text={`If you’ve found your first object, take a photo so they can see what you’ve chosen.`}
              onPhotoTaken={handlePhotoTaken}
              showCamera={showCamera}
            />
          }
        </PanelContent>
        <Buttons>
          <Button onClick={() => {setStatus('second-message'); }}>Back</Button>
          <Button onClick={() => {setShowCamera(true); }} primary={true}>Open camera</Button>
        </Buttons>
      </>
    );
  }

  function renderPreRecordMessage() {
    return (
      <>
        <PanelContent>
          <AudioPlayer
              text={`Let them know why you chose this object...`}
              src={require('../../../src/assets/audio/c-let-them-know-part-1.mp3')}
              forwardButton={'GoToEnd'}
              onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
          />
        </PanelContent>
        <Buttons>
          {secondAudioHasPlayed && <Button onClick={() => {setStatus('record-message'); }}>Skip</Button>}
          {secondAudioHasPlayed && <Button onClick={() => {setStatus('record-message'); }}>Record message</Button>}
        </Buttons>
      </>
    );
  }

  function renderRecordMessage() {
    return (
      <>
        <PanelContent>
          <AudioRecorder
            text={`Let them know why you chose this object...`}
            onRecordingStop={handleAudioRecordingComplete}
          />
        </PanelContent>
        <Buttons>
          {/* {!audioIsRecorded && <Button>Start recording</Button>} */}
          {/* {greetingIsRecording && <Button>Stop recording</Button>} */}
          {/* {greetingIsRecorded && <Button>Re-record</Button>} */}
          {audioIsRecorded && <Button onClick={handleAudioRecordSave}>Save message</Button>}
        </Buttons>
      </>
    );
  }

  function renderPreClueMessage1() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`Now write a clue to help ${gift.recipientName} find the object`}
              background={'transparent-black'}
            />
          }
          <WaitThen
            wait={defaultWait}
            andThen={() => { setStatus('pre-clue-message2'); }}
          />
        </PanelContent>
        <Buttons />
      </>
    );
  }

  function renderPreClueMessage2() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`Mention the gallery you’re in... or something they can ask museum staff if they get really stuck.`}
              background={'transparent-black'}
            />
          }
          <WaitThen
            wait={defaultWait}
            andThen={() => { setStatus('write-clue'); }}
          />
        </PanelContent>
        <Buttons />
      </>
    );
  }

  function renderWriteClue() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <>
              <PanelPrompt text={`Write a clue`} background={'transparent-black'} />
              <p>Enter text</p>
            </>
          }
        </PanelContent>
        <Buttons>
          <Button>Skip</Button>
          {secondAudioHasPlayed && <Button onClick={handleSaveClue}>Save clue</Button>}
        </Buttons>
      </>
    );
  }

  function renderFinishMessage1() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`Great, you’ve made part one of your gift for ${gift.recipientName}.`}
              background={'transparent-black'}
            />
          }
          <WaitThen
            wait={defaultWait}
            andThen={() => { setStatus('finish-message2'); }}
          />
        </PanelContent>
        <Buttons />
      </>
    );
  }

  function renderFinishMessage2() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`They’re going to love it.`}
              background={'transparent-black'}
            />
          }
          <WaitThen
            wait={defaultWait}
            andThen={() => { setStatus('send'); }}
          />
        </PanelContent>
        <Buttons />
      </>
    );
  }

  function renderSend() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`Do you want to add part two or send it as it is? You can choose up to three.`}
              background={'transparent-black'}
            />
          }
        </PanelContent>
        <Buttons>
          <Button onClick={handleSendNow}>Send now</Button>
          <Button onClick={handleStartPart2}>Add another object</Button>
        </Buttons>
      </>
    );
  }

  return (
    <StyledPanel>
      {status === 'first-message' && renderFirstMessage()}
      {status === 'second-message' && renderSecondMessage()}
      {status === 'take-photo' && renderTakePhoto()}
      {status === 'pre-record-message' && renderPreRecordMessage()}
      {status === 'record-message' && renderRecordMessage()}
      {status === 'pre-clue-message1' && renderPreClueMessage1()}
      {status === 'pre-clue-message2' && renderPreClueMessage2()}
      {status === 'write-clue' && renderWriteClue()}
      {status === 'finish-message1' && renderFinishMessage1()}
      {status === 'finish-message2' && renderFinishMessage2()}
      {status === 'send' && renderSend()}
    </StyledPanel>
  );

};

export {
  CreatingPartContent,
};
