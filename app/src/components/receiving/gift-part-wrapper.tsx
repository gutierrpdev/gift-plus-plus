import React/*, { useState, useEffect }*/ from 'react';
import styled from 'styled-components';

import { Gift, GiftPart } from '../../domain';
import { romanFromDecimal } from '../../themes/global';
import { GiftPartsManager } from './gift-parts-manager';
import { ReceivingIntroContent } from './panels/intro-content';
import { ReceivingPartContent } from './panels/part-content';
// import { GiftPartImageReveal } from '../panel-image-reveal';
import { AccordionTitle } from '../accordion-title';
import { Gradient } from '../gradient';
import {GiftLocation } from '../receiving/panels/choose-location';

/**
 * Visual wrapper for a gift part
 * Handles displaying its contents
 */
export type GiftPartWrapperStatus = 'Idle' | 'Open' | 'Closed';

export interface Props {
  giftPartManager: GiftPartsManager;
  gift: Gift;
  giftPart: GiftPart; // Pass in the part as well as the gift for props
  giftPartIndex: number;
  status: GiftPartWrapperStatus;
  canOpen: boolean; // Can this part be opened yet?
  giftLocation: GiftLocation;
  onClick?: (giftPartWrapper: any) => void;
  onComplete: () => void;
}

interface State {
  activePanelIndex: number; // Which panel is active
  audioIntroPlayed: boolean;
  hasOpened: boolean;  // Has this part ever been opened?
  isComplete: boolean; // Has the reader finsihed consuming this part
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
    props.status === 'Idle' && `
    justify-content: center;
  `}

  // Open
  ${(props: Props) =>
    props.status === 'Open' && `
    flex-grow: 1;
  `}

  // Closed
  ${(props: Props) =>
    props.status === 'Closed' && `
    flex-grow: 0;
    justify-content: center;
    min-height: 10vw;
  `}

  // Dark overlay, not open
  ${(props: Props) =>
    !props.canOpen && `
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
    audioIntroPlayed: false,
    hasOpened: false,
    isComplete: false,
  };

  // Inform the wrapper, todo this should be handled by the parent on click
  public handleClick = () => {

    if (this.props.canOpen) {
      this.props.giftPartManager.setActiveGiftPartWrapper(this);
    }

    // this.setState({
    //   hasOpened: true,
    // });
  }

  // Go to the next panel in the list
  public nextPanel = () => {

    // Are we at the last panel?
    if ( (this.state.activePanelIndex + 1) === this.panelCount) {

      // Mark this part as complete
      this.setState({
        isComplete: true,
      });

      // We are at the last panel so onComplete
      if (this.props.onComplete) {
        this.props.onComplete();
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


  // Sets the audio intro having been played
  public handleIntroAudioPlayed = () => {
    this.setState({
      audioIntroPlayed: true,
    });
  }

  // Load the content for the gift part
  public getGiftPartContent = () => {

    // Only show the content if this gift part is set as open
    const show = this.props.status === 'Open';

    if (show) {

      const index = this.state.activePanelIndex;

      // Render the correct content based on our gift part index [0,1,2]
      switch (this.props.giftPartIndex) {
        case 0 :
          this.panelCount = 2;
          return (
            <>
              {index === 0 &&
              <ReceivingIntroContent
                onComplete={this.nextPanel}
                giftLocation={this.props.giftLocation}
                audioIntroPlayed={this.state.audioIntroPlayed}
                handleAudioIntroPlayed={this.handleIntroAudioPlayed}
              />}
              {index === 1 &&
              <ReceivingPartContent
                gift={this.props.gift}
                giftPartIndex={this.props.giftPartIndex}
                onComplete={this.nextPanel}
                giftLocation={this.props.giftLocation}
              />}
            </>
          );
        case 1 :
        case 2 :
          this.panelCount = 1;
          return (
            <ReceivingPartContent
              gift={this.props.gift}
              giftPartIndex={this.props.giftPartIndex}
              onComplete={this.nextPanel}
              giftLocation={this.props.giftLocation}
            />
          );
        default :
          return null;
      }

    } else {
      return null;
    }

  }

  public render() {

    const showOpenPrompt = (this.props.status === 'Idle' && this.props.giftPartIndex === 0) ?
      true : false;

    let accordionTitleTextSize: 'Big' | 'Medium' | 'Small';
    switch (this.props.status) {
      case 'Idle' :
        accordionTitleTextSize = 'Big';
        break;
      case 'Open' :
        accordionTitleTextSize = 'Medium';
        break;
      case 'Closed' :
        accordionTitleTextSize = 'Small';
        break;
      default :
        accordionTitleTextSize = 'Small';
    }

    const accordionTextColour = (this.props.status === 'Idle' && this.props.giftPartIndex > 0) ?
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
