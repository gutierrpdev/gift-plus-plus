import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import history from '../../utils/router-history';
import styled from 'styled-components';

import { LocalFile, InProgressGift, InProgressGiftPart } from '../../domain';

import { assetStore, events } from '../../services';
import {
  cPartStartedEvent,
  cPartPhotoCompletedEvent,
  cPartClueSkippedEvent,
  cPartClueCancelledEvent,
  cPartClueCompletedEvent,
  cPartCompletedEvent,
} from '../../event-definitions';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { AudioPlayer } from '../media/audio-player';
import { WaitThen } from '../utils/wait-then';
import { PhotoCapture } from '../media/photo-capture';
import { TextAreaModal } from '../../components/modals/text-area-modal';
import { CreateGiftRecordAndPlayback } from './record-and-playback';
import { InformationWindow } from '../modals/information-window';
import { HelpContent } from '../information/help';

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
  | 'pre-record-message'
  | 'record-message'
  | 'check-message'
  | 'pre-clue-message1'
  | 'pre-clue-message2'
  | 'finish-message1'
  | 'finish-message2'
  | 'send-or-add-more'
;

export interface Props {
  recipientName: string;
  gift: InProgressGift;
  onComplete: (parts: InProgressGiftPart[]) => void;
}

export const CreatingPartContent: React.FC<Props> = ({ recipientName, gift, onComplete }) => {

  // TODO: Abstract component to deal with one part at a a time
  // TODO: Abstract individual bits of part-creation out (maybe)

  // State
  const [giftPartIndex, setGiftPartIndex] = useState(0); // The current gift part index
  const [parts, setParts] = useState<InProgressGiftPart[]>([]); // TODO: clean the state up -- separate out
  const [currentPart, setCurrentPart] = useState<Partial<InProgressGiftPart>>({});

  const [status, setStatus] = useState<Status>('pre-record-message');
  const [firstAudioHasPlayed, setFirstAudioHasPlayed] = useState(false);
  const [secondAudioHasPlayed, setSecondAudioHasPlayed] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [showingEnterClue, setShowingEnterClue] = useState(false);
  const [helpIsOpen, setHelpIsOpen] = useState(false);

  // 1 | 2 | 3
  const partNumber = giftPartIndex + 1;

  useEffect(() => {
    events.track(cPartStartedEvent(gift.id, partNumber));
  }, [giftPartIndex]);

  // Defaults
  const defaultWait = 5;

  // Sets all state to initial values
  function resetState() {
    setFirstAudioHasPlayed(false);
    setSecondAudioHasPlayed(false);
    setCurrentPart({});
  }

  function openHelp() {
    setHelpIsOpen(true);
  }

  function handlePhotoTaken(file: LocalFile) {
    setCurrentPart({ ...currentPart, photo: file });
    // Use this image as the background of the component
    setBackgroundImage(file.url);
    setStatus('pre-record-message');
    history.push('/create-gift/part/record-message');
  }

  function handleAudioRecordFinished(file: LocalFile) {

    setCurrentPart({ ...currentPart, note: file });

    handleAudioChecked();

  }

  function handleAudioReRecord() {
    setStatus('check-message');
  }

  function handleAudioChecked() {

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
    // Note: part number is 1 based, rather than index 0 based.
    events.track(cPartCompletedEvent(gift.id, partNumber));

    parts[giftPartIndex] = currentPart as InProgressGiftPart; // eww
    onComplete(parts);
  }

  // Start on part 2
  function handleStartPart2() {
    events.track(cPartCompletedEvent(gift.id, partNumber));

    parts[giftPartIndex] = currentPart as InProgressGiftPart; // eww

    resetState();
    setGiftPartIndex(1);

    // Prep status for latter part
    setStatus('pre-record-message');
    // Note no first message for part 2, jump to second message
    history.push('/create-gift/part/second-message');

  }

  // Start on part 3
  function handleStartPart3() {
    events.track(cPartCompletedEvent(gift.id, partNumber));

    parts[giftPartIndex] = currentPart as InProgressGiftPart; // eww

    resetState();
    setGiftPartIndex(2);

    // Prep status for latter part
    setStatus('pre-record-message');
    // Note no first message for part 3, jump to second message
    history.push('/create-gift/part/second-message');

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
              onClick={() => { history.push('/create-gift/part/second-message'); }}
            />
          }
          <WaitThen
            wait={defaultWait}
            andThen={() => { history.push('/create-gift/part/second-message'); }}
          />
        </PanelContent>
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
              audioReference={'r-part1-look'}
              onPlaybackComplete={() => { setFirstAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 1 &&
            <AudioPlayer
              message={'Time to choose a second object...'}
              src={assetStore.assets.cChoosePart2}
              forwardButtonType={'go-to-end'}
              giftId={gift.id}
              audioReference={'r-part2-look'}
              onPlaybackComplete={() => { setFirstAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 2 &&
            <AudioPlayer
              message={'Time to look for a final object...'}
              src={assetStore.assets.cChoosePart3}
              forwardButtonType={'go-to-end'}
              giftId={gift.id}
              audioReference={'r-part3-look'}
              onPlaybackComplete={() => { setFirstAudioHasPlayed(true); }}
            />
          }
        </PanelContent>
        <PanelButtons>
          {firstAudioHasPlayed &&
            <Button
              onClick={() => {
                history.push('/create-gift/part/photo');
              }}
              primary={true}
            >
              Continue
            </Button>
          }
        </PanelButtons>
      </>
    );
  }

  function renderTakePhoto() {

    let photoCapture: PhotoCapture | null;

    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PhotoCapture
              text={`If you’ve found your first object, take a photo so they can see what you’ve chosen`}
              onPhotoTaken={(file) => {
                events.track(cPartPhotoCompletedEvent(gift.id, partNumber));
                handlePhotoTaken(file);
              }}
              ref={(pc) => {photoCapture = pc; }}
            />
          }
          {giftPartIndex === 1 &&
            <PhotoCapture
              text={`Have a wander to find the second object for ${recipientName}.
                Why not visit another part of the museum?
                When you’ve found it take a photo to show them`}
              textSize={42}
              onPhotoTaken={(file) => {
                events.track(cPartPhotoCompletedEvent(gift.id, partNumber));
                handlePhotoTaken(file);
              }}
              ref={(pc) => {photoCapture = pc; }}
            />
          }
          {giftPartIndex === 2 &&
            <PhotoCapture
              text={`Choose your last object and take a photo`}
              onPhotoTaken={(file) => {
                events.track(cPartPhotoCompletedEvent(gift.id, partNumber));
                handlePhotoTaken(file);
              }}
              ref={(pc) => {photoCapture = pc; }}
            />
          }
        </PanelContent>
        <PanelButtons>
          {/* <Button onClick={() => {setStatus('second-message'); }}>Back</Button> */}
          <Button onClick={() => {if (photoCapture) photoCapture.showCamera(); }} primary={true}>Open camera</Button>
        </PanelButtons>
      </>
    );
  }

  function renderPreRecordMessage() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <AudioPlayer
                message={`Great. Here's the next step...`}
                src={assetStore.assets.cLetThemKnowPart1}
                forwardButtonType={'go-to-end'}
                giftId={gift.id}
                audioReference={'r-part1-tell-them-why'}
                onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 1 &&
            <AudioPlayer
                message={`Tell them why you chose this...`}
                src={assetStore.assets.cLetThemKnowPart2}
                forwardButtonType={'go-to-end'}
                giftId={gift.id}
                audioReference={'r-part2-tell-them-why'}
                onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
            />
          }
          {giftPartIndex === 2 &&
            <AudioPlayer
                message={`And record your final message...`}
                src={assetStore.assets.cLetThemKnowPart3}
                forwardButtonType={'go-to-end'}
                giftId={gift.id}
                audioReference={'r-part3-tell-them-why'}
                onPlaybackComplete={() => { setSecondAudioHasPlayed(true); }}
            />
          }
        </PanelContent>
        <PanelButtons>
          {/* {secondAudioHasPlayed && <Button onClick={() => {setStatus('record-message'); }}>Skip</Button>} */}
          {secondAudioHasPlayed &&
            <Button onClick={() => {setStatus('record-message'); }} primary={true}>Record message</Button>
          }
        </PanelButtons>
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
        playbackMessage={'Listen back to check your message is OK...'}
        gift={gift}
        giftPartIndex={giftPartIndex}
        text={text}
        saveButtonText={'Save message'}
        onComplete={handleAudioRecordFinished}
        onReRecord={handleAudioReRecord}
      />
    );

  }

  function renderCheckMessage() {

    return (
      <>
        <PanelContent>
          <PanelPrompt
            background={'transparent-black'}
            text={`Problem recording?
              Try disconnecting headphones if you have them`}
          />
        </PanelContent>
        <PanelButtons>
          <Button onClick={openHelp}>Help</Button>
          <Button onClick={() => {setStatus('record-message'); }} primary={true}>OK</Button>
        </PanelButtons>
      </>
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
        <PanelButtons>
          <Button
            onClick={() => {
              events.track(cPartClueSkippedEvent(gift.id, partNumber));
              clearClueAndNext();
            }}
          >
            Skip
          </Button>
          <Button onClick={next}>Write a clue</Button>
        </PanelButtons>
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
      </>
    );
  }

  function renderSendOrAddMore() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt
              text={`Do you want to add another object or send it as it is? You can choose up to three`}
              background={'transparent-black'}
            />
          }
          {giftPartIndex === 1 &&
            <PanelPrompt
              text={`Do you want to add a final object or send it as it is?`}
              background={'transparent-black'}
            />
          }
        </PanelContent>
        <PanelButtons>
          <Button onClick={handleAllComplete}>Send now</Button>
          {giftPartIndex === 0 &&
            <Button onClick={handleStartPart2} primary={true}>Add another</Button>
          }
          {giftPartIndex === 1 &&
           <Button onClick={handleStartPart3} primary={true}>Add another</Button>
          }
        </PanelButtons>
      </>
    );
  }

  return (

    <>
      {showingEnterClue &&
        <TextAreaModal
          placeHolder='Write a clue'
          onSaveClick={(clue: string) => {
            events.track(cPartClueCompletedEvent(gift.id, partNumber));
            handleClueSet(clue);
          }}
          onCancelClick={() => {
            events.track(cPartClueCancelledEvent(gift.id, partNumber));
            setShowingEnterClue(false);
          }}
        />
      }

      {helpIsOpen &&
        <InformationWindow
          onClose={() => { setHelpIsOpen(false); }}
        >
          <HelpContent />
        </InformationWindow>
      }

      <PartContentStyle backgroundImage={backgroundImage} showWhiteOverlay={true}>

        <Switch>

          {/* first message */}
          <Route exact={true} path='/create-gift/part/first-message'>
            {renderFirstMessage()}
          </Route>

          {/* second message */}
          <Route exact={true} path='/create-gift/part/second-message'>
            {renderSecondMessage()}
          </Route>

          {/* photo */}
          <Route exact={true} path='/create-gift/part/photo'>
            {renderTakePhoto()}
          </Route>

          {/* record message */}
          <Route exact={true} path='/create-gift/part/record-message'>
            {status === 'pre-record-message' && renderPreRecordMessage()}
            {status === 'record-message' && renderRecordMessage()}
            {status === 'check-message' && renderCheckMessage()}
            {status === 'pre-clue-message1' && renderPreClueMessage1()}
            {status === 'pre-clue-message2' && renderPreClueMessage2()}
            {status === 'finish-message1' && renderFinishMessage1()}
            {status === 'finish-message2' && renderFinishMessage2()}
            {status === 'send-or-add-more' && renderSendOrAddMore()}
          </Route>

        </Switch>

      </PartContentStyle>

    </>
  );

};
