import React, { useState } from 'react';

import { assetStore } from '../../services';

import { Panel, PanelContent } from '../panel';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { AudioPlayer } from '../media/audio-player';
import { InProgressGift } from '../../domain';
import history from '../../utils/router-history';
import { track, giftCompleteGoHomePressedEvent } from '../../utils/events';

/**
 * Show the creating outro
 */

export interface Props {
  gift: InProgressGift;
}

const CreatingOutro: React.FC<Props> = ({ gift }) => {

  // State
  const [audioPlaybackFinished, setAudioPlaybackFinished] = useState(false);

  function handleContinue() {

    // Track go home event
    track(giftCompleteGoHomePressedEvent( {giftId: gift.id} ));

    // Go to the home screen
    history.push('/');

  }


  return (
    <Panel>

      <PanelContent>
        <AudioPlayer
          message='Thank you...'
          src={assetStore.assets.cShare}
          forwardButtonType={'go-to-end'}
          onPlaybackComplete={() => {setAudioPlaybackFinished(true); }}
        />
      </PanelContent>

      <PanelButtons>
        {audioPlaybackFinished && <Button primary={true} onClick={handleContinue}>Done</Button>}
      </PanelButtons>

    </Panel>
  );

};

export {
  CreatingOutro,
};
