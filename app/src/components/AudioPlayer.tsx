import React from 'react';
import styled from 'styled-components';

import ProgressBar from '../components/ProgressBar';

/**
 * Audio Player
 *
 */
const AudioPlayerStyles = styled.div`
  box-sizing: border-box;
  display: 'flex';
  /* justifyContent: 'space-between'; */
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10vw 5vw;
  border-radius: 50%;
  height: 250px;
  width: 250px;
  margin: 0 auto;
`;

const TextArea = styled.div`
  text-align: center;
  height: 70px;
  font-size: 1.4rem;
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
  // currentTime: number;
  // duration: number;
}

export default class AudioPlayer extends React.PureComponent<Props, State> {

  private static progressUpdateInterval: 500;

  public state = {
    isPlaying: false,
    playbackPercentage: 0,
  };

  private audio: HTMLAudioElement | null = new Audio(); // Our audio player
  private intervalId: any;

  constructor(props: Props) {
    super(props);

    // As there is no call back from the audio player we need to use a timer
    // Setup the timer to check for play progress
    this.intervalId = setInterval(() => {
      if (this.audio) {

        if (!this.audio.paused) {

          const currentTime = this.audio.currentTime;
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
    }, AudioPlayer.progressUpdateInterval);
  }


  public componentWillUnmount() {
    clearInterval(this.intervalId);
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

  public addHeadingZero(num: number) {
    return (num > 9 ? num.toString() : `0${num}`);
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

        <TextArea>{this.props.text}</TextArea>
        <ProgressBar percentage={this.state.playbackPercentage} />
        <Controls>
          <SkipBack>
            <img src={require('../assets/svg/button-audio-back.svg')} />
          </SkipBack>
          <Play onClick={this.togglePlay} >
            <img src={playButtonImg} />
          </Play>
          <SkipForward>
            <img src={require('../assets/svg/button-audio-forward.svg')} />
          </SkipForward>
        </Controls>
      </AudioPlayerStyles>
    );
  }
}
