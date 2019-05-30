import React, { useState } from 'react';

import { assetStore } from '../../services';

import { Panel, PanelContent } from '../panel';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { AudioPlayer } from '../media/audio-player';
import { TextInputModal } from '../modals/text-input-modal';

/**
 * The start of making a gift. User enters recipient name.
 */

interface Props {
  onComplete: (recipientName: string) => void; // Callback to call when name is entered
}

export const CreateGiftChooseRecipient: React.FC<Props> = ({ onComplete }) => {

  // State
  const [showingEnterRecipient, setShowingEnterRecipient] = useState(false);
  const [audioHasPlayed, setAudioHasPlayed] = useState(false);

  return (
    <>

      {showingEnterRecipient &&
        <TextInputModal
          placeHolder='Their first name'
          onSaveClick={(recipientName) => { onComplete(recipientName); }}
          onCancelClick={() => { setShowingEnterRecipient(false); }}
        />
      }

      <Panel>

        <PanelContent>

          <AudioPlayer
            message={'Who are you going to choose?'}
            src={assetStore.assets.cStart}
            forwardButtonType={'go-to-end'}
            onPlaybackComplete={() => setAudioHasPlayed(true)}
          />

        </PanelContent>

        <PanelButtons>
          {audioHasPlayed &&
            <Button onClick={() => { setShowingEnterRecipient(true); }} primary={true}>
              Enter their name
            </Button>
          }
        </PanelButtons>

      </Panel>

    </>
  );
};
