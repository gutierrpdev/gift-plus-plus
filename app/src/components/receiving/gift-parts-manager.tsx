import React from 'react';
import styled from 'styled-components';
import { GiftPartWrapper, GiftPartWrapperStatus } from './gift-part-wrapper';
import {GiftLocation } from '../receiving/panels/choose-location';
// import { Overlay } from '../overlay';
import { Gift, GiftPart } from '../../domain';
import { ReceiveReply } from '../receiving/receive-reply';
import { giftThreeParts } from '../../../stories/fixtures';

/**
 * Holds and manages visual Gift Parts
 * Controls behaviours of the parts when clicked/made active
 * Gifts are passed in as an array, e.g. after loading from API
 */

const StyledGiftPartsManager = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

export interface GiftPartsManagerProps {
  gift: Gift;
  giftLocation: GiftLocation;
  onClick?: () => void;
}

interface GiftPartsManagerState {
  activeGiftPart?: GiftPart | null;
  giftPartWrappers?: GiftPartWrapper[];
  allPartsRead: boolean;
  isShowingLastPart: boolean;
  activeGiftPartIndex: number;
}

class GiftPartsManager extends React.PureComponent<GiftPartsManagerProps, GiftPartsManagerState> {

  // Initial state
  public state = {
    activeGiftPart: null,
    allPartsRead: false,
    giftPartWrappers: [],
    isShowingLastPart: false,
    activeGiftPartIndex: -1,
  };

  // Set the active part and update the state
  public setActiveGiftPartWrapper = (active: GiftPartWrapper) => {

    // Check we have a different gift part to set
    if ((this.state !== null) && this.state.activeGiftPart === active.props.giftPart) {
      return;
    }

    // Record the active gift
    this.setState({
      activeGiftPart: active.props.giftPart,
    });

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  public showNextGiftPart = () => {

    // Check if this is the last part
    const isShowingLastPart = ((this.state.activeGiftPartIndex + 1) === this.props.gift.parts.length);

    if (isShowingLastPart) {
      // console.log('this is the last part');
      this.setState({
        // allPartsRead: true,
      });
    } else {

      // Update state to the next part
      if (this.state.giftPartWrappers) {
        const nextGiftPartWrapper = this.state.giftPartWrappers[this.state.activeGiftPartIndex + 1];
        this.setActiveGiftPartWrapper(nextGiftPartWrapper);
      }

    }

  }

  // Render the parts
  public renderParts() {

    return (
      // Iterate each of the gift parts and generate a wrapper for it
      this.props.gift.parts.map((giftPart, index) => {

        // Set the status of the wrapper to define how it displays
        let status: GiftPartWrapperStatus = 'Idle';

        // Check if this part is the active one, and set status
        if (this.state && this.state.activeGiftPart) {

          // Current active gift part
          if (giftPart === this.state.activeGiftPart) {
            this.state.activeGiftPartIndex = index;
            status = 'Open';
          } else {
          // Not our current active gift part
            status = 'Closed';
          }

        }

        // A part can open if the previous one is complete, or if its the first
        // let canOpen = (index === 0); // First
        // if (index > 0) {
        //   console.log(this.state.giftPartWrappers);
        //   const prevWrapper: GiftPartWrapper = this.state.giftPartWrappers[index - 1];
        //   console.log(prevWrapper);
        //   canOpen = prevWrapper.state.isComplete;
        // }

        const canOpen = true; // (index === 0);

        // Output the wrapper component
        return (
          <GiftPartWrapper
            giftPartManager={this}
            key={index}
            gift={this.props.gift}
            giftPart={giftPart}
            giftPartIndex={index}
            status={status}
            canOpen={canOpen}
            giftLocation={this.props.giftLocation}
            onComplete={this.showNextGiftPart}
          />
        );
      })
    );
  }

  public render() {
    return (
      <StyledGiftPartsManager>
        {this.renderParts()}
        <ReceiveReply gift={this.props.gift} visible={this.state.allPartsRead}  />
      </StyledGiftPartsManager>
    );
  }
}

export {
  GiftPartsManager,
};
