import React from 'react';
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
  onRecordingStart?: () => void;
  onRecordingStop?: (recordedAudioPath: string) => void;
}

interface State {
  status: AudioRecorderState;
  hasRecording: boolean;
}

type AudioRecorderState = 'idle' | 'recording';

class AudioRecorder extends React.PureComponent<Props, State> {

  public state: State = {
    status: 'idle',
    hasRecording: false,
  };

  // Public methods
  public startRecording() {

    this.setState({
      status: 'recording',
    });

    if (this.props.onRecordingStart) {
      this.props.onRecordingStart();
    }

  }

  public stopRecording() {

    this.setState({
      status: 'idle',
      hasRecording: true,
    });

    if (this.props.onRecordingStop) {
      this.props.onRecordingStop('filename'); // todo
    }

  }

  public render() {

    // Handy values
    const recording = this.state.status === 'recording';
    const border: PanelRoundBorderStyle = recording ? 'solid-red' : 'none';

    return (
      <PanelRound background={'transparent-black'} border={border} onClick={this.handleRecordButton}>
        <AudioRecorderStyle>
          <AudioPanelText>{this.props.text}</AudioPanelText>
          <RecordingText
            show={recording}
          >
            <TextResize mobileSize={40}>Now Recording</TextResize>
          </RecordingText>
          <Controls>
            <RecordButton >
              <img src={require('../assets/svg/button-audio-record.svg')} />
            </RecordButton>
          </Controls>
        </AudioRecorderStyle>

      </PanelRound>
    );
  }

  // Handle Record button press
  private handleRecordButton = () => {

    switch (this.state.status) {
      case 'idle' :
        this.startRecording();
        break;
      case 'recording' :
        this.stopRecording();
        break;
    }

  }

}

export {
  AudioRecorder,
};
