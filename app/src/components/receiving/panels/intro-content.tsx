import React, { useState } from 'react';

import { Panel, PanelContent } from '../../panel';
import { Buttons, Button } from '../../buttons';
import { AudioPlayer } from '../../../components/audio-player';
import { RecipientLocation } from '../../choose-location';
import { InProgressGift } from '../../../domain';

/***
 * Show the intro content
 */

export interface IntroContentProps {
  recipientLocation: RecipientLocation;
  audioIntroPlayed: boolean;
  gift: InProgressGift;
  onComplete?: () => void;
  handleAudioIntroPlayed: () => void;
}

// Todo : finish question
const ReceivingIntroContent: React.FC<IntroContentProps> = (props) => {

  const atMuseum = (props.recipientLocation === 'at-museum');
  const [audioPlaybackFinished, setAudioPlaybackFinished] = useState(false);

  function handleContinue() {

    // todo: check for skip in global state, show button below
    if (props.onComplete) {
      props.onComplete();
    }
  }

  // Our audio player has finished
  function handleAudioPlaybackFinished() {

    // Update our state
    setAudioPlaybackFinished(true);

    // Props callback
    if (props.handleAudioIntroPlayed) {
      props.handleAudioIntroPlayed();
    }
  }

  return (
    <Panel>

      <PanelContent>

        {/* todo : set audio paths */}
        {atMuseum &&
          <AudioPlayer
            message={'One thing before you start...'}
            src={require('../../../assets/audio/r-intro-content-1.mp3')}
            forwardButtonType={'go-to-end'}
            allowCompactRound={true}
            giftId={props.gift.id}
            eventReference={'receiving-intro-at-museum'}
            onPlaybackComplete={handleAudioPlaybackFinished}
          />
        }
        {!atMuseum &&
          <AudioPlayer
            message={'One thing before you start...'}
            src={require('../../../assets/audio/r-intro-content-1.mp3')} // todo this should be a different file
            forwardButtonType={'go-to-end'}
            giftId={props.gift.id}
            eventReference={'receiving-intro-not-at-museum'}
            onPlaybackComplete={handleAudioPlaybackFinished}
          />
        }
      </PanelContent>

      <Buttons>
        {/* todo: reinstate this */}
        {/* {props.audioIntroPlayed && <Button onClick={handleContinue}>Skip</Button>} */}
        {audioPlaybackFinished && <Button onClick={handleContinue} primary={true}>Continue</Button>}
      </Buttons>

    </Panel>
  );
};

export {
  ReceivingIntroContent,
};
