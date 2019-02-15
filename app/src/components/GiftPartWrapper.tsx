import React from 'react';
import styled from 'styled-components';

import { GiftPart } from '../domain';
import { global } from '../themes/global';
import GiftPartsManager from './GiftPartsManager';
import PanelManager from '../components/PanelManager';
import Panel from '../components/Panel';
import PanelPrompt from '../components/PanelPrompt';
import { Buttons, Button } from '../components/Button';
import AudioPlayer from '../components/AudioPlayer';

// Gift Part Title
const GiftPartTitle = styled.div<Props>`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  font-size: 3vw;
  display: flex;
  /* flex: 1; */
  /* align-items: flex-start;
  justify-content: center; */
  margin: 0 auto;

  // Open
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Open && `
    margin: 20px auto;
  `}

`;

/**
 * Visual wrapper for a gift part
 */
export enum GiftPartWrapperStatus {Idle, Open, Closed}

export interface Props {
  giftPartManager: GiftPartsManager;
  giftPart: GiftPart;
  index: number;
  status: GiftPartWrapperStatus;
  onClick?: (giftPartWrapper: any) => void;
}

interface State {
}

const StyledGiftPart = styled.div<Props>`
  // Common
  background-image: url(${(props) => props.giftPart && props.giftPart.photo ? props.giftPart.photo : ''});
  background-position: center;
  background-size: cover;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;

  // Idle
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle && `
    justify-content: center;
  `}

  // Open
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Open && `
    flex-grow: 1;
  `}

  // Closed
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Closed && `
    flex-grow: 0;
    justify-content: center;
    height: 10vw;
  `}

`;

export default class GiftPartWrapper extends React.Component<Props, State> {

  public panelManager: PanelManager | null = null;

  // Inform the wrapper, todo this should be handled by the parent on click
  public handleClick = () => {
    this.props.giftPartManager.setActiveGiftPartWrapper(this);
  }

  public nextPanel = () => {
    if (this.panelManager) {
      this.panelManager.nextPanel();
    }
  }

  public renderPanels() {

    const show = this.props.status === GiftPartWrapperStatus.Open;

    if (show) {

      return (
        <PanelManager
          ref={(ref) => { this.panelManager = ref; }}
        >

          <Panel>
            <AudioPlayer
                text={'One thing before you start...'}
                src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
            />
            <Buttons>
              <Button onClick={this.nextPanel}>OK</Button>
            </Buttons>
          </Panel>

          <Panel>
            <PanelPrompt text={'lorem ipsum'} />
              <Buttons>
                <Button>Show Clue</Button>
                <Button onClick={this.nextPanel}>OK</Button>
              </Buttons>
          </Panel>

          <Panel>
            <PanelPrompt text={'Cool man'} />
              <Buttons>
                <Button onClick={this.nextPanel}>OK</Button>
              </Buttons>
          </Panel>

        </PanelManager>
      );

    } else {
      return '';
    }
  }

  public render() {
    return (
      <StyledGiftPart {...this.props} onClick={this.handleClick}>

        <GiftPartTitle {...this.props}>Part {this.props.index + 1}</GiftPartTitle>
        {this.renderPanels()}

      </StyledGiftPart>
    );
  }
}
