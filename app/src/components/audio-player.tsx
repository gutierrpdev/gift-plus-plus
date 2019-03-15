import React from 'react';
import styled from 'styled-components';

import { ProgressBar } from './progress-bar';
import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';
import { BaseControlButton } from './buttons';

/**
 * Audio Player
 *
 */

 // Used in player and recorder
const AudioPlayerStyle = styled.div`
  display: 'flex'; // todo this seems wrong
  color: white;
  padding: 10vw 5vw;
  margin: 0 auto;
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
const SkipBack = styled(BaseControlButton)`
  width: 10vmin;
  height: 10vmin;
`;

const SkipForward = styled(BaseControlButton)`
  width: 10vmin;
  height: 10vmin;
`;

const Play = styled(BaseControlButton)`
  width: 17vmin;
  height: 17vmin;
  margin: 0 3vmin;
`;

// Forward button options
export type AudioPlayerForwardButton = 'SkipSeconds' | 'GoToEnd';

interface Props {
  text: string;
  src: string;
  forwardButton: AudioPlayerForwardButton;
  onPlaybackComplete?: () => void; // optional callback when audio has completed playback
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
          // console.log('ended');
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

        // End of audio file

        // Update the statu/UI
        this.setState({
          isPlaying: false,
          playbackPercentage: 100,
        });

        // Check for callback
        if (this.props.onPlaybackComplete) {
          this.props.onPlaybackComplete();
        }

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

  // Play/pause toggle
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

  // Skip forward seconds
  public skipForward = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    // Calculate our target
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

    // Update
    this.setPlaybackPercentage(this.audio.currentTime);

  }

  // Go to the end of the audio
  public goToEnd = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    // Stop
    if (this.state.isPlaying) {
      this.togglePlay();
    }

    // 100%
    this.audio.currentTime = this.audio.duration;

    // Update
    this.setPlaybackPercentage(this.audio.currentTime);

  }

  // Skip backwards seconds
  public skipBackward = () => {

    // Bail if no audio
    if (!this.audio) {
      return;
    }

    // Calculate the target
    const target = Math.round(this.audio.currentTime - AudioPlayer.skipBackwardSeconds);

    // Avoid negative position
    this.audio.currentTime = Math.max(0, target);

    // Update
    this.setPlaybackPercentage(this.audio.currentTime);

  }

  // public onSeek = (e: MouseEvent) => {
  //   console.log(e);
  // }

  public render() {

    // Prepare our props
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
      <PanelRound background={'transparent-black'}>
        <AudioPlayerStyle>
            <audio
              src={this.props.src}
              controls={false}
              title={'Play'}
              loop={false}
              autoPlay={false}
              ref={(ref) => { this.audio = ref; }}
            >
              {incompatibilityMessage}
            </audio>

          <AudioPanelText>{this.props.text}</AudioPanelText>
          <ProgressBar
            percentage={this.state.playbackPercentage}
            theme={'whiteOnBlack'}
            showPositionBar={true}
            /*onSeek={this.onSeek}*/
          />
          <Controls>
            <SkipBack onClick={this.skipBackward}>
              <img src={require('../assets/svg/button-audio-back.svg')} />
            </SkipBack>
            <Play onClick={this.togglePlay} >
              <img src={playButtonImg} />
            </Play>

            {/* Skip forward seconds */}
            {this.props.forwardButton === 'SkipSeconds' &&
              <SkipForward onClick={this.skipForward}>
                <img src={require('../assets/svg/button-audio-forward.svg')} />
              </SkipForward>
            }

            {/* Jump to end */}
            {this.props.forwardButton === 'GoToEnd' &&
              <SkipForward onClick={this.goToEnd}>
                <img src={require('../assets/svg/button-audio-skip.svg')} />
              </SkipForward>
            }

          </Controls>
        </AudioPlayerStyle>
      </PanelRound>
    );
  }
}

export {
  AudioPlayer,
  AudioPlayerStyle,
};
