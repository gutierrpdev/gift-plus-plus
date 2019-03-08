import React/*, { useState, useEffect }*/ from 'react';
import styled from 'styled-components';

import { Gift, GiftPart } from '../../domain';
import { romanNumeralFromDecimal } from '../../themes/global';
/* import { GiftPartsManager } from './gift-parts-manager'; */
import { ReceivingIntroContent } from './panels/intro-content';
import { ReceivingPartContent } from './panels/part-content';
// import { PanelImageReveal } from '../panel-image-reveal';
import { AccordionTitle } from '../accordion-title';
import { Gradient } from '../gradient';
import { RecipientLocation } from '../receiving/panels/choose-location';

/**
 * Visual wrapper for a gift part
 * Handles displaying its contents
 */
export type GiftPartWrapperStatus = 'Idle' | 'Open' | 'Closed';

export interface Props {
  gift: Gift;
  giftPart: GiftPart;
  giftPartIndex: number;
  recipientLocation: RecipientLocation;
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
  flex-grow: 1;
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
`;

class GiftPartWrapper extends React.PureComponent<Props, State> {

  public giftPartCount: number = this.props.gift.parts.length;
  public panelCount = -1;

  public state = {
    activePanelIndex: 0,
    audioIntroPlayed: false,
    hasOpened: false,
    isComplete: false,
  };


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
              recipientLocation={this.props.recipientLocation}
              audioIntroPlayed={this.state.audioIntroPlayed}
              handleAudioIntroPlayed={this.handleIntroAudioPlayed}
            />}
            {index === 1 &&
            <ReceivingPartContent
              gift={this.props.gift}
              giftPartIndex={this.props.giftPartIndex}
              onComplete={this.nextPanel}
              recipientLocation={this.props.recipientLocation}
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
            recipientLocation={this.props.recipientLocation}
          />
        );
      default :
        return null;
    }

  }

  public render() {

    return (
      <StyledGiftPart {...this.props} >

        <Gradient />

        <AccordionTitle
          showOpenPrompt={false}
          textSize={'medium'}
          textColour={'white'}
        >
          Part {romanNumeralFromDecimal(this.props.giftPartIndex + 1)}
        </AccordionTitle>
        {this.getGiftPartContent()}
      </StyledGiftPart>
    );
  }
}

export {
  GiftPartWrapper,
};
