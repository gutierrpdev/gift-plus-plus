import React from 'react';
import styled from 'styled-components';
import { GiftPartWrapper, GiftPartWrapperStatus } from './gift-part-wrapper';
// import { Overlay } from '../overlay';
import { Gift, GiftPart } from '../../domain';

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
  activeGiftPart?: GiftPart;
  giftPartWrappers?: GiftPartWrapper[];
}

class GiftPartsManager extends React.PureComponent<GiftPartsManagerProps, GiftPartsManagerState> {

  // Set the active part and update the state
  public setActiveGiftPartWrapper = (active: GiftPartWrapper) => {
    // Record the active gift
    this.setState({
      activeGiftPart: active.props.giftPart,
    });

    if (this.props.onClick) {
      this.props.onClick();
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
          />
        );
      })
    );
  }

  public render() {
    return (
      <StyledGiftPartsManager>
        {this.renderParts()}
      </StyledGiftPartsManager>
    );
  }
}

export {
  GiftPartsManager,
};
