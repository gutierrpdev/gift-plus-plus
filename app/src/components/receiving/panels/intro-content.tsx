import React, { useState } from 'react';

import { Panel, PanelContent } from '../../panel';
import { Buttons, Button } from '../../buttons';
import { AudioPlayer } from '../../../components/audio-player';
import { RecipientLocation } from './choose-location';

/***
 * Show the intro content
 */

export interface IntroContentProps {
  visible?: boolean;
  recipientLocation: RecipientLocation;
  audioIntroPlayed: boolean;
  onComplete?: () => void;
  handleAudioIntroPlayed: () => void;
}

// Todo : finish question
const ReceivingIntroContent: React.FC<IntroContentProps> = (props) => {

  const atMuseum = (props.recipientLocation === 'AtMuseum');
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
    <Panel visible={props.visible}>

      <PanelContent>

        {/* todo : set audio paths */}
        {atMuseum &&
          <AudioPlayer
            text={'A message to you before you start...'}
            src={require('../../../assets/audio/r-intro-content-1.mp3')}
            forwardButton={'GoToEnd'}
            onPlaybackComplete={handleAudioPlaybackFinished}
          />
        }
        {!atMuseum &&
          <AudioPlayer
            text={'A message to you before we begin...'}
            src={require('../../../assets/audio/r-intro-content-1.mp3')} // todo this should be a different file
            forwardButton={'GoToEnd'}
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
