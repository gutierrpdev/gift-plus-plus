import React from 'react';
import styled from 'styled-components';

import { GiftPart } from '../domain';
import { global, romanFromDecimal } from '../themes/global';
import { GiftPartsManager } from './gift-parts-manager';
import { PanelManager } from './panel-manager';
import { Panel, PanelContent } from './panel';
import { PanelPrompt } from './panel-prompt';
import { Buttons, Button } from './buttons';
import { AudioPlayer } from './audio-player';

// Gift Part Title
const GiftPartTitle = styled.div<Props>`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  display: flex;
  margin: 0 auto;
  font-weight: ${global.fonts.title.bold};
  line-height: 1;

  // First
  ${(props: Props) =>
    props.index === 0 && `
    position: relative;
    &:before {
      content: 'Open';
      position: absolute;
      top: -6vw;
      text-align: center;
      width: 100%;
      left: auto;
      font-size: 4vw;
      font-family: ${global.fonts.body.family};
      text-transform: uppercase;
    }
    &:after {
      content: '';
      background-image: url( ${require('../assets/svg/down-chev-white.svg')} );
      background-size: cover;
      width: 10vw;
      height: 8vw;
      position: absolute;
      bottom: -11vw;
      left: 50%;
      transform: translate(-50%, 0);
    }
  `}

  // Idle
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle && `
    font-size: 10vw;
  `}

  // Open
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Open && `
    font-size: 6vw;
    margin: 20px auto;
  `}

  // Closed
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Closed && `
    font-size: 5vw;
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

const StyledGiftPart = styled.div<Props>`
  // Common
  background-image: url(${(props) => props.giftPart && props.giftPart.photo ? props.giftPart.photo : ''});
  background-position: center;
  background-size: cover;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;

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
    min-height: 10vw;
  `}

`;

class GiftPartWrapper extends React.Component<Props, {}> {

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
            <PanelContent>
              <AudioPlayer
                  text={'One thing before you start...'}
                  src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
              />
            </PanelContent>
            <Buttons>
              <Button onClick={this.nextPanel}>OK</Button>
            </Buttons>
          </Panel>

          <Panel>
            <PanelContent>
              <PanelPrompt text={'lorem ipsum'} />
            </PanelContent>
            <Buttons>
              <Button>Show Clue</Button>
              <Button onClick={this.nextPanel}>OK</Button>
            </Buttons>
          </Panel>

          <Panel>
            <PanelContent>
              <PanelPrompt text={'Cool man'} />
            </PanelContent>
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

        <GiftPartTitle {...this.props}>Part {romanFromDecimal(this.props.index + 1)}</GiftPartTitle>
        {this.renderPanels()}

      </StyledGiftPart>
    );
  }
}

export {
  GiftPartWrapper,
};
