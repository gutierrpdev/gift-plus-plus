import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';

import ProgressBar from '../components/ProgressBar';
import PanelText from '../components/PanelText';

/**
 * Audio Player
 *
 */
const AudioPlayerStyles = styled.div`
  box-sizing: border-box;
  display: 'flex';
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10vw 5vw;
  border-radius: 50%;
  height: ${global.components.circle.width}px;
  width: ${global.components.circle.width}px;
  margin: 0 auto;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0;
`;

// == Buttons ==
// Base button has active state, etc.
const baseButton = styled.div`
  opacity: 0.8;
  &:active {
    opacity: 1;
  }
`;

const SkipBack = styled(baseButton)`
  width: 40px;
  height: 40px;
`;

const SkipForward = styled(baseButton)`
  width: 40px;
  height: 40px;
`;

const Play = styled(baseButton)`
  width: 60px;
  height: 60px;
  margin: 0 10px;
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

export default class AudioPlayer extends React.PureComponent<Props, State> {

  private static progressUpdateInterval: 500;
  private static skipForwardSeconds: number = 5;
  private static skipBackwardSeconds: number = 5;

  public state = {
    isPlaying: false,
    playbackPercentage: 0,
  };

  private audio: HTMLAudioElement | null = new Audio(); // Our audio player
  private intervalId: any;

  constructor(props: Props) {
    super(props);

    // Setup audio player callbacks
    if (this.audio) {

      // Ended
      this.audio.addEventListener('ended', () => {
        if (this.audio) {
          // Update the UI
          this.setPlaybackPercentage(this.audio.duration);
          // Clear the UI updater
          this.clearPlaybackUpdate();
        }
      });
    }

  }

  public componentWillUnmount() {
    // Clear out update interval
    this.clearPlaybackUpdate();
  }

  public setPlaybackPercentage(currentTime: number) {

    if (this.audio) {

      const duration = this.audio.duration;

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

  public setupPlaybackUpdate() {
    // As there is no call back from the audio player we need to use a timer
    // Setup the timer to check for play progress
    this.intervalId = setInterval(() => {
      if (this.audio) {

        if (!this.audio.paused) {

          this.setPlaybackPercentage(this.audio.currentTime);

        }
      }
    }, AudioPlayer.progressUpdateInterval);
  }

  // Clears the interval
  public clearPlaybackUpdate = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public togglePlay = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    if (this.audio.paused && this.audio.src) {
      this.setupPlaybackUpdate();
      this.audio.play();
      this.setState({
        isPlaying: true,
      });
    } else if (!this.audio.paused) {
      this.audio.pause();
      this.clearPlaybackUpdate();
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

        <PanelText>{this.props.text}</PanelText>
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
    );
  }
}
