import React, { useState } from 'react';

import { assetStore } from '../../../services';

import { Panel, PanelContent } from '../../panel';
import { PanelButtons } from '../../panel-buttons';
import { Button } from '../../buttons';
import { AudioPlayer } from '../../media/audio-player';
import { RecipientLocation } from '../../choose-location';
import { Gift } from '../../../domain';

/**
 * Show the intro content
 */

export interface Props {
  recipientLocation: RecipientLocation;
  audioIntroPlayed: boolean; // todo check this
  gift: Gift;
  onComplete?: () => void;
  handleAudioIntroPlayed: () => void;
}

const ReceivingIntroContent: React.FC<Props> = (props) => {

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

  const audioFile = atMuseum
    ? museumGift
      ? assetStore.assets.rIntroContentAtMuseumMuseumGift
      : assetStore.assets.rIntroContentAtMuseumPersonalGift
    // not at museum
    : museumGift
      ? assetStore.assets.rIntroContentNotAtMuseumMuseumGift
      : assetStore.assets.rIntroContentNotAtMuseumPersonalGift;

  const eventReference = atMuseum
    ? museumGift
      ? 'receiving-intro-at-museum-museum-gift'
      : 'receiving-intro-at-museum-personal-gift'
    : museumGift
      ? 'receiving-intro-not-at-museum-museum-gift'
      : 'receiving-intro-not-at-museum-personal-gift';

  return (
    <Panel isParent={false}>

      <PanelContent>

        <AudioPlayer
          message={'Start here...'}
          src={audioFile}
          forwardButtonType={'go-to-end'}
          onPlaybackComplete={handleAudioPlaybackFinished}
        />

      </PanelContent>

      <PanelButtons>
        {/* todo: reinstate this */}
        {/* {props.audioIntroPlayed && <Button onClick={handleContinue}>Skip</Button>} */}
        {audioPlaybackFinished && <Button onClick={handleContinue} primary={true}>Continue</Button>}
      </PanelButtons>

    </Panel>
  );
};

export {
  ReceivingIntroContent,
};
