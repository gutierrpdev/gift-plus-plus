import React from 'react';

import { assertNever } from '../../utils/helpers';
import { AudioRecorder, useAudioRecorder } from '../../utils/use-audio-recorder';
import { InProgressGift } from '../../domain';

import { Panel, PanelContent } from '../panel';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../../components/audio-player';
import { AudioRecorder as AudioRecorderComponent } from '../../components/audio-recorder';
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
  onComplete: (recordingUrl: string) => void;
}

export const CreateGiftRecordAndPlayback: React.FC<Props> = ({
  text,
  playbackMessage = 'Review your recording',
  saveButtonText,
  gift,
  eventReference,
  onComplete,
}) => {
  const audioRecorder = useAudioRecorder();

  function handleReRecord() {

    // Track the event
    track(audioReRecordedEvent( {giftId: gift.id, audioType: eventReference} ));

    // Fire
    if (audioRecorder.state === 'audio-ready') {
      audioRecorder.disposeRecording();
    }

  }

  function handleSaveRecording(file: string) {

    // Track the event
    track(audioKeptEvent( {giftId: gift.id, audioType: eventReference} ));

    // Finish
    onComplete(file);

  }

  if (audioRecorder.state === 'audio-ready') {
    return (
      <PlaybackPanel
        playbackMessage={playbackMessage}
        url={audioRecorder.recordingUrl}
        saveButtonText={saveButtonText}
        gift={gift}
        onReRecordClicked={handleReRecord}
        onSaveClicked={() => handleSaveRecording(audioRecorder.recordingUrl)}
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
      <Buttons>
        {button}
      </Buttons>
    </Panel>
  );
};


const PlaybackPanel: React.FC<{
  url: string;
  playbackMessage: string;
  saveButtonText: string;
  gift: InProgressGift;
  onReRecordClicked: () => void;
  onSaveClicked: () => void;
}> = ({ url, playbackMessage, saveButtonText, gift, onReRecordClicked, onSaveClicked }) => (
  <Panel>
    <PanelContent>
      <AudioPlayer
        message={playbackMessage}
        src={url}
        forwardButtonType={'skip-seconds'}
        giftId={gift.id}
        eventReference={'creating-review-greeting'}
      />
    </PanelContent>
    <Buttons>
      <Button onClick={onReRecordClicked}>Re-record</Button>
      <Button primary={true} onClick={onSaveClicked}>{saveButtonText}</Button>
    </Buttons>
  </Panel>
);


const noop = () => {};
