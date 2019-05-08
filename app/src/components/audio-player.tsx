import React from 'react';
import styled from 'styled-components';

import { ProgressBar } from './progress-bar';
import { PanelText } from './panel-text';
import { PanelRound } from './panel-round';
import { BaseControlButton } from './buttons';
import { track, audioPlayingEvent, audioPausedEvent } from '../utils/events';
import { GiftId } from '../domain';

import SvgButtonAudioPlay from './svg/button-audio-play';
import SvgButtonAudioPause from './svg/button-audio-pause';
import SvgButtonAudioBack from './svg/button-audio-back';
import SvgButtonAudioForward from './svg/button-audio-forward';
import SvgButtonAudioSkip from './svg/button-audio-skip';

/**
 * Audio Player
 *
 */

const AudioPlayerStyle = styled.div`
  color: white;
  padding: 20% 5%;
  margin: 0 auto;
  width: 100%;
`;

const AudioPanelText = styled(PanelText)`
  height: 50%;
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
export type AudioPlayerForwardButtonType = 'skip-seconds' | 'go-to-end';

interface Props {
  message: string; // Message show in player
  src: string; // Reference to audio file to play
  forwardButtonType: AudioPlayerForwardButtonType;
  allowCompactRound?: boolean; // Allow the panel round to be comptact on small devices
  eventReference: string; // A unique identifier to use on event logging i.e. 'choose-recipient'
  // tslint:disable-next-line max-line-length
  giftId: GiftId; // Current GiftID for event tracking.  This isn't ideal, but easier than many callbacks per recorder/panel
  onPlaybackStarted?: () => void; // Optional callback when audio playback is started
  onPlaybackComplete?: () => void; // Optional callback when audio has completed playback
}

interface State {
  isPlaying: boolean;
  playbackPercentage: number;
}

export class AudioPlayer extends React.PureComponent<Props, State> {

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

        // Update the state/UI
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

    // Call playback event
    if (this.props.onPlaybackStarted) {
      this.props.onPlaybackStarted();
    }

    // If paused, then play
    if (this.audio.paused && this.audio.src) {

      // Track the event
      track(audioPlayingEvent( {giftId: this.props.giftId, audioType: this.props.eventReference} ));

      // Start the player
      this.audio.play();

      // Update state/UI
      this.setState({
        isPlaying: true,
      });

    } else if (!this.audio.paused) {

      // If not paused, we must be playing, so pause

      // Track the event
      track(audioPausedEvent( {giftId: this.props.giftId, audioType: this.props.eventReference} ));

      // Pause the player
      this.audio.pause();

      // Update state/UI
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
      <PanelRound background={'transparent-black'} allowCompact={this.props.allowCompactRound || false}>
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

          <AudioPanelText>{this.props.message}</AudioPanelText>
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
            {this.props.forwardButtonType === 'skip-seconds' &&
              <SkipForward onClick={this.skipForward}>
                <SvgButtonAudioForward />
              </SkipForward>
            }

            {/* Jump to end */}
            {this.props.forwardButtonType === 'go-to-end' &&
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
