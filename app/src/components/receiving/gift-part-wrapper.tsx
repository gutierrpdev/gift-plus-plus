import React from 'react';
import styled from 'styled-components';

import { GiftPart } from '../../domain';
import { global, romanFromDecimal } from '../../themes/global';
import { GiftPartsManager } from './gift-parts-manager';
import { ReceivingIntroContent } from './panels/intro-content';
import { ReceivingChooseLocation } from '../receiving/panels/choose-location';

// Gift Part Title
const GiftPartTitle = styled.div<Props>`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  display: flex;
  margin: 0 auto;
  font-weight: ${global.fonts.title.bold};
  line-height: 1;

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
  status: GiftPartWrapperStatus;
  onClick?: (giftPartWrapper: any) => void;
}

interface State {
  activePanelIndex: number;
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

class GiftPartWrapper extends React.PureComponent<Props, State> {

  // Our panel manager determines which panel in our stack to show
  public managerRef: any = React.createRef();
  public state = {
    activePanelIndex: 0,
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

  // Load the content for the gift part
  public getGiftPartContent = () => {

    const index = this.state.activePanelIndex;

    // Render the correct content based on our gift part index [0,1,2]
    switch (this.props.index) {
      case 0 :
        return (
          <>
            <ReceivingChooseLocation visible={index === 0} onComplete={this.nextPanel} />
            <ReceivingIntroContent visible={index === 1} onComplete={this.nextPanel} />
            <ReceivingChooseLocation visible={index === 2} onComplete={this.nextPanel} />
          </>
        );
      case 1 :
        return (
          <>
          </>
        );
      case 2 :
        return (
          <>
          </>
        );
      default :
          return null;
    }
  }

  public render() {
    return (
      <StyledGiftPart {...this.props} onClick={this.handleClick}>

        <GiftPartTitle {...this.props}>Part {romanFromDecimal(this.props.index + 1)}</GiftPartTitle>
        {this.getGiftPartContent()}

      </StyledGiftPart>
    );
  }
}

export {
  GiftPartWrapper,
};
