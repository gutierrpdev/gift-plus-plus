import React, { useState } from 'react';
import styled from 'styled-components';

import { assertNever } from '../../utils/helpers';
import { AudioRecorder, useAudioRecorder } from '../../utils/use-audio-recorder';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { AudioRecorder as AudioRecorderComponent } from '../../components/audio-recorder';

/**
 * The start of making a gift. User records a greeting to recipient.
 */


interface Props {
  text: string;
  saveButtonText: string;
  onComplete: (recordingUrl: string) => void;
}

export const CreateGiftRecordAndPlayback: React.FC<Props> = ({
  text,
  saveButtonText,
  onComplete,
}) => {
  const audioRecorder = useAudioRecorder();

  if (audioRecorder.state === 'audio-ready') {
    return (
      <PlaybackPanel
        url={audioRecorder.recordingUrl}
        saveButtonText={saveButtonText}
        onReRecordClicked={audioRecorder.disposeRecording}
        onSaveClicked={() => onComplete(audioRecorder.recordingUrl)}
      />
    );
  }

  return (
    <RecordPanel text={text} audioRecorder={audioRecorder} />
  );
};




const RecordPanel: React.FC<{
  audioRecorder: AudioRecorder;
  text: string;
}> = ({ audioRecorder, text }) => {
  // Convert audio recorder state into a display status for the component
  const componentStatus = (audioRecorder.state === 'pending') ? 'idle'
                        : (audioRecorder.state === 'preparing') ? 'preparing'
                        : (audioRecorder.state === 'ready') ? 'idle'
                        : (audioRecorder.state === 'audio-ready') ? 'idle'
                        : (audioRecorder.state === 'recording') ? 'recording'
                        : (audioRecorder.state === 'processing') ? 'processing'
                        : (audioRecorder.state === 'error') ? 'error'
                        : assertNever(audioRecorder);

  const onClick = (audioRecorder.state === 'pending') ? audioRecorder.start
                : (audioRecorder.state === 'ready') ? audioRecorder.start
                : (audioRecorder.state === 'recording') ? audioRecorder.stop
                : (audioRecorder.state === 'error') ? audioRecorder.reset
                : noop;

  const button = (audioRecorder.state === 'recording') ? (<Button onClick={onClick}>Stop recording</Button>)
               : (audioRecorder.state === 'processing') ? (<Button onClick={onClick}>Stop recording</Button>)
               : (audioRecorder.state === 'error') ? (<Button onClick={onClick}>Try again</Button>)
               : (<Button onClick={onClick} primary={true}>Start recording</Button>);

  return (
    <Panel>
      <PanelContent>
        <AudioRecorderComponent
          status={componentStatus}
          text={text}
          onClick={onClick}
        />
      </PanelContent>
      <Buttons>
        {button}
      </Buttons>
    </Panel>
  );
};


const PlaybackPanel: React.FC<{
  url: string;
  saveButtonText: string;
  onReRecordClicked: () => void;
  onSaveClicked: () => void;
}> = ({ url, saveButtonText, onReRecordClicked, onSaveClicked }) => (
  <Panel>
    <PanelContent>
      <AudioPlayer
        text={'Review your recording'}
        src={url}
        forwardButton={'SkipSeconds'}
      />
    </PanelContent>
    <Buttons>
      <Button onClick={onReRecordClicked}>Re-record</Button>
      <Button primary={true} onClick={onSaveClicked}>{saveButtonText}</Button>
    </Buttons>
  </Panel>
);


const noop = () => {};
