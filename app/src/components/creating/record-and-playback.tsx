import React, { useState } from 'react';

import { assertNever } from '../../utils/helpers';
import { AudioRecorder, useAudioRecorder } from '../../utils/use-audio-recorder';
import { InProgressGift, LocalFile } from '../../domain';

import { Panel, PanelContent } from '../panel';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { AudioPlayer } from '../media/audio-player';
import { AudioRecorder as AudioRecorderComponent } from '../media/audio-recorder';
import {
  track,
  audioRecordingStartedEvent,
  audioRecordingStoppedEvent,
  audioReRecordedEvent,
  audioKeptEvent,
} from '../../utils/events';


/**
 * The start of making a gift. User records a greeting to recipient.
 */


interface Props {
  text: string;
  playbackMessage?: string;
  saveButtonText: string;
  gift: InProgressGift;
  eventReference: string;
  onComplete: (audioFile: LocalFile) => void;
  onReRecord: () => void;
}

export const CreateGiftRecordAndPlayback: React.FC<Props> = ({
  text,
  playbackMessage = 'Review your recording',
  saveButtonText,
  gift,
  eventReference,
  onComplete,
  onReRecord,
}) => {
  const audioRecorder = useAudioRecorder();

  if (audioRecorder.state === 'audio-ready') {
    return (
      <PlaybackPanel
        playbackMessage={playbackMessage}
        url={audioRecorder.file.url}
        saveButtonText={saveButtonText}
        onReRecordClicked={() => {
          track(audioReRecordedEvent({ giftId: gift.id, audioType: eventReference }));
          audioRecorder.disposeRecording();
          onReRecord();
        }}
        onSaveClicked={() => {
          track(audioKeptEvent({ giftId: gift.id, audioType: eventReference }));
          onComplete(audioRecorder.file);
        }}
      />
    );
  }

  return (
    <RecordPanel
      text={text}
      audioRecorder={audioRecorder}
      gift={gift}
      eventReference={eventReference}
    />
  );
};




const RecordPanel: React.FC<{
  audioRecorder: AudioRecorder;
  text: string;
  gift: InProgressGift;
  eventReference: string;
}> = ({ audioRecorder, text, gift, eventReference }) => {
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

  const button = (audioRecorder.state === 'recording') ? (<Button onClick={handleStopRecord}>Stop recording</Button>)
               : (audioRecorder.state === 'processing') ? (<Button onClick={handleStopRecord}>Stop recording</Button>)
               : (audioRecorder.state === 'error') ? (<Button onClick={onClick}>Try again</Button>)
               : (<Button onClick={handleStartRecord} primary={true}>Start recording</Button>);


  function handleStartRecord() {

    // Track the event
    track(audioRecordingStartedEvent( {giftId: gift.id, audioType: eventReference} ));

    // Fire
    onClick();

  }

  function handleStopRecord() {

    // Track the event
    track(audioRecordingStoppedEvent( {giftId: gift.id, audioType: eventReference} ));

    // Fire
    onClick();

  }


  return (
    <Panel>
      <PanelContent>
        <AudioRecorderComponent
          status={componentStatus}
          text={text}
          onClick={onClick}
        />
      </PanelContent>
      <PanelButtons>
        {button}
      </PanelButtons>
    </Panel>
  );
};


const PlaybackPanel: React.FC<{
  url: string;
  playbackMessage: string;
  saveButtonText: string;
  onReRecordClicked: () => void;
  onSaveClicked: () => void;
}> = ({ url, playbackMessage, saveButtonText, onReRecordClicked, onSaveClicked }) => {

  const [recordedAudioHasPlayedBack, setRecordedAudioHasPlayedBack] = useState(false);

  return (
    <Panel>
      <PanelContent>
        <AudioPlayer
          message={playbackMessage}
          src={url}
          forwardButtonType={'skip-seconds'}
          onPlaybackComplete={() => {setRecordedAudioHasPlayedBack(true); }}
        />
      </PanelContent>
      {recordedAudioHasPlayedBack &&
      <PanelButtons>
        <Button onClick={onReRecordClicked}>Try-again</Button>
        <Button primary={true} onClick={onSaveClicked}>{saveButtonText}</Button>
      </PanelButtons>}
    </Panel>
  );
};

const noop = () => {};
