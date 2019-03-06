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
  visible: boolean | false;
  gift: Gift;
}

const ReceiveReply: React.FC<Props> = (props) => {

  // Title
  const showOpenPrompt = false;
  const accordionTitleTextSize = 'Small';
  const accordionTextColour = 'Black';

  // Audio
  const [hasRecording, setHasRecording] = useState(false);
  const recordText = `Record a message to tell ${props.gift.senderName} what you thought of it`;

  function handleRecordingComplete(recordingAudioPath: string) {
    alert(recordingAudioPath);
    setHasRecording(true);
  }

  // Rerecord the audio
  function handleReRecord() {
    // Reset recording state
    setHasRecording(false);
  }

  // Process the recording
  function handleSend() {
    alert('we have finished, go to the menu'); // todo
  }

  // No render if not visible
  if (! props.visible) {
    return null;
  }

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
        <AudioPlayer text={'Listen back to your reply...'} src={''} forwardButton={AudioPlayerForwardButton.GoToEnd}  />
      }
      {!hasRecording &&
        <AudioRecorder text={recordText} onRecordComplete={handleRecordingComplete}  />
      }

      <Buttons>
        <Button onClick={handleReRecord} invisible={!hasRecording}>Re-record</Button>
        <Button onClick={handleSend} invisible={!hasRecording} primary={true}>Send</Button>
      </Buttons>

    </>
  );
};

export {
  ReceiveReply,
};
