import React, { useState } from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { TextInput } from '../inputs/text-input';

/**
 * The start of making a gift. User enters recipient name.
 */

type Status =
  | 'audio-message'
  | 'enter-recipient'
;


interface Props {
  onComplete: (recipientName: string) => void;
}

export const CreateGiftChooseRecipient: React.FC<Props> = ({ onComplete }) => {
  const [status, setStatus] = useState<Status>('audio-message');
  const [recipientName, setRecipientName] = useState('');
  const [audioHasPlayed, setAudioHasPlayed] = useState(false);

  function renderMessage() {
    return (
      <>
        <PanelContent>
          <AudioPlayer
            text={'Who are you going to choose?'}
            src={require('../../../src/assets/audio/c-start-gift.mp3')}
            forwardButton={'GoToEnd'}
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
          <TextInput placeHolder={'Their first name'} onTextChanged={setRecipientName} />
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
