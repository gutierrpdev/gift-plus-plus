import React, { useState } from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelImageReveal } from '../panel-image-reveal';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
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
  // gift: Gift; // Pass in the whole gift.  This component will add all necessary parts
  // giftPartIndex: number; // The index of this gift part
  onComplete: () => void;
}

const CreatingPartContent: React.FC<Props> = ({ /*gift*/ }) => {

  // State
  const [status, setStatus] = useState<Status>('take-photo');
  const [giftPartIndex, setGiftPartIndex] = useState(0);
  const [firstAudioHasPlayed, setFirstAudioHasPlayed] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  // Defaults
  const defaultWait = 1;

  function handlePhotoTaken() { // pass file
    // Handle file here
    // setPhotoTaken(true);

    // Move to next section
    setStatus('pre-record-message');
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
            <>
              {showCamera &&
                <PhotoCapture
                  text={`If you’ve found your first object, take a photo so they can see what you’ve chosen.`}
                  onPhotoTaken={handlePhotoTaken}
                />
              }
              {!showCamera &&
                <PanelPrompt
                  text={'If you’ve found your first object, take a photo so they can see what you’ve chosen.'}
                  background={'transparent-black'}
                />
              }
            </>
          }
        </PanelContent>
        <Buttons>
          <Button onClick={() => {setShowCamera(true); }} primary={true}>Open camera</Button>
        </Buttons>
      </>
    );
  }

  return (
    <StyledPanel>
      {status === 'first-message' && renderFirstMessage()}
      {status === 'second-message' && renderSecondMessage()}
      {status === 'take-photo' && renderTakePhoto()}
    </StyledPanel>
  );

};

export {
  CreatingPartContent,
};
