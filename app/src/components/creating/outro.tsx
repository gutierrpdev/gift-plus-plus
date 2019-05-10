import React, { useState } from 'react';

import { Panel, PanelContent } from '../panel';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { Gift } from '../../domain';
import history from '../../utils/router-history';
import { track, giftCompleteGoHomePressedEvent } from '../../utils/events';

/**
 * Show the creating outro
 */

export interface Props {
  gift: Gift;
}

const ReceivingOutroContent: React.FC<Props> = ({ gift }) => {

  // State
  const [audioPlaybackFinished, setAudioPlaybackFinished] = useState(false);

  function handleContinue() {

    // Track go home event
    track(giftCompleteGoHomePressedEvent( {giftId: gift.id} ));

    // Go to the home screen
    history.push('/home');

  }


  return (
    <Panel>

      <PanelContent>
        <AudioPlayer
          message='Thank you...'
          src={require('../../../assets/audio/r-outro-local.mp3')}
          forwardButtonType={'go-to-end'}
          giftId={gift.id}
          eventReference={'create-gift-outro-audio'}
          onPlaybackComplete={() => {setAudioPlaybackFinished(true); }}
        />
      </PanelContent>

      <Buttons>
        {audioPlaybackFinished && <Button primary={true} onClick={handleContinue}>Continue</Button>}
      </Buttons>

    </Panel>
  );

};

export {
  ReceivingOutroContent,
};
