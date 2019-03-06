import React from 'react';
import styled from 'styled-components';
import { GiftPartWrapper, GiftPartWrapperStatus } from './gift-part-wrapper';
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
  onClick?: () => void;
}

interface GiftPartsManagerState {
  activeGiftPart?: GiftPart | null;
  giftPartWrappers?: GiftPartWrapper[];
  allPartsRead: boolean;
}

class GiftPartsManager extends React.PureComponent<GiftPartsManagerProps, GiftPartsManagerState> {

  // Initial state
  public state = {
    activeGiftPart: null,
    allPartsRead: false,
    giftPartWrappers: [],
  };

  public isShowingLastPart: boolean = false;
  public activeGiftPartIndex: number = -1;

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
    const isShowingLastPart = ((this.activeGiftPartIndex + 1) === this.props.gift.parts.length);

    if (isShowingLastPart) {
      // console.log('this is the last part');
      this.setState({
        allPartsRead: true,
      });
    } else {

      // Update state to the next part
      if (this.state.giftPartWrappers) {
        const nextGiftPartWrapper = this.state.giftPartWrappers[this.activeGiftPartIndex + 1];
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
        let status: GiftPartWrapperStatus = GiftPartWrapperStatus.Idle;

        // Check if this part is the active one, and set status
        if (this.state && this.state.activeGiftPart) {

          if (giftPart === this.state.activeGiftPart) {

            this.activeGiftPartIndex = index;

            status = GiftPartWrapperStatus.Open;
          } else {
            status = GiftPartWrapperStatus.Closed;
          }
        }

        // Output the wrapper component
        return (
          <GiftPartWrapper
            giftPartManager={this}
            key={index}
            gift={this.props.gift}
            giftPart={giftPart}
            giftPartIndex={index}
            status={status}
            doComplete={this.showNextGiftPart}
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
