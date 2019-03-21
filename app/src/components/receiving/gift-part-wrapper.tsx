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
  recipientLocation: RecipientLocation;
  onComplete: () => void;
}

interface State {
  activePanelIndex: number; // Which panel is active
  audioIntroPlayed: boolean;
  hasOpened: boolean;  // Has this part ever been opened?
  isComplete: boolean; // Has the reader finsihed consuming this part
  blurImage: boolean;
}


interface StyledGiftPartProps {
  imageSrc: string;
  blurImage: boolean;
}

const StyledGiftPart = styled.div<StyledGiftPartProps>`
  // Common
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  position: relative;
  z-index: 1;

  // Background image as :before to apply blur
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.imageSrc});
    background-position: center;
    background-size: cover;
    z-index: -1;
    ${(props) => props.blurImage && `
      filter: blur(5px);`
    }
  }
`;

class GiftPartWrapper extends React.PureComponent<Props, State> {

  public state = {
    activePanelIndex: 0,
    audioIntroPlayed: false,
    hasOpened: false,
    isComplete: false,
    blurImage: true,
  };

  public unBlurImage = () => {
    this.setState({
      blurImage: false,
    });
  }

  public getPanelCount(): number {

    const giftPartIndex = getGiftPartIndexInGift(this.props.gift, this.props.giftPart);

    if (giftPartIndex === 0) {
      return 2;
    } else {
      return 1;
    }

  }

  // Go to the next panel in the list
  public nextPanel = () => {

    const panelCount = this.getPanelCount();

    // Are we at the last panel?
    if ( (this.state.activePanelIndex + 1) === panelCount) {

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
      const nextIndex = Math.min(this.state.activePanelIndex + 1, panelCount);

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

  // Returns the index of the gift part in our gift

  // Load the content for the gift part
  public getGiftPartContent = () => {

    const index = this.state.activePanelIndex;
    const giftPartIndex = getGiftPartIndexInGift(this.props.gift, this.props.giftPart);

    // Render the correct content based on our gift part index [0,1,2]
    switch (giftPartIndex) {
      case 0 :
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
              giftPartIndex={giftPartIndex}
              onComplete={this.nextPanel}
              recipientLocation={this.props.recipientLocation}
              revelImage={this.unBlurImage}
            />}
          </>
        );
      case 1 :
      case 2 :
        return (
          <ReceivingPartContent
            gift={this.props.gift}
            giftPartIndex={giftPartIndex}
            onComplete={this.nextPanel}
            recipientLocation={this.props.recipientLocation}
            revelImage={this.unBlurImage}
          />
        );
      default :
        return null;
    }

  }

  public render() {

    const giftPartIndex = getGiftPartIndexInGift(this.props.gift, this.props.giftPart);

    return (
      <StyledGiftPart imageSrc={this.props.giftPart.photo} blurImage={this.state.blurImage} >

        <Gradient />

        <AccordionTitle
          showOpenPrompt={false}
          textSize={'medium'}
          textColour={'white'}
        >
          Part {romanNumeralFromDecimal(giftPartIndex + 1)}
        </AccordionTitle>
        {this.getGiftPartContent()}
      </StyledGiftPart>
    );
  }
}

export {
  GiftPartWrapper,
};

/***
 * Returns the index of the gift part in our gift
 * Returns -1 if not found
 */
function getGiftPartIndexInGift(gift: Gift, part: GiftPart): number {

  for (let i = 0; i < gift.parts.length; i++) {
    if (gift.parts[i] !== part) continue;
    return i;
  }
  return -1;

}
