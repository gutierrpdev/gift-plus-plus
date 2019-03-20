import React, { useState } from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { Buttons, Button } from '../../buttons';
import { AudioPlayer } from '../../../components/audio-player';
import { RecipientLocation } from './choose-location';

/***
 * Show the intro content
 */

// Extend panel props with extras
export interface IntroContentProps extends PanelProps {
  recipientLocation: RecipientLocation;
  audioIntroPlayed: boolean;
  onComplete?: () => void;
  handleAudioIntroPlayed: () => void;
}

// Todo : finish question
const ReceivingIntroContent: React.FC<IntroContentProps> = (panelProps) => {

  const atMuseum = (panelProps.recipientLocation === 'AtMuseum');
  const [audioPlaybackFinished, setAudioPlaybackFinished] = useState(false);

  function handleContinue() {

    // todo: check for skip in global state, show button below
    if (panelProps.onComplete) {
      panelProps.onComplete();
    }
  }

  // Our audio player has finished
  function handleAudioPlaybackFinished() {

    // Update our state
    setAudioPlaybackFinished(true);

    // Props callback
    if (panelProps.handleAudioIntroPlayed) {
      panelProps.handleAudioIntroPlayed();
    }
  }

  return (
    <StyledPanel visible={panelProps.visible}>

      <PanelContent>

        {/* todo : set audio paths */}
        {atMuseum &&
          <AudioPlayer
            text={'A message to you before you start...'}
            src={require('../../../assets/audio/_1-second-of-silence.mp3')}
            forwardButton={'GoToEnd'}
            onPlaybackComplete={handleAudioPlaybackFinished}
          />
        }
        {!atMuseum &&
          <AudioPlayer
            text={'A message to you before we begin...'}
            src={require('../../../assets/audio/_1-second-of-silence.mp3')}
            forwardButton={'GoToEnd'}
            onPlaybackComplete={handleAudioPlaybackFinished}
          />
        }
      </PanelContent>

      <Buttons>
        {/* todo: reinstate this */}
        {/* {panelProps.audioIntroPlayed && <Button onClick={handleContinue}>Skip</Button>} */}
        <Button onClick={handleContinue} primary={true}>Continue</Button>
      </Buttons>

    </StyledPanel>
  );
};

export {
  ReceivingIntroContent,
};
