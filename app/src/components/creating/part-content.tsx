import React, { useState } from 'react';
import styled from 'styled-components';

import { assetStore } from '../../services';

import { LocalFile, InProgressGift, InProgressGiftPart } from '../../domain';
import { track, giftPartCompletedEvent, photoTakenEvent } from '../../utils/events';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../media/audio-player';
import { WaitThen } from '../utils/wait-then';
import { PhotoCapture } from '../media/photo-capture';
import { TextAreaModal } from '../../components/modals/text-area-modal';
import { CreateGiftRecordAndPlayback } from './record-and-playback';


/***
 * Show the creating gift part content
 */

export type CreateGiftNextStep = 'wrap-up' | 'add-more';

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
  | 'finish-message1'
  | 'finish-message2'
  | 'send-or-add-more'
;

export interface Props {
  recipientName: string;
  gift: InProgressGift; // TODO: Remove this? -- only gift.id is used, and that's just for events.
  onComplete: (parts: InProgressGiftPart[]) => void;
}

const CreatingPartContent: React.FC<Props> = ({ recipientName, gift, onComplete }) => {

  // TODO: Abstract component to deal with one part at a a time
  // TODO: Abstract individual bits of part-creation out (maybe)

  // State
  const [giftPartIndex, setGiftPartIndex] = useState(0); // The current gift part index
  const [parts, setParts] = useState<InProgressGiftPart[]>([]); // TODO: clean the state up -- separate out
  const [currentPart, setCurrentPart] = useState<Partial<InProgressGiftPart>>({});

  const [status, setStatus] = useState<Status>('first-message');
  const [firstAudioHasPlayed, setFirstAudioHasPlayed] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [secondAudioHasPlayed, setSecondAudioHasPlayed] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [showingEnterClue, setShowingEnterClue] = useState(false);

  // Defaults
  const defaultWait = 5;

  // Sets all state to initial values
  function resetState() {
    setFirstAudioHasPlayed(false);
    setShowCamera(false);
    setSecondAudioHasPlayed(false);
    setCurrentPart({});
  }


  function handlePhotoTaken(file: LocalFile) {
    setCurrentPart({ ...currentPart, photo: file });
    // Use this image as the background of the component
    setBackgroundImage(file.url);
    setStatus('pre-record-message');
  }


  function handleAudioRecordFinished(file: LocalFile) {

    setCurrentPart({ ...currentPart, note: file });

    // Go to next part
    // Parts 2 and 3 don't have the first clue section
    giftPartIndex === 0
      ? setStatus('pre-clue-message1')
      : setStatus('pre-clue-message2');

  }

  function handleClueSet( clue: string ) {

    // Store the clue
    setCurrentPart({ ...currentPart, clue });

    // Hide the dialog
    setShowingEnterClue(false);

    // Next
    setStatus('finish-message1');

  }

  function clearClueAndNext() {

    setCurrentPart({ ...currentPart, clue: '' });

    // Next
    setStatus('finish-message1');

  }


  // Part creation is complete
  function handleAllComplete() {

    parts[giftPartIndex] = currentPart as InProgressGiftPart; // eww

    // Note: part number is 1 based, rather than index 0 based.
    track(giftPartCompletedEvent( {giftId: gift.id, partNumber: giftPartIndex + 1, nextStep: 'wrap-up'} ));

    onComplete(parts);

  }

  // Start on part 2
  function handleStartPart2() {

    parts[giftPartIndex] = currentPart as InProgressGiftPart; // eww

    resetState();

    setGiftPartIndex(1);

    track(giftPartCompletedEvent( {giftId: gift.id, partNumber: giftPartIndex + 1, nextStep: 'add-more'} ));

    // Note no first message for part 2, jump to second section
    setStatus('second-message');

  }

  // Start on part 3
  function handleStartPart3() {

    parts[giftPartIndex] = currentPart as InProgressGiftPart; // eww

    resetState();

    setGiftPartIndex(2);

    track(giftPartCompletedEvent( {giftId: gift.id, partNumber: giftPartIndex + 1, nextStep: 'add-more'} ));

    // Note no first message for part 3, jump to second section
    setStatus('second-message');

  }


  // Render different bits of content
  function renderFirstMessage() {
    // note: only for gift part 1
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`Thanks! Time to choose your first object for ${recipientName}`}
              background={'transparent-black'}
              onClick={() => { setStatus('second-message'); }}
            />
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
              message={'Listen while you look for your first object...'}
              src={assetStore.assets.cChoosePart1}
              forwardButtonType={'go-to-end'}
              giftId={gift.id}
              eventReference={'creating-part-look-first-object'}
              onPlaybackComplete={() => { setFirstAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 1 &&
            <AudioPlayer
              message={'Time to choose a second object...'}
              src={assetStore.assets.cChoosePart2}
              forwardButtonType={'go-to-end'}
              giftId={gift.id}
              eventReference={'creating-part-look-second-object'}
              onPlaybackComplete={() => { setFirstAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 2 &&
            <AudioPlayer
              message={'Time to look for a final object...'}
              src={assetStore.assets.cChoosePart3}
              forwardButtonType={'go-to-end'}
              giftId={gift.id}
              eventReference={'creating-part-look-third-object'}
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
              text={`If you’ve found your first object, take a photo so they can see what you’ve chosen`}
              onPhotoTaken={(file) => {
                handlePhotoTaken(file);
                track(photoTakenEvent( {giftId: gift.id, photoType: 'creating-part-1-photo'} ));
              }}
              showCamera={showCamera}
            />
          }
          {giftPartIndex === 1 &&
            <PhotoCapture
              text={`Have a wander to find the second object for ${recipientName}.
                Why not visit another part of the museum?
                When you’ve found it take a photo to show them`}
              textSize={42}
              onPhotoTaken={(file) => {
                handlePhotoTaken(file);
                track(photoTakenEvent( {giftId: gift.id, photoType: 'creating-part-2-photo'} ));
              }}
              showCamera={showCamera}
            />
          }
          {giftPartIndex === 2 &&
            <PhotoCapture
              text={`Choose your last object and take a photo`}
              onPhotoTaken={(file) => {
                handlePhotoTaken(file);
                track(photoTakenEvent( {giftId: gift.id, photoType: 'creating-part-3-photo'} ));
              }}
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
                message={`OK. You've taken a photo`}
                src={assetStore.assets.cLetThemKnowPart1}
                forwardButtonType={'go-to-end'}
                giftId={gift.id}
                eventReference={'creating-part-why-choosen-first-object'}
                onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 1 &&
            <AudioPlayer
                message={`Tell them why you chose this...`}
                src={assetStore.assets.cLetThemKnowPart2}
                forwardButtonType={'go-to-end'}
                giftId={gift.id}
                eventReference={'creating-part-why-choosen-second-object'}
                onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 2 &&
            <AudioPlayer
                message={`And record your final message...`}
                src={assetStore.assets.cLetThemKnowPart3}
                forwardButtonType={'go-to-end'}
                giftId={gift.id}
                eventReference={'creating-part-why-choosen-third-object'}
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

    const text = (giftPartIndex === 0) ? `Let ${recipientName} know why you chose this object...`
               : (giftPartIndex === 1) ? 'Tell them why you chose this...'
               : (giftPartIndex === 2) ? 'And record your final message...'
               : '';

    return (
      <CreateGiftRecordAndPlayback
        playbackMessage={'Listen back to your message...'}
        gift={gift}
        text={text}
        saveButtonText={'Save greeting'}
        eventReference='create-gift-part-why-this-object'
        onComplete={handleAudioRecordFinished}
      />
    );

  }

  function renderPreClueMessage1() {

    // This part is only show for gift part 1. 2 and 3 skip it.
    const next = () => { setStatus('pre-clue-message2'); };

    return (
      <>
        <PanelContent>
          <PanelPrompt
            background={'transparent-black'}
            text={`Now write a clue to help ${recipientName} find the object`}
            onClick={next}
          />
          <WaitThen
            wait={defaultWait}
            andThen={next}
          />
        </PanelContent>
        <Buttons />
      </>
    );
  }

  function renderPreClueMessage2() {

    const text = (giftPartIndex === 0)
      ? `Mention the gallery you’re in... or something they can ask museum staff if they get really stuck`
      : `Now write a clue to help ${recipientName} find the object`;

    const next = () => { setShowingEnterClue(true); };

    return (
      <>
        <PanelContent>
          <PanelPrompt
            text={text}
            background={'transparent-black'}
            onClick={next}
          />
        </PanelContent>
        <Buttons>
          <Button onClick={clearClueAndNext}>Skip</Button>
          <Button onClick={next}>Write a clue</Button>
        </Buttons>
      </>
    );
  }

  function renderFinishMessage1() {

    // goto different next section based on gift part index
    // Return the function to call next
    const next = () => {
      switch (giftPartIndex) {
        case 0 :
          return setStatus('finish-message2');
        case 1 :
          return setStatus('send-or-add-more');
        case 2 :
          return handleAllComplete();
        default :
          return {};
      }
    };

    const text = giftPartIndex === 0
      ? `Great, you’ve made part one of your gift for ${recipientName}`
      : `Done!`;

    return (
      <>
        <PanelContent>
          <PanelPrompt
            text={text}
            background={'transparent-black'}
            onClick={next}
          />
          <WaitThen
            wait={defaultWait}
            andThen={next}
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
              text={`They’re going to love it`}
              background={'transparent-black'}
              onClick={() => { setStatus('send-or-add-more'); }}
            />
          }
          <WaitThen
            wait={defaultWait}
            andThen={() => { setStatus('send-or-add-more'); }}
          />
        </PanelContent>
        <Buttons />
      </>
    );
  }

  function renderSendOrAddMore() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`Do you want to add part two or send it as it is? You can choose up to three`}
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
    <>
      {showingEnterClue &&
        <TextAreaModal
          placeHolder='Write a clue'
          onSaveClick={(clue: string) => { handleClueSet(clue); }}
          onCancelClick={() => { setShowingEnterClue(false); }}
        />
      }

      <PartContentStyle backgroundImage={backgroundImage} showWhiteOverlay={true}>
        {status === 'first-message' && renderFirstMessage()}
        {status === 'second-message' && renderSecondMessage()}
        {status === 'take-photo' && renderTakePhoto()}
        {status === 'pre-record-message' && renderPreRecordMessage()}
        {status === 'record-message' && renderRecordMessage()}
        {status === 'pre-clue-message1' && renderPreClueMessage1()}
        {status === 'pre-clue-message2' && renderPreClueMessage2()}
        {status === 'finish-message1' && renderFinishMessage1()}
        {status === 'finish-message2' && renderFinishMessage2()}
        {status === 'send-or-add-more' && renderSendOrAddMore()}
      </PartContentStyle>

    </>
  );

};

export {
  CreatingPartContent,
};
