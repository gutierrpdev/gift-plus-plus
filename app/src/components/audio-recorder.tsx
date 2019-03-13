import React, { useState } from 'react';
import styled from 'styled-components';

import { ProgressBar } from './progress-bar';
import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';
import { AudioPlayerStyle, BaseAudioButton } from './audio-player';

/**
 * Audio Recorder
 *
 */
const AudioPanelText = styled(PanelText)`
  height: 60%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
`;
const AudioPanelThinText = styled(PanelText)`
  font-weight: 300;
  /* display: block; */
  width: 100%;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0;
  height: 40%;
`;

// Buttons
const RecordButton = styled(BaseAudioButton)`
  width: 15vmin;
  height: 15vmin;
  border-radius: 50%;
  padding: 1vmin;
`;
const RecordButtonRecording = styled(RecordButton)`
  border: 1vmin solid red;
`;

interface Props {
  text: string;
  onRecordComplete?: (recordedAudioPath: string) => void; // optional callback when audio has been recorded
}

const AudioRecorder: React.FC<Props> = (props) => {

  const [status, setStatus] = useState('Idle'); // 'Recording' | 'Playing'
  const [hasRecording, setHasRecording] = useState(false);

  // Handle Record button press
  function handleRecordButton() {
    switch (status) {
      case 'Idle' :
        // Start recording
        setStatus('Recording');
        break;
      case 'Recording' :
        // Stop recording
        setStatus('Idle');
        setHasRecording(true);
        if (props.onRecordComplete) {
          props.onRecordComplete('filename'); // todo
        }
        break;
    }
  }

  return (
    <PanelRound background={'transparent-black'} dottedBorder={false}>

      {status === 'Idle' &&
      <AudioPlayerStyle>
        <AudioPanelText>{props.text}</AudioPanelText>
        <Controls>
          <RecordButton onClick={handleRecordButton}>
            <img src={require('../assets/svg/button-audio-record.svg')} />
          </RecordButton>
        </Controls>
      </AudioPlayerStyle>
      }

      {status === 'Recording' &&
      <AudioPlayerStyle>
        <AudioPanelText>
          Now Recording
          <AudioPanelThinText>Click to stop</AudioPanelThinText>
        </AudioPanelText>
        <Controls>
          <RecordButtonRecording onClick={handleRecordButton}>
            <img src={require('../assets/svg/button-audio-record.svg')} />
          </RecordButtonRecording>
        </Controls>
      </AudioPlayerStyle>
      }


    </PanelRound>
  );
};

export {
  AudioRecorder,
};
