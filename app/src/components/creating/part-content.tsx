import React, { useState } from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelImageReveal } from '../panel-image-reveal';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { Gift, GiftPart } from '../../domain';
import { WaitThen } from '../wait-then';

/***
 * Show the creating gift part content
 */

type Status = 'first-message' | 'second-message' | 'take-photo' | 'pre-record-message' | 'record-message' |
  'pre-clue-message1' | 'pre-clue-message2' | 'write-clue' | 'finish-message1' | 'finish-message2' | 'send';

 // Extend panel props with extras
export interface Props {
  gift: Gift; // Pass in the whole gift rather than just the part as we need some other info (part count, sender name)
  giftPartIndex: number; // The index of this gift part
}

const CreatingPartContent: React.FC<Props> = ({ /*gift, */giftPartIndex }) => {

  // State
  const [status, setStatus] = useState<Status>('first-message');

  // Defaults
  const defaultWait = 1;

  // Move to section
  function gotoSecondMessage() {
    setStatus('second-message');
  }

  // Get some local references
  // const giftPart: GiftPart = gift.parts[giftPartIndex];
  // const giftSenderName: string = gift.senderName;

  // Render different bits of content
  function renderFirstMessage() {
    return (
      <>
        <PanelContent>
          {giftPartIndex === 0 &&
            <PanelPrompt text={'Time to choose your first object from the museum'} background={'transparent-black'}/>
          }
          <WaitThen
            wait={defaultWait}
            andThen={gotoSecondMessage}
          />
        </PanelContent>
        <Buttons />
      </>
    );
  }

  return (
    <StyledPanel>

      {status === 'first-message' && renderFirstMessage()}

    </StyledPanel>
  );

};

export {
  CreatingPartContent,
};
