import React/*, { useState, useEffect }*/ from 'react';
import styled from 'styled-components';

import { Gift, GiftPart } from '../../domain';
import { romanFromDecimal } from '../../themes/global';
import { GiftPartsManager } from './gift-parts-manager';
import { ReceivingIntroContent } from './panels/intro-content';
import { ReceivingChooseLocation, GiftLocation } from '../receiving/panels/choose-location';
import { ReceivingPartContent } from './panels/part-content';
// import { GiftPartImageReveal } from '../panel-image-reveal';
import { AccordionTitle } from '../accordion-title';
import { Gradient } from '../gradient';

/**
 * Visual wrapper for a gift part
 * Handles displaying its contents
 */
export enum GiftPartWrapperStatus {Idle, Open, Closed}

export interface Props {
  giftPartManager: GiftPartsManager;
  gift: Gift;
  giftPart: GiftPart; // Pass in the part as well as the gift for props
  giftPartIndex: number;
  status: GiftPartWrapperStatus;
  onClick?: (giftPartWrapper: any) => void;
  doComplete: () => void;
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
  `}

  // Dark overlay, not open
  ${(props: Props) =>
    props.giftPartIndex > 0 && `
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
  // public managerRef: any = React.createRef();

  public giftPartCount: number = this.props.gift.parts.length;
  public panelCount = -1;

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

    // Are we at the last panel?
    if ( (this.state.activePanelIndex + 1) === this.panelCount) {

      // We are at the last panel so doComplete
      if (this.props.doComplete) {
        this.props.doComplete();
      }

    } else {

      // Get the next index, but don't exceed the panels count
      const nextIndex = Math.min(this.state.activePanelIndex + 1, this.panelCount);

      // Update
      this.setState({
        activePanelIndex: nextIndex,
      });

    }

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
      switch (this.props.giftPartIndex) {
        case 0 :
          this.panelCount = 3;
          return (
            <>
              {index === 0 &&
              <ReceivingChooseLocation
                doComplete={this.nextPanel}
                doSetLocation={this.handleSetLocation}
              />}
              {index === 1 &&
              <ReceivingIntroContent
                doComplete={this.nextPanel}
                giftLocation={this.state.giftLocation}
                audioIntroPlayed={this.state.audioIntroPlayed}
                handleAudioIntroPlayed={this.handleIntroAudioPlayed}
              />}
              {index === 2 &&
              <ReceivingPartContent
                gift={this.props.gift}
                giftPartIndex={this.props.giftPartIndex}
                doComplete={this.nextPanel}
                giftLocation={this.state.giftLocation}
              />}
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

    const showOpenPrompt = (this.props.status === GiftPartWrapperStatus.Idle && this.props.giftPartIndex === 0) ?
      true : false;

    let accordionTitleTextSize: 'Big' | 'Medium' | 'Small';
    switch (this.props.status) {
      case GiftPartWrapperStatus.Idle :
        accordionTitleTextSize = 'Big';
        break;
      case GiftPartWrapperStatus.Open :
        accordionTitleTextSize = 'Medium';
        break;
      case GiftPartWrapperStatus.Closed :
        accordionTitleTextSize = 'Small';
        break;
      default :
        accordionTitleTextSize = 'Small';
    }

    const accordionTextColour = (this.props.status === GiftPartWrapperStatus.Idle && this.props.giftPartIndex > 0) ?
      'Black' : 'White';

    return (
      <StyledGiftPart {...this.props} onClick={this.handleClick}>

        <Gradient />

        {/* <GiftPartImageReveal
          imageUrl={this.props.giftPart.photo}
        /> */}

        <AccordionTitle
          showOpenPrompt={showOpenPrompt}
          textSize={accordionTitleTextSize}
          textColour={accordionTextColour}
        >
          Part {romanFromDecimal(this.props.giftPartIndex + 1)}
        </AccordionTitle>
        {/* <GiftPartTitle {...this.props}>Part {romanFromDecimal(this.props.giftPartIndex + 1)}</GiftPartTitle> */}
        {this.getGiftPartContent()}

      </StyledGiftPart>
    );
  }
}

export {
  GiftPartWrapper,
};
