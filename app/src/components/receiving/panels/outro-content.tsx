import React, { useState } from 'react';

import { Panel, PanelContent } from '../../panel';
import { Buttons, Button } from '../../buttons';
import { AudioPlayer } from '../../../components/audio-player';
import { RecipientLocation } from '../../choose-location';
import { PanelPrompt } from '../../panel-prompt';
import { WaitThen } from '../../wait-then';
import { Gift } from '../../../domain';
import history from '../../../utils/router-history';
import { track, giftReceiveCompleteGoHomePressedEvent } from '../../../utils/events';

/**
 * Show the rreceiving outro content
 * !!This component has a temporary section which will be removed then the reply feature is added
 */

type OutroStatus = 'message' | 'outro';

export interface Props {
  recipientLocation: RecipientLocation;
  gift: Gift;
}

const ReceivingOutroContent: React.FC<Props> = ({recipientLocation, gift}) => {

  // todo: check for skip in global state, show skip button

  // State
  const [status, setStatus] = useState<OutroStatus>('message');
  const [audioPlaybackFinished, setAudioPlaybackFinished] = useState(false);

  function handleContinue() {

    // Track go home event
    track(giftReceiveCompleteGoHomePressedEvent( {giftId: gift.id} ));

    // Go to the home screen
    history.push('/home');

  }

  // Our audio player has finished
  function handleAudioPlaybackFinished() {

    // Update our state
    setAudioPlaybackFinished(true);

  }

  // Local
  const defaultWait = 5;
  const atMuseum = (recipientLocation === 'at-museum');
  const museumGift = (gift.kind === 'MuseumGift');

  // todo update these audio files
  const audioFile = atMuseum
  ? museumGift
    ? require('../../../assets/audio/r-outro-local.mp3')
    : require('../../../assets/audio/r-outro-local.mp3')
  // not at museum
  : museumGift
    ? require('../../../assets/audio/r-outro-local.mp3')
    : require('../../../assets/audio/r-outro-local.mp3');

  const eventReference = atMuseum
    ? museumGift
      ? 'receiving-outro-at-museum-museum-gift'
      : 'receiving-outro-at-museum-personal-gift'
    : museumGift
      ? 'receiving-outro-not-at-museum-museum-gift'
      : 'receiving-outro-not-at-museum-personal-gift';

  return (
    <Panel>

        {status === 'message' &&
        <PanelContent>
          <PanelPrompt
            text='You’ve unwrapped the whole gift'
            background={'transparent-black'}
          />
          <WaitThen
            wait={defaultWait}
            andThen={() => setStatus('outro')}
          />
        </PanelContent>
        }

        {status === 'outro' &&
        <>
          <PanelContent>
            <AudioPlayer
              message='Ready for the last bit?'
              src={audioFile}
              forwardButtonType={'go-to-end'}
              giftId={gift.id}
              eventReference={eventReference}
              onPlaybackComplete={handleAudioPlaybackFinished}
            />
          </PanelContent>

          <Buttons>
            {audioPlaybackFinished && <Button primary={true} onClick={handleContinue}>Continue</Button>}
          </Buttons>
        </>
        }

    </Panel>
  );
};

export {
  ReceivingOutroContent,
};
