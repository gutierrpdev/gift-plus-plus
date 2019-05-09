import React, { useState } from 'react';

import { Panel, PanelContent } from '../../panel';
import { Buttons, Button } from '../../buttons';
import { AudioPlayer } from '../../../components/audio-player';
import { RecipientLocation } from '../../choose-location';
import { Gift } from '../../../domain';

/**
 * Show the intro content
 */

export interface IntroContentProps {
  recipientLocation: RecipientLocation;
  audioIntroPlayed: boolean;
  gift: Gift;
  onComplete?: () => void;
  handleAudioIntroPlayed: () => void;
}

const ReceivingIntroContent: React.FC<IntroContentProps> = (props) => {

  // State
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

  // Local
  const atMuseum = (props.recipientLocation === 'at-museum');
  const museumGift = (props.gift.kind === 'MuseumGift');
  // TODO: update these audio files
  const audioFile = atMuseum
    ? museumGift
      ? require('../../../assets/audio/r-intro-content-1.mp3')
      : require('../../../assets/audio/r-intro-content-1.mp3')
    // not at museum
    : museumGift
      ? require('../../../assets/audio/r-intro-content-1.mp3')
      : require('../../../assets/audio/r-intro-content-1.mp3');
  const eventReference = atMuseum
    ? 'receiving-intro-at-museum'
    : 'receiving-intro-not-at-museum';

  return (
    <Panel>

      <PanelContent>

        <AudioPlayer
          message={'One thing before you start...'}
          src={audioFile}
          forwardButtonType={'go-to-end'}
          allowCompactRound={true}
          giftId={props.gift.id}
          eventReference={eventReference}
          onPlaybackComplete={handleAudioPlaybackFinished}
        />

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
