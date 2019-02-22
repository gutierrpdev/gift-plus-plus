import React from 'react';
import styled from 'styled-components';

import { ProgressBar } from './progress-bar';
import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';

/**
 * Audio Player
 *
 */
const AudioPlayerStyles = styled.div`
  box-sizing: border-box;
  display: 'flex';
  color: white;
  padding: 10vw 5vw;
`;

const AudioPanelText = styled(PanelText)`
  height: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0;
  height: 40%;
`;

// == Buttons ==
// Base button has active state
const baseButton = styled.div`
  opacity: 0.8;
  &:active {
    opacity: 1;
  }
`;

const SkipBack = styled(baseButton)`
  width: 10vw;
  height: 10vw;
`;

const SkipForward = styled(baseButton)`
  width: 10vw;
  height: 10vw;
`;

const Play = styled(baseButton)`
  width: 17vw;
  height: 17vw;
  margin: 0 3vw;
`;

interface Props {
  text: string;
  preload?: boolean;
  src: string;
}

interface State {
  isPlaying: boolean;
  playbackPercentage: number;
}

class AudioPlayer extends React.PureComponent<Props, State> {

  private static skipForwardSeconds: number = 5;
  private static skipBackwardSeconds: number = 5;

  public state = {
    isPlaying: false,
    playbackPercentage: 0,
  };

  private audio: HTMLAudioElement | null = new Audio(); // Our audio player

  constructor(props: Props) {
    super(props);

    // Setup audio player callbacks
    if (this.audio) {

      // Ended
      // todo: this doesnt seem to work now
      this.audio.addEventListener('ended', () => {
        if (this.audio) {
          // Update the UI
          this.setPlaybackPercentage(this.audio.duration);
          console.log('ended');
          this.setState({
            isPlaying: false,
          });
        }
      });

    }

  }

  public componentDidMount() {

    // Hookup the progress bar to the audio position change
    if (this.audio) {
      this.audio.addEventListener('timeupdate', () => {
      // add code here to update the handle position
      if (this.audio) {
        this.setPlaybackPercentage(this.audio.currentTime);
      }
    });
    }

  }

  public setPlaybackPercentage(currentTime: number) {

    if (this.audio) {

      const duration = this.audio.duration;

      // Check for end
      if (currentTime === duration) {

        this.setState({
          isPlaying: false,
          playbackPercentage: 100,
        });

      } else {

        // Calculate the percentage of playback
        let playbackPerc = 0;
        if (duration) { // Avoid div by zero
          playbackPerc = Math.round((currentTime / duration) * 100);
        }

        this.setState({
          playbackPercentage: playbackPerc,
        });

      }

    }

  }

  public togglePlay = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    if (this.audio.paused && this.audio.src) {
      this.audio.play();
      this.setState({
        isPlaying: true,
      });
    } else if (!this.audio.paused) {
      this.audio.pause();
      this.setState({
        isPlaying: false,
      });
    }
  }

  public skipForward = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    const target = Math.round(this.audio.currentTime + AudioPlayer.skipForwardSeconds);

    // Avoid going over the maximum
    if (target > this.audio.duration) {

      // 100%
      this.audio.currentTime = this.audio.duration;

      // Stop
      if (this.state.isPlaying) {
        this.togglePlay();
      }
    } else {
      this.audio.currentTime = target;
    }

    this.setPlaybackPercentage(this.audio.currentTime);

  }

  public skipBackward = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    const target = Math.round(this.audio.currentTime - AudioPlayer.skipBackwardSeconds);
    // Avoid negative position
    this.audio.currentTime = Math.max(0, target);
    this.setPlaybackPercentage(this.audio.currentTime);

  }


  public render() {

    // Prepare our props
    // <audio> accepts string preload value
    const preload = this.props.preload ? 'auto' : 'none';
    const { children } = this.props;
    const { isPlaying } = this.state;
    const playButtonImg = isPlaying ?
      require('../assets/svg/button-audio-pause.svg') :
      require('../assets/svg/button-audio-play.svg');

    // Setup an incompatibility message
    const incompatibilityMessage = children || (
      <p>
        Your browser does not support the <code>audio</code> element.
      </p>
    );

    return (
      <PanelRound darkBackground={true} dottedBorder={false}>
        <AudioPlayerStyles>
            <audio
              src={this.props.src}
              controls={false}
              title={'Play'}
              loop={false}
              autoPlay={false}
              preload={preload}
              ref={(ref) => { this.audio = ref; }}
            >
              {incompatibilityMessage}
            </audio>

          <AudioPanelText>{this.props.text}</AudioPanelText>
          <ProgressBar percentage={this.state.playbackPercentage} />
          <Controls>
            <SkipBack onClick={this.skipBackward}>
              <img src={require('../assets/svg/button-audio-back.svg')} />
            </SkipBack>
            <Play onClick={this.togglePlay} >
              <img src={playButtonImg} />
            </Play>
            <SkipForward onClick={this.skipForward}>
              <img src={require('../assets/svg/button-audio-forward.svg')} />
            </SkipForward>
          </Controls>
        </AudioPlayerStyles>
      </PanelRound>
    );
  }
}

export {
  AudioPlayer,
};
