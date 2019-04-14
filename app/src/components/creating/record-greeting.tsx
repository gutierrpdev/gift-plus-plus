import React, { useState } from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { AudioRecorder } from '../../components/audio-recorder';
import { Gradient } from '../gradient';


/**
 * The start of making a gift. User records a greeting to recipient.
 */

type Status =
  | 'record-greeting'
  | 'playback-greeting'
;


interface Props {
  recipientName: string;
  onComplete: (recordingUrl: string) => void;
}

export const CreateGiftRecordGreeting: React.FC<Props> = ({ recipientName, onComplete }) => {
  const [status, setStatus] = useState<Status>('record-greeting');
  const [recordingUrl, setRecordingUrl] = useState('');

  // TODO obvs
  const audioRecorderStatus = 'idle';

  function renderRecordGreeting() {
    return (
      <>
        <PanelContent>
          <AudioRecorder
            status={audioRecorderStatus}
            text={`Record a greeting for ${recipientName}.`}
            onClick={() => {}}
          />
        </PanelContent>
        <Buttons>
          {audioRecorderStatus === 'idle' &&
            <Button onClick={() => {}} primary={true}>Start recording</Button>
          }
          {audioRecorderStatus !== 'idle' &&
           <Button onClick={() => {}}>Stop recording</Button>
          }
        </Buttons>
      </>
    );
  }


  function renderPlaybackGreeting() {
    return (
      <>
        <PanelContent>
          <AudioPlayer
            text={'Review your recording'}
            src={recordingUrl}
            forwardButton={'SkipSeconds'}
          />
        </PanelContent>
        <Buttons>
          <Button onClick={() => setStatus('record-greeting')}>Re-record</Button>
          <Button primary={true} onClick={() => onComplete(recordingUrl)}>Save Greeting</Button>
        </Buttons>
      </>
    );
  }


  return (
    <Panel>
      <Gradient />
      {status === 'record-greeting' && renderRecordGreeting()}
      {status === 'playback-greeting' && renderPlaybackGreeting()}
    </Panel>
  );
};
