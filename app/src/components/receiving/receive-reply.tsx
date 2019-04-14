import React, { useState } from 'react';

import { Gift } from '../../domain';
import { AccordionTitle } from '../accordion-title';
import { AudioPlayer, AudioPlayerForwardButton } from '../audio-player';
import { AudioRecorder } from '../audio-recorder';
import { Buttons, Button } from '../buttons';

/***
 * Reply section of receiving a gift
 */

interface Props {
  gift: Gift;
}

const ReceiveReply: React.FC<Props> = (props) => {

  // Title
  const showOpenPrompt = false;
  const accordionTitleTextSize = 'small';
  const accordionTextColour = 'black';

  // Audio
  const [hasRecording, setHasRecording] = useState(false);
  const recordText = `Record a message to tell ${props.gift.senderName} what you thought of it`;

  const todo = () => { alert('TODO'); };

  return (
    <>
      <AccordionTitle
        showOpenPrompt={showOpenPrompt}
        textSize={accordionTitleTextSize}
        textColour={accordionTextColour}
      >
        Your reply
      </AccordionTitle>

      {hasRecording &&
        <AudioPlayer text={'Listen back to your reply...'} src={''} forwardButton={'GoToEnd'}  />
      }
      {!hasRecording &&
        <AudioRecorder status={'idle'} text={recordText}  onClick={todo} />
      }

      <Buttons>
        <Button onClick={todo}>Re-record</Button>
        <Button onClick={todo} primary={true}>Send</Button>
      </Buttons>
    </>
  );
};

export {
  ReceiveReply,
};
