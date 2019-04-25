import React, { useState } from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { GiftPart } from '../../domain';
import { WaitThen } from '../wait-then';
import { PhotoCapture } from '../../components/photo-capture';
import { TextAreaInput } from '../../components/inputs/textarea-input';
import { romanNumeralFromDecimal } from '../../themes/global';

import { CreateGiftRecordAndPlayback } from './record-and-playback';

/***
 * Show the creating gift part content
 */

interface PartContentStyleProps {
  backgroundImage?: string; // data or url
  showWhiteOverlay?: boolean;
}

const PartContentStyle = styled(Panel)<PartContentStyleProps>`
  background-image: url(${(props) => props.backgroundImage});
  background-position: center;
  background-size: cover;
  position: relative;

  ${(props: PartContentStyleProps) =>
    props.showWhiteOverlay && `
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(255,255,255,0.3);
      pointer-events: none;
    }
  `}

`;

type Status =
  | 'first-message'
  | 'second-message'
  | 'take-photo'
  | 'pre-record-message'
  | 'record-message'
  | 'pre-clue-message1'
  | 'pre-clue-message2'
  | 'write-clue'
  | 'finish-message1'
  | 'finish-message2'
  | 'send'
;

export interface Props {
  recipientName: string;
  onComplete: (parts: GiftPart[]) => void; // When this component is finished
}

const CreatingPartContent: React.FC<Props> = ({ recipientName, onComplete }) => {

  // TODO: Abstract component to deal with one part at a a time
  // TODO: Abstract individual bits of part-creation out (maybe)

  // State
  const [giftPartIndex, setGiftPartIndex] = useState(0); // The current gift part index
  const [parts, setParts] = useState<GiftPart[]>([]); // TODO: clean the state up -- separate out
  const [status, setStatus] = useState<Status>('first-message');
  const [firstAudioHasPlayed, setFirstAudioHasPlayed] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [secondAudioHasPlayed, setSecondAudioHasPlayed] = useState(false);
  const [audioIsRecorded, setAudioIsRecorded] = useState(false);
  const [clueIsWritten, setClueIsWritten] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  // Defaults
  const defaultWait = 5;

  // Sets all state to initial values
  function resetState() {
    setFirstAudioHasPlayed(false);
    setShowCamera(false);
    setSecondAudioHasPlayed(false);
    setAudioIsRecorded(false);
    setClueIsWritten(false);
  }

  // Returns the gift part based on the index
  // Creates the gift part if it doesn't already exist
  function getGiftPart( index: number ) {

    // Return if exists
    if (parts[index]) {
      return parts[index];
    }

    // Create if not
    return parts[index] = {
      photo: '',
      note: '',
      clue: '',
    };

  }

  // Handle the photo being taken
  function handlePhotoTaken( fileUrl: string ) {

    // Record the photo file
    const giftPart: GiftPart = getGiftPart(giftPartIndex);
    giftPart.photo = fileUrl;

    // Set the background of this component
    setBackgroundImage(fileUrl);

    // Move to next section
    setStatus('pre-record-message');
  }

  function handleAudioRecordFinished() {
    // TODO
    setAudioIsRecorded(true);
    setStatus('pre-clue-message1');
  }

  function handleClueChanged( clue: string ) {

    // Get our gift
    const giftPart: GiftPart = getGiftPart(giftPartIndex);

    // Set the clue
    giftPart.clue = clue;

    // Set the state
    setClueIsWritten(true);

  }

  function clearClueAndNext() {

    // Get our gift
    const giftPart: GiftPart = getGiftPart(giftPartIndex);

    // Clear the clue
    giftPart.clue = '';

    // Set the state
    setClueIsWritten(false);

    // Next
    setStatus('finish-message1');

  }

  // Part creation is complete
  function handleAllComplete() {

    // Callback to continue
    if (onComplete) {
      onComplete(parts);
    }

  }

  // Start on part 2
  function handleStartPart2() {

    // Setup the second part
    resetState();

    // Set the index
    setGiftPartIndex(1);

    // Note no first message for part 2, jump to second part
    setStatus('second-message');
  }

  // Start on part 3
  function handleStartPart3() {

    // Setup the second part
    resetState();

    // Set the index
    setGiftPartIndex(2);

    // Note no first message for part 2, jump to second part
    setStatus('second-message');
  }


  // Render different bits of content
  function renderFirstMessage() {
    // note: only for gift part 1
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
          {giftPartIndex === 1 &&
            <AudioPlayer
              text={'Time to choose a second object...'}
              src={require('../../../src/assets/audio/c-choose-part-2.mp3')}
              forwardButton={'GoToEnd'}
              onPlaybackComplete={() => { setFirstAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 2 &&
            <AudioPlayer
              text={'Time to look for a final object...'}
              src={require('../../../src/assets/audio/c-choose-part-3.mp3')}
              forwardButton={'GoToEnd'}
              onPlaybackComplete={() => { setFirstAudioHasPlayed(true); }}
            />
          }
        </PanelContent>
        <Buttons>
          {/* <Button>Skip</Button> */}
          {firstAudioHasPlayed &&
            <Button onClick={() => {setStatus('take-photo'); }} primary={true}>Continue</Button>
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
          {giftPartIndex === 1 &&
            <PhotoCapture
              text={`Have a wander to find the second object for ${recipientName}.
                Why not visit another part of the museum?
                When you’ve found it take a photo to show them.`}
              textSize={47}
              onPhotoTaken={handlePhotoTaken}
              showCamera={showCamera}
            />
          }
          {giftPartIndex === 2 &&
            <PhotoCapture
              text={`Choose your last object and take a photo.`}
              onPhotoTaken={handlePhotoTaken}
              showCamera={showCamera}
            />
          }
        </PanelContent>
        <Buttons>
          {/* <Button onClick={() => {setStatus('second-message'); }}>Back</Button> */}
          <Button onClick={() => {setShowCamera(true); }} primary={true}>Open camera</Button>
        </Buttons>
      </>
    );
  }

  function renderPreRecordMessage() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <AudioPlayer
                text={`Let them know why you chose this object...`}
                src={require('../../../src/assets/audio/c-let-them-know-part-1.mp3')}
                forwardButton={'GoToEnd'}
                onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 1 &&
            <AudioPlayer
                text={`Tell them why you chose this...`}
                src={require('../../../src/assets/audio/c-let-them-know-part-2.mp3')}
                forwardButton={'GoToEnd'}
                onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 2 &&
            <AudioPlayer
                text={`And record your final message...`}
                src={require('../../../src/assets/audio/c-let-them-know-part-3.mp3')}
                forwardButton={'GoToEnd'}
                onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
            />
          }
        </PanelContent>
        <Buttons>
          {/* {secondAudioHasPlayed && <Button onClick={() => {setStatus('record-message'); }}>Skip</Button>} */}
          {secondAudioHasPlayed &&
            <Button onClick={() => {setStatus('record-message'); }} primary={true}>Record message</Button>
          }
        </Buttons>
      </>
    );
  }

  function renderRecordMessage() {
    const text = (giftPartIndex === 0) ? 'Let them know why you chose this object...'
               : (giftPartIndex === 1) ? 'Tell them why you chose this...'
               : (giftPartIndex === 2) ? 'And record your final message...'
               : '';

    return (
      <CreateGiftRecordAndPlayback
        text={text}
        saveButtonText={'Save Message'}
        onComplete={handleAudioRecordFinished}
      />
    );
  }

  function renderPreClueMessage1() {
    return (
      <>
        <PanelContent>
          <PanelPrompt
            text={`Now write a clue to help ${recipientName} find the object`}
            background={'transparent-black'}
          />
          {/* note: goto different next section based on gift part index */}
          {giftPartIndex === 0 &&
            <WaitThen
              wait={defaultWait}
              andThen={() => { setStatus('pre-clue-message2'); }}
            />
          }
          {giftPartIndex > 0  &&
            <WaitThen
              wait={defaultWait}
              andThen={() => { setStatus('write-clue'); }}
            />
          }
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
      <Panel>
        <PanelTitle>Making Part {romanNumeralFromDecimal(giftPartIndex + 1)}</PanelTitle>
        <PanelSubTitle>Write a clue</PanelSubTitle>
        <PanelContent>
            <TextAreaInput
              placeHolder={'Write a clue'}
              onTextChanged={handleClueChanged}
              onEnterPressed={handleClueChanged}
            />
        </PanelContent>
        <Buttons>
          {<Button onClick={() => clearClueAndNext()}>Skip</Button>}
          {clueIsWritten && <Button onClick={() => setStatus('finish-message1')} primary={true}>Save clue</Button>}
        </Buttons>
      </Panel>
    );
  }

  function renderFinishMessage1() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`Great, you’ve made part one of your gift for ${recipientName}.`}
              background={'transparent-black'}
            />
          }
          {giftPartIndex === 1 &&
            <PanelPrompt
              text={`Done!`}
              background={'transparent-black'}
            />
          }
          {/* note: goto different next section based on gift part index */}
          {giftPartIndex === 0 &&
            <WaitThen
              wait={defaultWait}
              andThen={() => { setStatus('finish-message2'); }}
            />
          }
          {giftPartIndex === 1 &&
            <WaitThen
              wait={defaultWait}
              andThen={() => { setStatus('send'); }}
            />
          }
          {giftPartIndex === 2 &&
            <WaitThen
              wait={defaultWait}
              andThen={() => { handleAllComplete(); }}
            />
          }
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
          {giftPartIndex === 1 &&
            <PanelPrompt
              text={`Do you want to add a final part or send it as it is? You can choose one more...`}
              background={'transparent-black'}
            />
          }
        </PanelContent>
        <Buttons>
          <Button onClick={handleAllComplete}>Send now</Button>
          {giftPartIndex === 0 &&
            <Button onClick={handleStartPart2} primary={true}>Add another object</Button>
          }
          {giftPartIndex === 1 &&
           <Button onClick={handleStartPart3} primary={true}>Add another object</Button>
          }
        </Buttons>
      </>
    );
  }

  return (
    <PartContentStyle backgroundImage={backgroundImage} showWhiteOverlay={true}>
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
    </PartContentStyle>
  );

};

export {
  CreatingPartContent,
};
