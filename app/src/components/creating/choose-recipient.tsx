import React, { useState } from 'react';

import { Panel, PanelContent } from '../panel';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { TextInput } from '../inputs/text-input';
import { InProgressGift } from '../../domain';

/**
 * The start of making a gift. User enters recipient name.
 */

type Status =
  | 'audio-message'
  | 'enter-recipient'
;


interface Props {
  gift: InProgressGift; // Current gift
  onComplete: (recipientName: string) => void;
}

export const CreateGiftChooseRecipient: React.FC<Props> = ({ gift, onComplete }) => {
  const [status, setStatus] = useState<Status>('audio-message');
  const [recipientName, setRecipientName] = useState('');
  const [audioHasPlayed, setAudioHasPlayed] = useState(false);

  function renderMessage() {
    return (
      <>
        <PanelContent>
          <AudioPlayer
            message={'Who are you going to choose?'}
            src={require('../../../src/assets/audio/c-start-gift.mp3')}
            forwardButtonType={'go-to-end'}
            giftId={gift.id}
            eventReference={'choose-recipient'}
            onPlaybackComplete={() => setAudioHasPlayed(true)}
          />
        </PanelContent>
        <Buttons>
          {audioHasPlayed &&
           <Button onClick={() => setStatus('enter-recipient')} primary={true}>
             Enter their name
           </Button>
          }
        </Buttons>
      </>
    );
  }

  function renderEnterRecipient() {
    return (
      <Panel>
        <PanelContent>
          <TextInput
            placeHolder={'Their first name'}
            onTextChanged={setRecipientName}
            onEnterPressed={() => {onComplete(recipientName); }}
          />
        </PanelContent>
        <Buttons>
          {recipientName &&
           <Button onClick={() => onComplete(recipientName)} primary={true}>
             Enter
           </Button>
          }
        </Buttons>
      </Panel>
    );
  }

  return (
    <Panel>
      {status === 'audio-message' && renderMessage()}
      {status === 'enter-recipient' && renderEnterRecipient()}
    </Panel>
  );
};
