import React, { useState } from 'react';
import styled from 'styled-components';

import { PanelText } from './panel-text';
import { PanelRound, PanelRoundBorderStyle } from './panel-round';
import { BaseControlButton } from './buttons';
import { TextResize } from './text-resize';

/**
 * Audio Recorder
 *
 */
const AudioRecorderStyle = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AudioPanelText = styled(PanelText)`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  padding: 5% 10%;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

interface RecordingProps {
  show: boolean;
}
const RecordingText = styled.div<RecordingProps>`
  color: red;
  text-transform: uppercase;
  visibility: ${(props) => props.show ? 'visible' : 'hidden'};
  text-align: center;
  margin-bottom: 10%;
  font-weight: 300;
`;

// Buttons
const RecordButton = styled(BaseControlButton)`
  width: 30%;
  border-radius: 50%;
`;

interface Props {
  text: string;
  onRecordComplete?: (recordedAudioPath: string) => void; // optional callback when audio has been recorded
}

type AudioRecorderState = 'idle' | 'recording';

const AudioRecorder: React.FC<Props> = (props) => {

  const [status, setStatus] = useState('idle');
  const [hasRecording, setHasRecording] = useState(false);

  // Handle Record button press
  function handleRecordButton() {
    switch (status) {
      case 'idle' :
        // Start recording
        setStatus('recording');
        break;
      case 'recording' :
        // Stop recording
        setStatus('idle');
        setHasRecording(true);
        if (props.onRecordComplete) {
          props.onRecordComplete('filename'); // todo
        }
        break;
    }
  }

  const recording = status === 'recording';
  const border: PanelRoundBorderStyle = recording ? 'solid-red' : 'none';

  return (
    <PanelRound background={'transparent-black'} border={border} onClick={handleRecordButton}>
      <AudioRecorderStyle>
        <AudioPanelText>{props.text}</AudioPanelText>
        <RecordingText
          show={recording}
        >
          <TextResize size={40}>Now Recording</TextResize>
        </RecordingText>
        <Controls>
          <RecordButton >
            <img src={require('../assets/svg/button-audio-record.svg')} />
          </RecordButton>
        </Controls>
      </AudioRecorderStyle>

    </PanelRound>
  );
};

export {
  AudioRecorder,
};
