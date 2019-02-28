import React/*, { useState, useEffect }*/ from 'react';
import styled from 'styled-components';

import { GiftPart } from '../../domain';
import { global, romanFromDecimal } from '../../themes/global';
import { GiftPartsManager } from './gift-parts-manager';
import { ReceivingIntroContent } from './panels/intro-content';
import { ReceivingChooseLocation, GiftLocation } from '../receiving/panels/choose-location';
import { ReceivingPartContent } from './panels/part-content';
// import { GiftPartImageReveal } from '../panel-image-reveal';

// Gift Part Title
const GiftPartTitle = styled.div<Props>`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  display: flex;
  margin: 0 auto;
  font-weight: ${global.fonts.title.bold};
  line-height: 1;
  position: relative;
  z-index: 1;

  // Idle
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle && `
    font-size: 10vw;
  `}

  // Idle first
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle &&
    props.index === 0 && `
    position: relative;
    font-size: 10vw;
    &:before {
      content: 'Open';
      position: absolute;
      top: -4vh;
      text-align: center;
      width: 100%;
      left: auto;
      font-size: 4vw;
      font-family: ${global.fonts.body.family};
      text-transform: uppercase;
    }
    &:after {
      content: '';
      background-image: url( ${require('../../assets/svg/down-chev-white.svg')} );
      background-size: cover;
      width: 10vw;
      height: 8vw;
      position: absolute;
      bottom: -6vh;
      left: 50%;
      transform: translate(-50%, 0);
    }
  `}

  // Idle not first
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle &&
    props.index > 0 && `
    color: black;
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
    color: black;
  `}

`;

/**
 * Visual wrapper for a gift part
 * Handles displaying its contents
 */
export enum GiftPartWrapperStatus {Idle, Open, Closed}

export interface Props {
  giftPartManager: GiftPartsManager;
  giftPart: GiftPart;
  index: number;
  giftPartCount: number; // How many parts are in the gift
  status: GiftPartWrapperStatus;
  onClick?: (giftPartWrapper: any) => void;
}

interface State {
  activePanelIndex: number;
  giftLocation: GiftLocation;
  audioIntroPlayed: boolean;
}

const StyledGiftPart = styled.div<Props>`
  // Common
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  position: relative;

  // Background image as :before to apply blur
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.giftPart && props.giftPart.photo ? props.giftPart.photo : ''});
    background-position: center;
    background-size: cover;
    z-index: -1;
    filter: blur(5px);
  }

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
    background-color: #777777;
  `}

  // Dark overlay, not open
  ${(props: Props) =>
    props.index > 0 && `
    &:before {
      filter: grayscale(60%) blur(5px);
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }
  `}

`;


class GiftPartWrapper extends React.PureComponent<Props, State> {

  // Our panel manager determines which panel in our stack to show
  public managerRef: any = React.createRef();
  public state = {
    activePanelIndex: 0,
    giftLocation: GiftLocation.Unknown,
    audioIntroPlayed: false,
  };

  // Inform the wrapper, todo this should be handled by the parent on click
  public handleClick = () => {
    this.props.giftPartManager.setActiveGiftPartWrapper(this);
  }

  // Go to the next panel in the list
  public nextPanel = () => {

    // Get the next index, but don't exceed the panels count
    // todo : set max properly, = total all of components rendered
    const nextIndex = Math.min(this.state.activePanelIndex + 1, 99);

    this.setState({
      activePanelIndex: nextIndex,
    });

  }

  // Sets the location
  public handleSetLocation = (giftLocation: GiftLocation) => {
    this.setState({giftLocation});
  }

  // Sets the audio intro having been played
  public handleIntroAudioPlayed = () => {
    this.setState({
      audioIntroPlayed: true,
    });
  }

  // Load the content for the gift part
  public getGiftPartContent = () => {

    // Only show the content if this gift part is set as open
    const show = this.props.status === GiftPartWrapperStatus.Open;

    if (show) {

      const index = this.state.activePanelIndex;

      // Render the correct content based on our gift part index [0,1,2]
      switch (this.props.index) {
        case 0 :
          return (
            <>
              <ReceivingChooseLocation
                visible={index === 0}
                doComplete={this.nextPanel}
                doSetLocation={this.handleSetLocation}
              />
              <ReceivingIntroContent
                visible={index === 1}
                doComplete={this.nextPanel}
                giftLocation={this.state.giftLocation}
                audioIntroPlayed={this.state.audioIntroPlayed}
                handleAudioIntroPlayed={this.handleIntroAudioPlayed}
              />
              <ReceivingPartContent
                visible={index === 2}
                giftPart={this.props.giftPart}
                giftPartIndex={this.props.index}
                giftPartCount={this.props.index}
                doComplete={this.nextPanel}
                giftLocation={this.state.giftLocation}
              />
            </>
          );
          break;
        case 1 :
          return (
            <>
            </>
          );
          break;
        case 2 :
          return (
            <>
            </>
          );
          break;
        default :
            return null;
      }

    } else {
      return null;
    }

  }

  public render() {
    return (
      <StyledGiftPart {...this.props} onClick={this.handleClick}>

        {/* <GiftPartImageReveal
          imageUrl={this.props.giftPart.photo}
        /> */}

        <GiftPartTitle {...this.props}>Part {romanFromDecimal(this.props.index + 1)}</GiftPartTitle>
        {this.getGiftPartContent()}

      </StyledGiftPart>
    );
  }
}

export {
  GiftPartWrapper,
};
