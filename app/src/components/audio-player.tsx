import React from 'react';
import styled from 'styled-components';

import { ProgressBar } from './progress-bar';
import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';
import { BaseControlButton } from './buttons';

import SvgButtonAudioPlay from './svg/button-audio-play';
import SvgButtonAudioPause from './svg/button-audio-pause';
import SvgButtonAudioBack from './svg/button-audio-back';
import SvgButtonAudioForward from './svg/button-audio-forward';
import SvgButtonAudioSkip from './svg/button-audio-skip';

/**
 * Audio Player
 *
 */

 // Used in player and recorder
const AudioPlayerStyle = styled.div`
  color: white;
  padding: 20% 5%;
  margin: 0 auto;
  width: 100%;
`;

const AudioPanelText = styled(PanelText)`
  height: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0 0 8%;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8% 0 0;
  height: 55%;
`;

// == Buttons ==
const SkipBack = styled(BaseControlButton)`
  width: 20%
  /* height: 10vmin; */
`;

const SkipForward = styled(BaseControlButton)`
  width: 20%
  /* height: 10vmin; */
`;

const Play = styled(BaseControlButton)`
  width: 35%;
  /* height: 17vmin; */
  margin: 0 5%;
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
            percent={this.state.playbackPercentage}
            theme={'white-on-black'}
            showPositionBar={true}
            height={'0.7vh'}
            /*onSeek={this.onSeek}*/
          />
          <Controls>
            <SkipBack onClick={this.skipBackward}>
              <SvgButtonAudioBack />
            </SkipBack>
            <Play onClick={this.togglePlay} >
              {isPlaying ? <SvgButtonAudioPause/> : <SvgButtonAudioPlay/>}
            </Play>

            {/* Skip forward seconds */}
            {this.props.forwardButton === 'SkipSeconds' &&
              <SkipForward onClick={this.skipForward}>
                <SvgButtonAudioForward />
              </SkipForward>
            }

            {/* Jump to end */}
            {this.props.forwardButton === 'GoToEnd' &&
              <SkipForward onClick={this.goToEnd}>
                <SvgButtonAudioSkip />
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
